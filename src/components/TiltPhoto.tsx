import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Wraps anything in a cursor-driven 3D tilt (CSS perspective). No-ops under reduced motion. */
export function Tilt({ children, max = 8, className }: { children: ReactNode; max?: number; className?: string }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 22 })

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface TiltPhotoProps {
  src: string
  alt: string
  caption?: string
  rotate?: number
  className?: string
  floatDelay?: number
  /** px of vertical scroll parallax (travels +n to -n through the viewport) */
  parallax?: number
}

/** A matted, framed photograph with scroll parallax, a gentle float and a 3D tilt. */
export function TiltPhoto({ src, alt, caption, rotate = 0, className, floatDelay = 0, parallax = 40 }: TiltPhotoProps) {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [parallax, -parallax])

  return (
    <motion.div ref={wrapRef} className={`relative ${className ?? ''}`} style={{ y }}>
      <motion.div animate={reduced ? undefined : { y: [0, -8, 0] }} transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}>
        <Tilt max={7} className="plate p-3 pb-4" >
          <div style={{ transform: `rotate(${rotate}deg)` }}>
            <img src={src} alt={alt} className="w-full object-cover" />
            {caption && <p className="plaque mt-3 text-faint">{caption}</p>}
          </div>
        </Tilt>
      </motion.div>
    </motion.div>
  )
}

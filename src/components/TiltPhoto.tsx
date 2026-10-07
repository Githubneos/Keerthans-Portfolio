import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface TiltPhotoProps {
  src: string
  alt: string
  accent: 'violet' | 'cyan' | 'signal'
  rotate?: number
  className?: string
  floatDelay?: number
  /** px of vertical scroll parallax (travels +n to -n through the viewport) */
  parallax?: number
}

const ACCENT_GLOW = {
  violet: 'from-violet to-cyan',
  cyan: 'from-cyan to-signal',
  signal: 'from-signal to-violet',
} as const

/**
 * Photo with a glowing gradient halo, scroll parallax, a gentle float, and a
 * cursor-driven 3D tilt. Float/tilt/parallax all disabled under reduced motion.
 */
export function TiltPhoto({ src, alt, accent, rotate = 0, className, floatDelay = 0, parallax = 40 }: TiltPhotoProps) {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [parallax, -parallax])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div ref={wrapRef} className={`relative ${className ?? ''}`} style={{ y }}>
      <motion.div
        style={{ perspective: 900 }}
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      >
        <div
          className={`absolute -inset-3 rounded-3xl bg-linear-to-br ${ACCENT_GLOW[accent]} opacity-40 blur-2xl`}
          aria-hidden="true"
        />
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={reduced ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ rotate, rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
          className="relative rounded-2xl bg-linear-to-br from-white/30 to-white/5 p-px"
        >
          <img src={src} alt={alt} className="w-full rounded-2xl object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

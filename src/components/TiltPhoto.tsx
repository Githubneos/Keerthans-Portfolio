import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface TiltPhotoProps {
  src: string
  alt: string
  accent: 'crimson' | 'olive' | 'brown'
  rotate?: number
  className?: string
  floatDelay?: number
}

const ACCENT_BG = {
  crimson: 'bg-crimson',
  olive: 'bg-olive',
  brown: 'bg-brown',
} as const

/**
 * A photo card with a colored offset backing, a gentle continuous float,
 * and a cursor-driven 3D tilt on hover. The float is the one deliberately
 * ambient/looping motion on this site -- scoped to these decorative photo
 * cards only, and fully disabled under prefers-reduced-motion.
 */
export function TiltPhoto({ src, alt, accent, rotate = 0, className, floatDelay = 0 }: TiltPhotoProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })

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
    <motion.div
      className={`relative ${className ?? ''}`}
      style={{ perspective: 800 }}
      animate={reduced ? undefined : { y: [0, -10, 0] }}
      transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
    >
      <div
        className={`absolute inset-0 rounded-sm ${ACCENT_BG[accent]}`}
        style={{ transform: `translate(12px, 12px) rotate(${rotate}deg)` }}
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={reduced ? undefined : { scale: 1.03 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ rotate, rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
        className="relative"
      >
        <img src={src} alt={alt} className="w-full rounded-sm border border-hairline object-cover" />
      </motion.div>
    </motion.div>
  )
}

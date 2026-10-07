import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Soft spotlight that trails the pointer. Mouse-only; skipped on touch and under reduced motion. */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion()
  const [finePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const enabled = finePointer && !reduced
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 250)
      y.set(event.clientY - 250)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full opacity-60"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, rgb(139 124 255 / 16%), rgb(61 224 255 / 6%) 45%, transparent 70%)',
      }}
    />
  )
}

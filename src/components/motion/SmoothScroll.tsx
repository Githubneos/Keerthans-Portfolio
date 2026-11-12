import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Eased, inertial page scrolling. Anchor links glide to their section. Off under reduced motion. */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -64 } })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduced])

  return null
}

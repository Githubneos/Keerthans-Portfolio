import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface HorizontalScrollProps {
  /** heading block shown above the track while pinned */
  header: ReactNode
  /** each child becomes one fixed-width slide */
  children: ReactNode[]
}

/**
 * Pins a section while vertical scroll drives a horizontal track of slides.
 * Falls back to a plain responsive grid under prefers-reduced-motion.
 */
export function HorizontalScroll({ header, children }: HorizontalScrollProps) {
  const reduced = usePrefersReducedMotion()
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (value) => {
    const el = track.current
    if (!el) return 0
    return -value * Math.max(0, el.scrollWidth - window.innerWidth)
  })
  const barScale = useTransform(scrollYProgress, [0, 1], [0.04, 1])

  if (reduced) {
    return (
      <div className="mx-auto max-w-(--content-max) px-6 py-24">
        {header}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
      </div>
    )
  }

  return (
    <div ref={outer} className="relative" style={{ height: `${Math.max(2, children.length) * 85}vh` }}>
      <div className="sticky top-0 flex h-dvh flex-col justify-center gap-10 overflow-hidden">
        <div className="mx-auto w-full max-w-(--content-max) px-6 pt-16">{header}</div>
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max gap-6 pl-6 pr-[20vw] md:pl-[max(1.5rem,calc((100vw-74rem)/2+1.5rem))]"
        >
          {children.map((child, index) => (
            <div key={index} className="flex w-[82vw] shrink-0 sm:w-[26rem]">
              {child}
            </div>
          ))}
        </motion.div>
        <div className="mx-auto w-full max-w-(--content-max) px-6">
          <div className="h-px w-full bg-hairline">
            <motion.div className="h-px origin-left bg-linear-to-r from-violet to-cyan" style={{ scaleX: barScale }} />
          </div>
        </div>
      </div>
    </div>
  )
}

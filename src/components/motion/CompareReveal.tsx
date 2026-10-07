import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface CompareRevealProps {
  before: ReactNode
  after: ReactNode
  beforeLabel: string
  afterLabel: string
}

/** Scroll-scrubbed wipe from a "before" scene to an "after" scene, with a glowing divider. */
export function CompareReveal({ before, after, beforeLabel, afterLabel }: CompareRevealProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const pct = useTransform(scrollYProgress, [0, 1], reduced ? [50, 50] : [4, 96])
  const rest = useTransform(pct, (value) => 100 - value)
  const clip = useMotionTemplate`inset(0 ${rest}% 0 0)`
  const left = useMotionTemplate`${pct}%`

  return (
    <div ref={ref} className="glass relative aspect-[16/10] w-full overflow-hidden rounded-3xl md:aspect-[16/7]">
      <div className="absolute inset-0">{before}</div>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        {after}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-cyan shadow-[0_0_18px_3px_rgb(61_224_255/70%)]"
        style={{ left }}
      />
      <span className="mono-label absolute bottom-4 right-5 text-faint">{beforeLabel}</span>
      <span className="mono-label absolute bottom-4 left-5 text-cyan">{afterLabel}</span>
    </div>
  )
}

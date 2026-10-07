import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface MarqueeProps {
  items: string[]
  className?: string
}

/** Endless ticker that skews in response to scroll velocity. */
export function Marquee({ items, className }: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 80, damping: 30 })
  const skewX = useTransform(velocity, [-2000, 0, 2000], [8, 0, -8])

  const row = items.map((item, index) => (
    <span key={index} className="flex shrink-0 items-center gap-10 pr-10">
      <span>{item}</span>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-linear-to-br from-violet to-cyan" />
    </span>
  ))

  return (
    <motion.div
      className={`overflow-hidden ${className ?? ''}`}
      style={reduced ? undefined : { skewX }}
      aria-label={items.join(', ')}
      role="img"
    >
      <div className={`flex w-max ${reduced ? '' : 'animate-marquee'}`} aria-hidden="true">
        {row}
        {row}
      </div>
    </motion.div>
  )
}

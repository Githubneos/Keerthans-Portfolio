import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface StarfieldProps {
  className?: string
}

// Deterministic pseudo-random positions (not Math.random() per render) so
// the layout is stable across re-renders and server/client mismatches.
function seededStars(count: number) {
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  return Array.from({ length: count }, (_, i) => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 0.6 + rand() * 1.4,
    delay: (i % 12) * 0.28,
    duration: 2.5 + rand() * 2.5,
  }))
}

const STARS = seededStars(60)

/**
 * A quiet, full-bleed background layer of twinkling stars -- extends the
 * "night sky" motif established by the real space photography elsewhere on
 * the site. Purely decorative (aria-hidden), absolutely positioned so it
 * must be used inside a `relative` container. Twinkle disabled (stars
 * render fully visible, static) under prefers-reduced-motion.
 */
export function Starfield({ className }: StarfieldProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        {STARS.map((star, index) => (
          <motion.circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r * 0.18}
            fill="#FFE0B5"
            initial={reduced ? { opacity: 0.5 } : { opacity: 0.15 }}
            animate={reduced ? undefined : { opacity: [0.15, 0.7, 0.15] }}
            transition={
              reduced ? undefined : { duration: star.duration, repeat: Infinity, ease: 'easeInOut', delay: star.delay }
            }
          />
        ))}
      </svg>
    </div>
  )
}

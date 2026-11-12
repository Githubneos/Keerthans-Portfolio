import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface EssayCardProps {
  title: string
  hook: string
  href: string
  index?: number
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export function EssayCard({ title, hook, href, index = 0 }: EssayCardProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-baseline gap-6 border-b border-hairline py-8"
      whileHover={reduced ? undefined : { x: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <span className="w-10 shrink-0 font-display text-lg text-burgundy">{ROMAN[index] ?? index + 1}</span>
      <div className="flex-1">
        <h3 className="text-2xl text-navy transition-colors group-hover:text-burgundy md:text-3xl">{title}</h3>
        <p className="mt-2 max-w-[60ch] text-sm text-muted">{hook}</p>
      </div>
      <span aria-hidden="true" className="text-2xl text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-burgundy">
        ↗
      </span>
      <span className="sr-only">Read on Substack</span>
    </motion.a>
  )
}

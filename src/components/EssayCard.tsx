import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface EssayCardProps {
  title: string
  hook: string
  href: string
}

export function EssayCard({ title, hook, href }: EssayCardProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-6"
      whileHover={reduced ? undefined : { x: 4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-muted">{hook}</p>
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-crimson-text">Read →</span>
    </motion.a>
  )
}

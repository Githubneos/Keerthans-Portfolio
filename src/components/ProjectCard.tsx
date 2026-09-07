import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href: string
  inferred?: boolean
  /** left accent bar keyed to a tag family -- keep to 2-3 categories max */
  accent?: 'crimson' | 'olive' | 'brown'
}

const ACCENT_BORDER = {
  crimson: 'border-l-4 border-l-crimson',
  olive: 'border-l-4 border-l-olive',
  brown: 'border-l-4 border-l-brown',
} as const

export function ProjectCard({ title, description, tags, href, inferred, accent }: ProjectCardProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col gap-3 rounded-sm border border-hairline bg-surface p-6 ${accent ? ACCENT_BORDER[accent] : ''}`}
      whileHover={reduced ? undefined : { y: -2, borderColor: '#CA2E55' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      {inferred && <p className="text-xs italic text-faint">Inferred from repo — confirm or edit</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-sm border border-hairline bg-surface-raised px-2 py-0.5 text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-auto text-sm font-medium text-crimson-text">View on GitHub →</span>
    </motion.a>
  )
}

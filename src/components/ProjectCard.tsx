import { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ProjectArt, type ArtKind } from './ProjectArt'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href: string
  art: ArtKind
  accent?: 'violet' | 'cyan' | 'signal'
  className?: string
}

const ACCENT_LINE = {
  violet: 'from-violet',
  cyan: 'from-cyan',
  signal: 'from-signal',
} as const

/** Glass card with an illustrated cover, a cursor-following spotlight, and an accent top edge. */
export function ProjectCard({ title, description, tags, href, art, accent = 'violet', className }: ProjectCardProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el || reduced) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      className={`group glass relative flex w-full flex-col overflow-hidden rounded-2xl ${className ?? ''}`}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="relative h-44 overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
          <ProjectArt kind={art} />
        </div>
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${ACCENT_LINE[accent]} to-transparent`} />
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(139 124 255 / 18%), transparent 70%)' }}
      />
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        <p className="text-sm text-muted">{description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {tags.map((tag) => (
            <span key={tag} className="mono-label rounded-full border border-hairline px-3 py-1 text-[0.65rem] text-muted">
              {tag}
            </span>
          ))}
          <span aria-hidden="true" className="ml-auto text-cyan transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
          <span className="sr-only">View on GitHub</span>
        </div>
      </div>
    </motion.a>
  )
}

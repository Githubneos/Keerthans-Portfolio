import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EMAIL, FOLIOTREND_URL, SOCIAL_LINKS } from '../lib/links'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Aurora } from './motion/Aurora'
import { GridBackdrop } from './motion/GridBackdrop'

const FOOTER_LINKS = [
  { href: FOLIOTREND_URL, label: 'FolioTrend' },
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.substack, label: 'Substack' },
  { href: SOCIAL_LINKS.x, label: 'X' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram' },
]

export function Footer() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['18%', '-12%'])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-hairline bg-bg">
      <Aurora className="opacity-60" />
      <GridBackdrop />
      <div className="relative z-10 mx-auto max-w-(--content-max) px-6 pt-20">
        <p className="mono-label text-cyan">Say hello</p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-4 block break-all font-display text-2xl font-semibold text-ink transition-colors hover:text-cyan sm:text-3xl md:text-5xl"
        >
          {EMAIL}
        </a>
      </div>

      <motion.div
        aria-hidden="true"
        className="outline-text relative z-10 mt-10 select-none whitespace-nowrap font-display text-[19vw] font-bold leading-none"
        style={{ x }}
      >
        Keerthan Karumudi
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-(--content-max) flex-wrap items-center justify-between gap-6 px-6 pb-10 pt-6">
        <nav aria-label="Social">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center text-sm text-muted transition-colors duration-200 hover:text-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <p className="text-sm text-faint">&copy; {new Date().getFullYear()} Keerthan Karumudi</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
            className="glass min-h-11 rounded-full px-5 text-sm text-ink transition-colors hover:border-cyan hover:text-cyan"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

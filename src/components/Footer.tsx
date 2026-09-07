import { SOCIAL_LINKS } from '../lib/links'
import { Starfield } from './Starfield'

const FOOTER_LINKS = [
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.substack, label: 'Substack' },
  { href: SOCIAL_LINKS.x, label: 'X' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-espresso text-ink-on-dark">
      <Starfield />
      <div className="relative z-10 mx-auto flex max-w-(--content-max) flex-wrap items-center justify-between gap-6 px-6 py-10">
        <nav aria-label="Social">
          <ul className="flex flex-wrap gap-5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-on-dark/70 transition-colors duration-150 hover:text-olive"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-ink-on-dark/70">&copy; {new Date().getFullYear()} Keerthan Karumudi. All rights reserved.</p>
      </div>
    </footer>
  )
}

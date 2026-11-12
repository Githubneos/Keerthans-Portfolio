import { EMAIL, SOCIAL_LINKS } from '../lib/links'

const LINKS = [
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.substack, label: 'Substack' },
  { href: SOCIAL_LINKS.x, label: 'X' },
]

export function Footer() {
  return (
    <footer className="relative z-10 bg-paper/80 backdrop-blur-md">
      <div aria-hidden="true" className="stripes-gold h-1.5" />
      <div className="mx-auto flex max-w-(--content-max) flex-wrap items-center justify-between gap-6 px-6 py-8">
        <div>
          <a href={`mailto:${EMAIL}`} className="font-display text-xl text-navy transition-colors hover:text-burgundy">
            {EMAIL}
          </a>
          <p className="mt-1 text-sm text-faint">&copy; {new Date().getFullYear()} Keerthan Karumudi</p>
        </div>
        <nav aria-label="Social">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-sm text-muted transition-colors hover:text-burgundy">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#top" className="inline-flex min-h-11 items-center rounded-full border border-hairline-strong px-5 text-sm text-navy transition-colors hover:border-burgundy hover:text-burgundy">
                Back to top ↑
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

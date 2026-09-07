import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/freelance', label: 'Freelance' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="border-b border-hairline bg-bg">
      <div className="mx-auto flex max-w-(--content-max) flex-wrap items-center justify-between gap-6 px-6 py-5">
        <NavLink to="/" className="font-display text-base font-semibold text-ink" end>
          Keerthan Karumudi
        </NavLink>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-6">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `border-b pb-1 text-sm transition-colors duration-150 ${
                      isActive ? 'border-crimson text-ink' : 'border-transparent text-faint hover:text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

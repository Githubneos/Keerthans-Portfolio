import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/freelance', label: 'Freelance' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const shouldHide = latest > previous && latest > 160
    setHidden((current) => (current === shouldHide ? current : shouldHide))
  })

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-4 z-50 px-4"
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-(--content-max) items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="glass flex min-h-11 items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 font-display text-sm font-semibold text-ink"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-violet to-cyan text-xs font-bold text-bg">
              KK
            </span>
            <span className="hidden sm:inline">Keerthan Karumudi</span>
          </Link>

          <nav aria-label="Primary" className="glass hidden rounded-full p-1.5 lg:block">
            <ul className="flex items-center gap-0.5">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `relative block rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full border border-hairline-strong bg-white/10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="glass grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-5 rounded bg-ink"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-5 rounded bg-ink"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {LINKS.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex min-h-12 items-baseline gap-4 font-display text-4xl font-semibold ${
                          isActive ? 'grad-text' : 'text-ink'
                        }`
                      }
                    >
                      <span className="mono-label text-faint">{String(index + 1).padStart(2, '0')}</span>
                      <span>{link.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

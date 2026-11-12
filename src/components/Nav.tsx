import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useContact } from './ContactDialog'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'writing', label: 'Writing' },
]

/** Sticky one-page nav. The link for the section in view gets a blue underline. */
export function Nav() {
  const { scrollY } = useScroll()
  const { open: openContact } = useContact()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('')
  const hero = !scrolled && !menu

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })
    const top = document.getElementById('top')
    if (top) observer.observe(top)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menu) return
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled || menu ? 'border-b border-hairline bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-(--content-max) items-center justify-between gap-4 px-6">
          <a href="#top" onClick={() => setMenu(false)} className={`flex min-h-11 items-center gap-2.5 font-display text-xl transition-colors duration-300 ${hero ? "text-white" : "text-navy"}`}>
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-burgundy" />
            Keerthan Karumudi
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} aria-current={active === link.id ? 'true' : undefined} className={`relative block px-4 py-2 text-sm transition-colors duration-200 ${active === link.id ? (hero ? "text-white" : "text-ink") : hero ? "text-white/75 hover:text-white" : "text-muted hover:text-ink"}`}>
                    {link.label}
                    {active === link.id && <motion.span layoutId="nav-underline" className={`absolute inset-x-4 -bottom-0.5 h-px ${hero ? "bg-gold" : "bg-burgundy"}`} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  </a>
                </li>
              ))}
              <li className="ml-3">
                <button type="button" onClick={openContact} className={`inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium transition-colors ${hero ? "bg-gold text-navy hover:bg-white" : "bg-burgundy text-white hover:bg-burgundy-deep"}`}>
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          <button type="button" className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${hero ? "border-white/40" : "border-hairline-strong"}`} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu((value) => !value)}>
            <span className="relative block h-3.5 w-5">
              <motion.span className={`absolute left-0 top-0 h-px w-5 ${hero ? "bg-white" : "bg-ink"}`} animate={menu ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }} />
              <motion.span className={`absolute bottom-0 left-0 h-px w-5 ${hero ? "bg-white" : "bg-ink"}`} animate={menu ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div id="mobile-menu" data-lenis-prevent className="fixed inset-0 z-40 flex flex-col justify-center bg-paper/95 px-8 backdrop-blur-md lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {LINKS.map((link, index) => (
                  <motion.li key={link.id} className="border-b border-hairline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 + index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <a href={`#${link.id}`} onClick={() => setMenu(false)} className="flex min-h-16 items-baseline gap-4 py-3 font-display text-4xl text-navy">
                      <span className="plaque text-faint">{String(index + 1).padStart(2, '0')}</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                  <button type="button" onClick={() => { setMenu(false); openContact() }} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-burgundy px-8 text-sm font-medium text-white">
                    Contact
                  </button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

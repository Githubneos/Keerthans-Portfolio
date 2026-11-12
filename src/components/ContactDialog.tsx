import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react'
import { EMAIL, FOLIOTREND_URL, SOCIAL_LINKS } from '../lib/links'

const ContactContext = createContext<{ open: () => void }>({ open: () => {} })

// eslint-disable-next-line react-refresh/only-export-components
export const useContact = () => useContext(ContactContext)

const ROWS = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'Substack', href: SOCIAL_LINKS.substack },
  { label: 'X', href: SOCIAL_LINKS.x },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { label: 'FolioTrend', href: FOLIOTREND_URL },
]

/**
 * Contact lives in a native <dialog>: focus trapping, Escape and the backdrop
 * come from the browser. Open it from anywhere with useContact().open().
 */
export function ContactProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = useCallback(() => ref.current?.showModal(), [])
  const close = useCallback(() => ref.current?.close(), [])
  const value = useMemo(() => ({ open }), [open])

  return (
    <ContactContext.Provider value={value}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="contact-title"
        data-lenis-prevent
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-auto w-[min(36rem,92vw)] rounded-3xl border border-hairline bg-white-wall p-0 text-ink shadow-(--shadow-plate) backdrop:bg-navy/55 backdrop:backdrop-blur-sm"
      >
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="plaque text-muted">Contact</p>
              <h2 id="contact-title" className="mt-3 text-5xl">
                Let&rsquo;s talk.
              </h2>
            </div>
            <button type="button" onClick={close} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline-strong text-navy transition-colors hover:border-burgundy hover:text-burgundy">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-muted">Send me a project, a question or a hello.</p>
          <a href={`mailto:${EMAIL}?subject=Hello%20Keerthan`} className="mt-6 flex min-h-14 items-center justify-between gap-4 rounded-full bg-burgundy px-7 text-sm font-medium text-white transition-colors hover:bg-burgundy-deep">
            <span className="break-all">{EMAIL}</span>
            <span aria-hidden="true">→</span>
          </a>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-hairline">
            {ROWS.map((row) => (
              <li key={row.label} className="border-b border-hairline">
                <a href={row.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between font-display text-lg text-navy transition-colors hover:text-burgundy">
                  {row.label}
                  <span aria-hidden="true" className="text-sm text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-burgundy">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </ContactContext.Provider>
  )
}

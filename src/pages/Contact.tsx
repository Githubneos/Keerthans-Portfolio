import { Section } from '../components/Section'
import { NetworkGraphic } from '../components/NetworkGraphic'
import { EMAIL, SOCIAL_LINKS } from '../lib/links'

const SOCIAL_ROWS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'keerthan-karumudi', href: SOCIAL_LINKS.linkedin },
  { label: 'GitHub', value: 'Githubneos', href: SOCIAL_LINKS.github },
  { label: 'X', value: '@humblelime', href: SOCIAL_LINKS.x },
  { label: 'Instagram', value: 'keerthan.karumudi', href: SOCIAL_LINKS.instagram },
  { label: 'Substack', value: 'Skeptical Optimist', href: SOCIAL_LINKS.substack },
]

export function Contact() {
  return (
    <Section tone="cream" reveal={false}>
      <span className="inline-block rounded-sm bg-crimson px-2 py-0.5 text-xs font-medium text-ink-on-dark">
        Contact
      </span>
      <h1 className="mt-4 text-3xl font-semibold text-ink md:text-5xl">Let's talk.</h1>
      <p className="mt-4 max-w-[56ch] text-lg text-muted">
        Whether it's a consulting question, a project idea, or a note about something you read on Skeptical
        Optimist — reach out.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr]">
        <div>
          {/*
            GitHub Pages serves static files only — there is no server to
            receive this form submission. To make it work in about 5
            minutes, sign up at https://formspree.io, create a form, and
            set the form's action below to your Formspree endpoint
            (e.g. https://formspree.io/f/your-form-id) with method="POST".
          */}
          <form action="#" method="POST" className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-muted">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="mt-1.5 w-full border-0 border-b-2 border-hairline bg-transparent px-0.5 py-2.5 text-ink focus:border-crimson focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1.5 w-full border-0 border-b-2 border-hairline bg-transparent px-0.5 py-2.5 text-ink focus:border-crimson focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="mt-1.5 w-full resize-y border-0 border-b-2 border-hairline bg-transparent px-0.5 py-2.5 text-ink focus:border-crimson focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-1 inline-flex items-center gap-2 self-start rounded-sm bg-crimson px-6 py-3 font-display text-sm font-medium text-ink-on-dark transition-colors duration-150 hover:bg-crimson-text"
            >
              Send message
            </button>
          </form>
        </div>

        <aside>
          <NetworkGraphic className="mb-8 h-auto w-full max-w-[180px] text-ink" />
          <ul>
            {SOCIAL_ROWS.map((row) => (
              <li key={row.label} className="border-b border-hairline first:pt-0">
                <a
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex justify-between px-0.5 py-3.5 text-ink transition-colors duration-150 hover:bg-espresso hover:text-ink-on-dark hover:px-3"
                >
                  {row.label}
                  <span className="text-sm text-faint transition-colors duration-150 group-hover:text-ink-on-dark/70">
                    {row.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  )
}

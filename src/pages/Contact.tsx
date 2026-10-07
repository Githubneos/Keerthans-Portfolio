import { motion } from 'framer-motion'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { GridBackdrop } from '../components/motion/GridBackdrop'
import { NetworkGraphic } from '../components/NetworkGraphic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { EMAIL, FOLIOTREND_URL, SOCIAL_LINKS } from '../lib/links'

const SOCIAL_ROWS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'keerthan-karumudi', href: SOCIAL_LINKS.linkedin },
  { label: 'GitHub', value: 'Githubneos', href: SOCIAL_LINKS.github },
  { label: 'X', value: '@humblelime', href: SOCIAL_LINKS.x },
  { label: 'Instagram', value: 'keerthan.karumudi', href: SOCIAL_LINKS.instagram },
  { label: 'Substack', value: 'Skeptical Optimist', href: SOCIAL_LINKS.substack },
  { label: 'FolioTrend', value: 'foliotrend.com', href: FOLIOTREND_URL },
]

const FIELD =
  'mt-1 w-full rounded-xl border border-hairline bg-white/3 px-4 py-3.5 text-ink transition-[border-color,box-shadow] duration-200 focus:border-cyan focus:shadow-[0_0_0_4px_rgb(61_224_255/12%)] focus:outline-none'

export function Contact() {
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk." gradientFrom={1} seed={91}>
        <p className="font-display text-2xl text-muted md:text-3xl">Project, question, or hello.</p>
      </PageHero>

      <Section tone="base" reveal={false} background={<GridBackdrop />}>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr]">
          <Reveal from="left">
            {/*
              GitHub Pages serves static files only — there is no server to
              receive this form submission. To make it work in about 5
              minutes, sign up at https://formspree.io, create a form, and
              set the form's action below to your Formspree endpoint
              (e.g. https://formspree.io/f/your-form-id) with method="POST".
            */}
            <form action="#" method="POST" className="glass flex flex-col gap-6 rounded-3xl p-8">
              <div>
                <label htmlFor="name" className="mono-label text-faint">
                  Name
                </label>
                <input type="text" id="name" name="name" autoComplete="name" required className={FIELD} />
              </div>
              <div>
                <label htmlFor="email" className="mono-label text-faint">
                  Email
                </label>
                <input type="email" id="email" name="email" autoComplete="email" required className={FIELD} />
              </div>
              <div>
                <label htmlFor="message" className="mono-label text-faint">
                  Message
                </label>
                <textarea id="message" name="message" required rows={6} className={`${FIELD} resize-y`} />
              </div>
              <motion.button
                type="submit"
                whileTap={reduced ? undefined : { scale: 0.97 }}
                className="inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-linear-to-r from-violet to-cyan px-8 py-3 font-display text-sm font-semibold text-bg shadow-[0_0_30px_-4px_rgb(139_124_255/60%)] transition-shadow duration-300 hover:shadow-[0_0_44px_0_rgb(61_224_255/55%)]"
              >
                Send message →
              </motion.button>
            </form>
          </Reveal>

          <Reveal from="right">
            <aside>
              <NetworkGraphic className="mb-8 h-auto w-full max-w-[180px] text-cyan" />
              <ul>
                {SOCIAL_ROWS.map((row) => (
                  <li key={row.label} className="border-b border-hairline">
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex min-h-12 items-center justify-between gap-4 py-3.5 text-ink transition-all duration-300 hover:pl-3 hover:text-cyan"
                    >
                      {row.label}
                      <span className="flex items-center gap-2 text-sm text-faint transition-colors group-hover:text-cyan">
                        {row.value}
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

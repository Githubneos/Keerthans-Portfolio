import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/MagneticButton'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Eyebrow, Section } from '../components/Section'
import { Aurora } from '../components/motion/Aurora'
import { CountUp } from '../components/motion/CountUp'
import { GridBackdrop } from '../components/motion/GridBackdrop'
import { Marquee } from '../components/motion/Marquee'
import { PinnedSteps, type Step } from '../components/motion/PinnedSteps'
import { SplitText } from '../components/motion/SplitText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import zoologistPerfumes from '../assets/zoologist-perfumes.jpg'
import imaginaryAuthors from '../assets/imaginary-authors.jpg'

const KEYWORDS = ['AI SaaS', 'MVP development', 'Full-stack React / Next.js', 'FastAPI', 'Supabase', 'LLM integration', 'RAG', 'AI agents', 'Data pipelines', 'Dashboards', 'Authentication', 'Responsive design', 'CI/CD']

const PACKAGES = [
  {
    title: 'AI SaaS & MVP builds',
    outcome: 'Go from idea to paying users.',
    tags: ['MVP development', 'React / Next.js', 'FastAPI', 'Supabase', 'Auth', 'Dashboards'],
    icon: 'M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7',
  },
  {
    title: 'LLM, RAG & AI agents',
    outcome: 'Put AI to work inside your product.',
    tags: ['LLM integration', 'RAG', 'AI agents', 'LangChain', 'Prompt engineering', 'Evaluation'],
    icon: 'M12 3a6 6 0 00-4 10.5V17h8v-3.5A6 6 0 0012 3zM9 21h6',
  },
  {
    title: 'High-performance websites',
    outcome: 'A fast, polished site you can easily update.',
    tags: ['Marketing sites', 'Portfolios', 'Responsive', 'Fast loading', 'Deployment', 'CI/CD'],
    icon: 'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01',
  },
]

const PROOF = [
  { to: 750, prefix: '$', label: 'MRR on my own AI SaaS' },
  { to: 50, suffix: '+', label: 'Active users' },
  { to: 4000, suffix: '+', label: 'Users on a platform I built features for' },
]

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <motion.svg viewBox="0 0 24 24" className="h-36 w-36 text-cyan" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 14px rgb(61 224 255 / 55%))' }}>
        <motion.path d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} />
      </motion.svg>
      <p className="mono-label text-faint">{label}</p>
    </div>
  )
}

const STEPS: Step[] = [
  { title: 'Discover', body: 'Goals, users, scope.', visual: <Icon label="01 / Discover" d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5" /> },
  { title: 'Design', body: 'Flows and interface.', visual: <Icon label="02 / Design" d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" /> },
  { title: 'Build', body: 'Full stack, shipped weekly.', visual: <Icon label="03 / Build" d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /> },
  { title: 'Launch', body: 'Deploy, measure, iterate.', visual: <Icon label="04 / Launch" d="M5 19c0-6 4-12 14-14 0 10-6 14-12 14zM9 15l-4 4" /> },
]

const RECENT_WORK = [
  { name: 'Zoologist Perfumes', href: 'https://www.zoologistperfumes.com/', image: zoologistPerfumes },
  { name: 'Imaginary Authors', href: 'https://imaginaryauthors.com/', image: imaginaryAuthors },
]

/** Browser-chrome frame whose screenshot drifts as the page scrolls past. */
function WorkCard({ name, href, image }: { name: string; href: string; image: string }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-14%'])

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass flex flex-col gap-5 rounded-3xl p-5"
      whileHover={reduced ? undefined : { y: -8 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="overflow-hidden rounded-xl border border-hairline bg-bg">
        <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ember/80" />
          <span className="h-2 w-2 rounded-full bg-violet/80" />
          <span className="h-2 w-2 rounded-full bg-signal/80" />
        </div>
        <div className="aspect-video overflow-hidden">
          <motion.img src={image} alt={`${name} homepage screenshot`} style={{ y }} className="h-[118%] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-1">
        <h3 className="text-xl font-semibold text-ink">{name}</h3>
        <span className="text-sm font-medium text-cyan">
          Visit site <span aria-hidden="true">→</span>
        </span>
      </div>
    </motion.a>
  )
}

export function Freelance() {
  return (
    <>
      <PageHero eyebrow="Freelance · Available for projects" title="AI SaaS & websites that ship." gradientFrom={1} seed={63}>
        <MagneticButton to="/contact">Book a free intro call</MagneticButton>
      </PageHero>

      <div className="border-y border-hairline bg-surface py-5 font-display text-2xl font-semibold text-muted md:text-3xl">
        <Marquee items={KEYWORDS} />
      </div>

      <Section tone="base" reveal={false} background={<GridBackdrop />}>
        <Eyebrow>What I build</Eyebrow>
        <SplitText as="h2" text="Three ways to work together." className="mt-4 text-4xl font-bold md:text-6xl" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PACKAGES.map((pack, index) => (
            <Reveal key={pack.title} delay={index * 0.1}>
              <div className="glass group h-full rounded-3xl p-7 transition-colors duration-300 hover:border-cyan/50">
                <svg viewBox="0 0 24 24" className="h-14 w-14 text-cyan transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 10px rgb(61 224 255 / 50%))' }}>
                  <path d={pack.icon} />
                </svg>
                <h3 className="mt-6 text-2xl font-semibold">{pack.title}</h3>
                <p className="mt-2 text-muted">{pack.outcome}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {pack.tags.map((tag) => (
                    <span key={tag} className="mono-label rounded-full border border-hairline-strong px-3 py-1 text-[0.62rem] text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" outerClassName="border-y border-hairline" reveal={false}>
        <Eyebrow>Proof</Eyebrow>
        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          {PROOF.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.1}>
              <CountUp to={item.to} prefix={item.prefix} suffix={item.suffix} className="grad-text font-display text-7xl font-bold" />
              <p className="mono-label mt-3 max-w-[26ch] text-faint">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <PinnedSteps
        steps={STEPS}
        heading={
          <>
            <Eyebrow>Process</Eyebrow>
            <SplitText as="h2" text="Idea to launch." className="mt-4 text-4xl font-bold md:text-6xl" />
          </>
        }
      />

      <Section tone="base" reveal={false}>
        <Eyebrow>Recent websites</Eyebrow>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {RECENT_WORK.map((site, index) => (
            <Reveal key={site.name} delay={index * 0.12}>
              <WorkCard name={site.name} href={site.href} image={site.image} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" outerClassName="border-t border-hairline" reveal={false} background={<Aurora className="opacity-70" />}>
        <div className="py-8 text-center">
          <SplitText as="h2" text="Have a project in mind?" gradientFrom={3} className="mx-auto max-w-[14ch] text-6xl font-bold md:text-8xl" />
          <div className="mt-10 flex justify-center">
            <MagneticButton to="/contact">Book a free intro call</MagneticButton>
          </div>
        </div>
      </Section>
    </>
  )
}

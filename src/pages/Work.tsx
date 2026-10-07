import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FolioTrendCase } from '../components/FolioTrendCase'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Eyebrow, Section } from '../components/Section'
import { CountUp } from '../components/motion/CountUp'
import { GridBackdrop } from '../components/motion/GridBackdrop'
import { SplitText } from '../components/motion/SplitText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { PROJECT_REPOS } from '../lib/links'

const EXPERIENCE = [
  {
    role: 'Founder',
    org: 'FolioTrend',
    place: 'San Diego, CA',
    dates: 'Apr 2025 – Present',
    summary: 'Shipped an AI investment research platform from concept to production.',
    metrics: ['$750 MRR', '50+ users', 'LangChain + RAG'],
    icon: 'M3 17l6-6 4 4 8-9M15 6h6v6',
  },
  {
    role: 'AI Engineer Intern',
    org: 'SYNK',
    place: 'San Diego, CA',
    dates: 'Apr 2026 – Sep 2026',
    summary: 'Built AI-powered 3D web environments with real-time proximity voice chat for investor events.',
    metrics: ['4,000+ users', '1,000+ waitlisted', 'No VR hardware'],
    icon: 'M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7',
  },
  {
    role: 'Machine Learning Developer / Senior Coder',
    org: 'Pilot City',
    place: 'San Diego, CA',
    dates: 'Mar 2025 – Aug 2025',
    summary: 'Led 6 developers delivering 2 machine learning projects in Python, on time.',
    metrics: ['Team of 6', '70% less effort', '$200K saved'],
    icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  },
  {
    role: 'Particle Physics Researcher',
    org: 'UC San Diego',
    place: 'San Diego, CA',
    dates: 'Apr 2025 – Nov 2025',
    summary: 'Built a Python pipeline to clean, process and visualize experimental data.',
    metrics: ['7 datasets', '95% accuracy', '50% faster'],
    icon: 'M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0M12 3c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z',
  },
  {
    role: 'Data Analyst Intern',
    org: 'Ari Tech Consulting',
    place: '',
    dates: 'Feb 2024 – Jun 2026',
    summary: 'Automated recurring reporting in Python (pandas) and SQL.',
    metrics: ['Python', 'pandas', 'SQL'],
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
  },
]

const SKILLS = [
  { group: 'Languages', items: ['Python', 'SQL', 'JavaScript/TypeScript', 'Java', 'C++', 'HTML/CSS'] },
  { group: 'AI / GenAI', items: ['Claude & OpenAI APIs', 'LangChain', 'AI agents', 'RAG', 'Embeddings', 'Prompt engineering', 'LLM evaluation', 'FinBERT', 'LightGBM', 'SHAP', 'MLflow'] },
  { group: 'Data & Cloud', items: ['PostgreSQL', 'pgvector', 'Supabase', 'Data pipelines', 'Data quality', 'GCP', 'Dashboards', 'AWS & Databricks (familiar)'] },
  { group: 'Engineering', items: ['FastAPI', 'REST APIs', 'React/Next.js', 'Docker', 'Git/GitHub', 'GitHub Actions', 'Linux', 'Agile'] },
]

function Timeline() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const spine = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative mt-14 pl-10 md:pl-16">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-hairline md:left-5" aria-hidden="true">
        <motion.div
          className="h-full w-px origin-top bg-linear-to-b from-violet via-cyan to-signal shadow-[0_0_12px_rgb(61_224_255/60%)]"
          style={{ scaleY: reduced ? 1 : spine }}
        />
      </div>
      <ol className="flex flex-col gap-8">
        {EXPERIENCE.map((entry, index) => (
          <li key={entry.role + entry.org} className="relative">
            <motion.span
              aria-hidden="true"
              className="absolute -left-[2.15rem] top-10 h-3.5 w-3.5 rounded-full border-2 border-cyan bg-bg md:-left-[3.4rem]"
              initial={reduced ? false : { scale: 0 }}
              whileInView={{ scale: 1, boxShadow: '0 0 18px 3px rgb(61 224 255 / 60%)' }}
              viewport={{ once: true, amount: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            <Reveal from={index % 2 ? 'right' : 'left'}>
              <div className="glass flex items-center gap-6 rounded-2xl p-6">
                <svg viewBox="0 0 24 24" className="hidden h-16 w-16 shrink-0 text-cyan sm:block" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 10px rgb(61 224 255 / 50%))' }}>
                  <path d={entry.icon} />
                </svg>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-2xl font-semibold text-ink">{entry.role}</h3>
                    <span className="mono-label text-faint">{entry.dates}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-cyan">
                    {entry.org}
                    {entry.place && <span className="text-faint"> · {entry.place}</span>}
                  </p>
                  <p className="mt-2 text-sm text-muted">{entry.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.metrics.map((metric) => (
                      <span key={metric} className="mono-label rounded-full border border-hairline-strong bg-white/5 px-3 py-1 text-[0.65rem] text-ink">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Work() {
  return (
    <>
      <PageHero eyebrow="Work" title="Experience & projects." gradientFrom={1} seed={47} />

      <Section tone="base" reveal={false} background={<GridBackdrop />}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {[
            { to: 4000, suffix: '+', label: 'Platform users' },
            { to: 200, prefix: '$', suffix: 'K', label: 'Saved' },
            { to: 95, suffix: '%', label: 'Data accuracy' },
            { to: 6, label: 'Developers led' },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07}>
              <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} className="grad-text font-display text-6xl font-bold" />
              <p className="mono-label mt-2 text-faint">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-24">
          <Eyebrow>Experience</Eyebrow>
          <Timeline />
        </div>
      </Section>

      <FolioTrendCase />

      <Section tone="base" reveal={false}>
        <Eyebrow>Projects</Eyebrow>
        <SplitText as="h2" text="Things I built because I wanted to." className="mt-4 text-4xl font-bold md:text-6xl" />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { title: 'AI Company Evaluator', art: 'eval' as const, description: 'LightGBM risk model + FinBERT news sentiment + a source-cited reasoning agent, with drift monitoring.', tags: ['LightGBM', 'FinBERT', 'pgvector', 'RAG'], href: PROJECT_REPOS.aiCompanyEvaluator, accent: 'signal' as const },
            { title: 'Chaintrace', art: 'chain' as const, description: 'Four LangChain agents validate RFID scans for fraud; a Merkle-tree layer keeps history tamper-proof.', tags: ['LangChain', 'Blockchain', 'RAG'], href: PROJECT_REPOS.chaintrace, accent: 'violet' as const },
            { title: 'MatchWeek', art: 'match' as const, description: 'A supervisor and five specialist agents on live Fantasy Premier League data.', tags: ['Python', 'FastAPI', 'Agents'], href: PROJECT_REPOS.matchWeek, accent: 'cyan' as const },
            { title: 'Ride Match', art: 'ride' as const, description: 'Browser ride-hailing dispatch with live matching, ETAs and surge pricing.', tags: ['TypeScript', 'React'], href: PROJECT_REPOS.rideMatch, accent: 'cyan' as const },
            { title: 'Drinks and Drift', art: 'drift' as const, description: 'Ranks car-meet venues with a fit score grounded in reviews and local ordinances.', tags: ['Python', 'FastAPI', 'RAG'], href: PROJECT_REPOS.drinksAndDrifts, accent: 'violet' as const },
          ].map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.12} className="flex">
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" outerClassName="border-t border-hairline" reveal={false}>
        <Eyebrow>Technical skills</Eyebrow>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {SKILLS.map((group, groupIndex) => (
            <Reveal key={group.group} delay={groupIndex * 0.08}>
              <h3 className="font-display text-2xl font-semibold">{group.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="mono-label rounded-full border border-hairline-strong bg-white/5 px-3 py-1.5 text-[0.68rem] text-ink"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}

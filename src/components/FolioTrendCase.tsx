import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { Reveal } from './Reveal'
import { Eyebrow } from './Section'
import { CountUp } from './motion/CountUp'
import { PinnedSteps, type Step } from './motion/PinnedSteps'
import { SplitText } from './motion/SplitText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { FOLIOTREND_URL } from '../lib/links'

const LINE = 'M0 150 C 40 140, 60 96, 100 108 S 160 58, 200 70 S 258 30, 300 18'

function TrendChart({ delay = 0.4 }: { delay?: number }) {
  const reduced = usePrefersReducedMotion()
  return (
    <svg viewBox="0 0 300 180" className="h-auto w-full" role="img" aria-label="Illustrative upward-trending line chart">
      <defs>
        <linearGradient id="ft-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ft-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8b7cff" />
          <stop offset="60%" stopColor="#3de0ff" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
      ))}
      <motion.path d={`${LINE} L300 180 L0 180 Z`} fill="url(#ft-area)" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: delay + 1, duration: 1 }} />
      <motion.path d={LINE} fill="none" stroke="url(#ft-line)" strokeWidth="3" strokeLinecap="round" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay, duration: 2, ease: [0.16, 1, 0.3, 1] }} />
    </svg>
  )
}

function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mono-label text-cyan">{label}</p>
      <div className="mt-5">{children}</div>
      <p className="mono-label mt-5 text-faint">Illustrative</p>
    </div>
  )
}

function PortfolioVisual() {
  const reduced = usePrefersReducedMotion()
  const slices = [
    { len: 90, offset: 0, color: '#8b7cff' },
    { len: 60, offset: -90, color: '#3de0ff' },
    { len: 40, offset: -150, color: '#4ade80' },
  ]
  return (
    <Panel label="04 / Portfolio">
      <svg viewBox="0 0 120 120" className="mx-auto h-44 w-44 -rotate-90" aria-hidden="true">
        {slices.map((slice, index) => (
          <motion.circle key={slice.color} cx="60" cy="60" r="30.3" fill="none" stroke={slice.color} strokeWidth="14" strokeDasharray={`${slice.len} 190.4`} strokeDashoffset={slice.offset} initial={reduced ? false : { opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} transition={{ delay: index * 0.25, duration: 0.9 }} />
        ))}
      </svg>
    </Panel>
  )
}

const STEPS: Step[] = [
  {
    title: 'Data',
    body: 'Pipelines in.',
    visual: (
      <Panel label="01 / Data">
        <ul className="space-y-3">
          {['Source', 'Clean', 'Store'].map((row, index) => (
            <li key={row} className="relative overflow-hidden rounded-xl border border-hairline bg-white/3 px-4 py-4 text-sm text-ink">
              {row}
              <motion.span aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-cyan/25 to-transparent" animate={{ x: ['-100%', '400%'] }} transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.5, ease: 'linear' }} />
            </li>
          ))}
        </ul>
      </Panel>
    ),
  },
  { title: 'Analytics', body: 'Trends out.', visual: <Panel label="02 / Analytics"><TrendChart delay={0.1} /></Panel> },
  {
    title: 'Insight',
    body: 'LLMs explain.',
    visual: (
      <Panel label="03 / Insight">
        <div className="space-y-3 text-sm">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-violet/25 px-4 py-3 text-ink">What's diversification?</motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="max-w-[88%] rounded-2xl rounded-bl-sm border border-hairline bg-white/5 px-4 py-3 text-muted">Don't put all your eggs in one basket.</motion.div>
        </div>
      </Panel>
    ),
  },
  { title: 'Portfolio', body: 'One dashboard.', visual: <PortfolioVisual /> },
]

const TOOLS = [
  { name: 'Dashboard', d: 'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z' },
  { name: 'Portfolio', d: 'M3 8h18v12H3zM9 8V5h6v3' },
  { name: 'Live Quotes', d: 'M3 17l6-6 4 4 8-9M15 6h6v6' },
  { name: 'Insights', d: 'M12 3a6 6 0 00-4 10.5V17h8v-3.5A6 6 0 0012 3zM9 21h6' },
  { name: 'Strategies', d: 'M12 2l3 7 7 .6-5.3 4.7 1.7 7L12 17.6 5.6 21.3l1.7-7L2 9.6 9 9z' },
  { name: 'Watchlist', d: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z' },
  { name: 'Screener', d: 'M3 5h18l-7 8v6l-4 2v-8z' },
  { name: 'Backtester', d: 'M3 12a9 9 0 109-9M3 4v5h5M12 7v5l3 2' },
  { name: 'Risk Map', d: 'M12 3l9 4v5c0 5-4 8-9 9-5-1-9-4-9-9V7z' },
  { name: 'Compare', d: 'M7 4v16M17 4v16M3 8h8M13 16h8' },
]

/** Featured FolioTrend case study shown on the Work page. */
export function FolioTrendCase() {
  return (
    <section id="foliotrend" className="relative border-y border-hairline bg-surface">
      <div className="mx-auto max-w-(--content-max) px-6 pt-24 md:pt-32">
        <Eyebrow>Featured · Founder</Eyebrow>
        <div className="mt-6 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SplitText as="h2" text="FolioTrend." gradientFrom={0} className="text-6xl font-bold leading-none md:text-9xl" />
            <p className="mt-6 font-display text-2xl text-muted md:text-3xl">AI investing, made simple.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href={FOLIOTREND_URL}>Visit foliotrend.com</MagneticButton>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <CountUp to={750} prefix="$" className="grad-text font-display text-6xl font-bold" />
                <p className="mono-label mt-2 text-faint">MRR</p>
              </div>
              <div>
                <CountUp to={50} suffix="+" className="grad-text font-display text-6xl font-bold" />
                <p className="mono-label mt-2 text-faint">active users</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label text-faint">Portfolio trend</span>
              <span className="mono-label rounded-full border border-hairline px-3 py-1 text-signal">Illustrative</span>
            </div>
            <div className="mt-6">
              <TrendChart />
            </div>
          </div>
        </div>
      </div>

      <PinnedSteps
        steps={STEPS}
        heading={
          <>
            <Eyebrow>How it works</Eyebrow>
            <SplitText as="h3" text="Data to decision." className="mt-4 text-4xl font-bold md:text-6xl" />
          </>
        }
      />

      <div className="mx-auto max-w-(--content-max) px-6 pb-24 md:pb-32">
        <Eyebrow>Inside the app</Eyebrow>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {TOOLS.map((tool, index) => (
            <Reveal key={tool.name} delay={(index % 5) * 0.06} from="scale">
              <div className="glass group flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition-colors duration-300 hover:border-cyan/50">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-cyan transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 8px rgb(61 224 255 / 45%))' }}>
                  <path d={tool.d} />
                </svg>
                <span className="text-sm font-medium text-ink">{tool.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

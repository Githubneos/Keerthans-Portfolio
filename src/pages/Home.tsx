import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { MagneticButton } from '../components/MagneticButton'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Eyebrow, Section } from '../components/Section'
import { Aurora } from '../components/motion/Aurora'
import { AutoTabs, type Tab } from '../components/motion/AutoTabs'
import { CompareReveal } from '../components/motion/CompareReveal'
import { CountUp } from '../components/motion/CountUp'
import { GridBackdrop } from '../components/motion/GridBackdrop'
import { HorizontalScroll } from '../components/motion/HorizontalScroll'
import { Marquee } from '../components/motion/Marquee'
import { NeuralField } from '../components/motion/NeuralField'
import { PinnedSteps, type Step } from '../components/motion/PinnedSteps'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/Reveal'
import { PROJECT_REPOS } from '../lib/links'

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.08 }}
          className="mono-label rounded-full border border-hairline-strong bg-white/5 px-4 py-2 text-ink"
        >
          {item}
        </motion.span>
      ))}
    </div>
  )
}

function Bars({ values }: { values: [string, number][] }) {
  return (
    <ul className="space-y-4">
      {values.map(([label, value], index) => (
        <li key={label}>
          <div className="mono-label flex justify-between text-faint">
            <span>{label}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-violet to-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 1.1, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

function AgentGraph() {
  const agents = ['Plausibility', 'Clone detection', 'Compliance', 'Investigator']
  return (
    <div className="relative grid grid-cols-2 gap-3">
      {agents.map((agent, index) => (
        <motion.div
          key={agent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.12 }}
          className="relative rounded-xl border border-hairline-strong bg-white/5 px-4 py-5 text-center text-sm text-ink"
        >
          <span className="absolute right-2 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-signal" aria-hidden="true" />
          {agent}
        </motion.div>
      ))}
    </div>
  )
}

function DashboardMock() {
  return (
    <div className="rounded-2xl border border-hairline bg-bg/60 p-4">
      <div className="mb-3 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-ember/80" />
        <span className="h-2 w-2 rounded-full bg-violet/80" />
        <span className="h-2 w-2 rounded-full bg-signal/80" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="h-12 rounded-lg bg-white/6" />
        ))}
      </div>
      <svg viewBox="0 0 300 90" className="mt-3 h-auto w-full" aria-hidden="true">
        <motion.path
          d="M0 70 C 40 60, 60 30, 100 40 S 170 20, 210 30 S 270 10, 300 8"
          fill="none"
          stroke="#3de0ff"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6 }}
        />
      </svg>
    </div>
  )
}

const TABS: Tab[] = [
  { id: 'data', label: 'Data', title: 'Clean it. Trust it.', visual: <Chips items={['PostgreSQL', 'pgvector', 'Supabase', 'SQL', 'Data quality', 'Pipelines']} /> },
  { id: 'models', label: 'Models', title: 'Train it. Prove it.', visual: <Bars values={[['LightGBM risk model', 92], ['FinBERT news sentiment', 86], ['SHAP attribution', 78]]} /> },
  { id: 'agents', label: 'Agents', title: 'Let agents reason.', visual: <AgentGraph /> },
  { id: 'product', label: 'Product', title: 'Ship it to users.', visual: <DashboardMock /> },
]

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <motion.svg
        viewBox="0 0 24 24"
        className="h-36 w-36 text-cyan"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ filter: 'drop-shadow(0 0 14px rgb(61 224 255 / 55%))' }}
      >
        <motion.path d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} />
      </motion.svg>
      <p className="mono-label text-faint">{label}</p>
    </div>
  )
}

const STEPS: Step[] = [
  { title: 'Spot', body: 'See a problem.', visual: <Icon label="01 / Observe" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z" /> },
  { title: 'Wrangle', body: 'Clean the data.', visual: <Icon label="02 / Data" d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /> },
  { title: 'Build', body: 'Ship the system.', visual: <Icon label="03 / Build" d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /> },
  { title: 'Learn', body: 'Keep what works.', visual: <Icon label="04 / Learn" d="M3 17l6-6 4 4 8-9M15 6h6v6" /> },
]

const STACK = ['Python', 'TypeScript', 'React', 'SQL', 'LangChain', 'FastAPI', 'Supabase', 'LightGBM', 'FinBERT', 'RAG', 'Claude API', 'OpenAI API']

const STATS = [
  { to: 4000, suffix: '+', label: 'Users on a 3D investor platform' },
  { to: 1000, suffix: '+', label: 'Waitlisted participants' },
  { to: 750, prefix: '$', label: 'FolioTrend MRR' },
  { to: 50, suffix: '+', label: 'FolioTrend active users' },
  { to: 70, suffix: '%', label: 'Less effort in ML workflows' },
  { to: 200, prefix: '$', suffix: 'K', label: 'Saved by process gains' },
]

export function Home() {
  const zero = useMotionValue(0)
  const one = useMotionValue(1)

  return (
    <>
      <PageHero eyebrow="AI engineer · Founder · Writer" title="I build systems that think." gradientFrom={3} seed={5}>
        <div className="flex flex-wrap gap-4">
          <MagneticButton to="/work" variant="primary">
            View my work
          </MagneticButton>
          <MagneticButton to="/writing" variant="secondary">
            Read my writing
          </MagneticButton>
        </div>
      </PageHero>

      <div className="border-y border-hairline bg-surface py-5 font-display text-2xl font-semibold text-muted md:text-3xl">
        <Marquee items={STACK} />
      </div>

      <Section tone="base" reveal={false} background={<GridBackdrop />}>
        <Eyebrow>What I do</Eyebrow>
        <SplitText as="h2" text="From raw data to running product." gradientFrom={3} className="mt-4 max-w-[16ch] text-4xl font-bold md:text-6xl" />
        <div className="mt-12">
          <AutoTabs tabs={TABS} />
        </div>
      </Section>

      <Section tone="surface" outerClassName="border-y border-hairline" reveal={false}>
        <Eyebrow>Before / after</Eyebrow>
        <SplitText as="h2" text="Noise in. Signal out." className="mt-4 text-4xl font-bold md:text-6xl" />
        <div className="mt-10">
          <CompareReveal
            beforeLabel="Raw signal"
            afterLabel="Connected intelligence"
            before={
              <div className="grid h-full w-full place-items-center bg-bg/50 p-6">
                <NeuralField progress={zero} seed={21} className="h-full w-full max-w-xl" />
              </div>
            }
            after={
              <div className="grid h-full w-full place-items-center bg-linear-to-br from-violet/15 to-cyan/10 p-6">
                <NeuralField progress={one} seed={21} className="h-full w-full max-w-xl" />
              </div>
            }
          />
        </div>
      </Section>

      <Section tone="base" reveal={false}>
        <Eyebrow>Built for scale</Eyebrow>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={(index % 3) * 0.08}>
              <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} className="grad-text font-display text-6xl font-bold md:text-7xl" />
              <p className="mono-label mt-3 max-w-[22ch] text-faint">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <PinnedSteps
        steps={STEPS}
        heading={
          <>
            <Eyebrow>How I work</Eyebrow>
            <SplitText as="h2" text="Problem to system." className="mt-4 text-4xl font-bold md:text-6xl" />
          </>
        }
      />

      <HorizontalScroll
        header={
          <>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Projects{' '}
              <Link to="/work" className="text-xl text-cyan underline underline-offset-4">
                see all
              </Link>
            </h2>
          </>
        }
      >
        {[
          <ProjectCard key="e" art="eval" title="AI Company Evaluator" description="Risk model + live news sentiment + a reasoning agent." tags={['LightGBM', 'FinBERT', 'RAG']} href={PROJECT_REPOS.aiCompanyEvaluator} accent="signal" />,
          <ProjectCard key="c" art="chain" title="Chaintrace" description="Four agents catch RFID fraud, anchored on-chain." tags={['LangChain', 'Blockchain']} href={PROJECT_REPOS.chaintrace} accent="violet" />,
          <ProjectCard key="m" art="match" title="MatchWeek" description="Five agents, one Premier League brain." tags={['Python', 'FastAPI']} href={PROJECT_REPOS.matchWeek} accent="cyan" />,
          <ProjectCard key="r" art="ride" title="Ride Match" description="Live ride-hailing dispatch sim." tags={['TypeScript', 'React']} href={PROJECT_REPOS.rideMatch} accent="cyan" />,
          <ProjectCard key="d" art="drift" title="Drinks and Drift" description="Find the best car-meet spots." tags={['Python', 'RAG']} href={PROJECT_REPOS.drinksAndDrifts} accent="violet" />,
        ]}
      </HorizontalScroll>

      <Section tone="surface" outerClassName="border-t border-hairline" reveal={false} background={<Aurora className="opacity-70" />}>
        <div className="py-8 text-center">
          <SplitText as="h2" text="Let's build something." gradientFrom={2} className="mx-auto max-w-[12ch] text-6xl font-bold md:text-8xl" />
          <div className="mt-10 flex justify-center">
            <MagneticButton to="/contact">Get in touch</MagneticButton>
          </div>
        </div>
      </Section>
    </>
  )
}

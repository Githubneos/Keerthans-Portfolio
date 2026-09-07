import { Section } from '../components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { TiltPhoto } from '../components/TiltPhoto'
import { PROJECT_REPOS } from '../lib/links'
import rocketLaunch from '../assets/rocket-launch.jpg'

const EXPERIENCE = [
  {
    role: 'Data Analyst Intern',
    org: 'Ari Tech Consulting',
    dates: 'Feb 2024 – June 2026',
    summary:
      'Automated recurring data-cleaning and reporting work in Python (pandas) and SQL, and restructured data pipelines to pull directly from source systems for faster, more reliable client reporting.',
  },
  {
    role: 'Founder',
    org: 'Foliotrend',
    dates: 'Apr 2025 – Present',
    summary:
      'Built and scaled a fintech product to $750 MRR and 50+ users — React/JavaScript dashboards, a Python/REST API on Supabase, and LangChain-powered LLM workflows for beginner-friendly investment insights.',
  },
  {
    role: 'Build Lead',
    org: 'Optix - Robotics Club',
    dates: 'Sept 2022 – Mar 2026',
    summary:
      'Led the robot build team for an FRC competition robot — mechanical design in Onshape, coordinating 10 students across fabrication and assembly for 4 competitions.',
  },
]

export function Work() {
  return (
    <>
      <Section tone="cream" reveal={false}>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-block rounded-sm bg-crimson px-2 py-0.5 text-xs font-medium text-ink-on-dark">
              Work
            </span>
            <h1 className="mt-4 max-w-[24ch] text-3xl font-semibold text-ink md:text-5xl">
              Experience and independent projects.
            </h1>
          </div>
          <TiltPhoto
            src={rocketLaunch}
            alt="A rocket lifting off at dusk (NASA)"
            accent="brown"
            rotate={-2}
            floatDelay={0.2}
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </Section>

      <Section tone="surface">
        <h2 className="text-2xl font-semibold text-ink">Experience</h2>
        <div className="mt-8 flex flex-col gap-6">
          {EXPERIENCE.map((entry) => (
            <div key={entry.role + entry.org} className="rounded-sm border border-hairline bg-bg p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-ink">{entry.role}</h3>
                <span className="text-sm text-faint">{entry.dates}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-crimson-text">{entry.org}</p>
              <p className="mt-2 max-w-[60ch] text-sm text-muted">{entry.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="text-2xl font-semibold text-ink">Independent projects</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProjectCard
            title="Chaintrace"
            description="A four-agent LangChain pipeline that validates RFID scans for fraud in real time, anchoring tamper-proof scan history on-chain via Merkle-tree batch commitments."
            tags={['Solidity', 'LangChain', 'Blockchain']}
            href={PROJECT_REPOS.chaintrace}
            accent="crimson"
          />
          <ProjectCard
            title="Ride Match"
            description="A browser-based ride-hailing dispatch simulator with real-time nearest-driver matching, ETA calculation, and dynamic surge pricing, built entirely as a client-side React app."
            tags={['TypeScript', 'React', 'Simulation']}
            href={PROJECT_REPOS.rideMatch}
            accent="brown"
          />
          <ProjectCard
            title="MatchWeek"
            description="A multi-agent Premier League assistant — a supervisor orchestrates five specialist agents (stats, news/injury, tactical, fantasy captain, scouting) over live Fantasy Premier League data."
            tags={['Python', 'FastAPI', 'LLM Agents']}
            href={PROJECT_REPOS.matchWeek}
            accent="olive"
          />
          <ProjectCard
            title="Drinks and Drift"
            description="A location-based app that finds and ranks venues for car meets, cars-and-coffee hangouts, and drift gatherings, using a fit score grounded in reviews, forum reports, and local ordinances."
            tags={['Python', 'FastAPI', 'RAG']}
            href={PROJECT_REPOS.drinksAndDrifts}
            accent="olive"
          />
        </div>
      </Section>
    </>
  )
}

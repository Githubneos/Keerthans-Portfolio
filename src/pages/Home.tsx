import { Link } from 'react-router-dom'
import { MagneticButton } from '../components/MagneticButton'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { TiltPhoto } from '../components/TiltPhoto'
import { NetworkGraphic } from '../components/NetworkGraphic'
import { Starfield } from '../components/Starfield'
import { PROJECT_REPOS } from '../lib/links'
import satelliteEarth from '../assets/satellite-earth.jpg'

export function Home() {
  return (
    <>
      <Section tone="espresso" reveal={false} background={<Starfield />}>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-block rounded-sm bg-crimson px-2 py-0.5 text-xs font-medium text-ink-on-dark">
              Builder &amp; writer
            </span>
            <h1 className="mt-4 max-w-[16ch] text-4xl font-semibold leading-tight md:text-6xl">
              Builder, writer, and independent thinker.
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg text-ink-on-dark/80">
              This is my digital CV — a running record of what I've built, what I'm working on now, and
              what I write about in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton to="/work" variant="primary">
                View my work
              </MagneticButton>
              <MagneticButton to="/writing" variant="secondary-on-dark">
                Read my writing
              </MagneticButton>
            </div>
          </div>
          <TiltPhoto
            src={satelliteEarth}
            alt="Illustration of a satellite orbiting Earth (NASA)"
            accent="olive"
            rotate={-2}
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What I do</h2>
            <p className="mt-4 max-w-[60ch] text-muted">
              I work across data analysis, full-stack development, and applied AI, with a focus on
              intelligent systems and data-driven applications. I founded Foliotrend, an AI-powered
              investment platform, and have built machine learning systems for satellite collision
              prediction, a RAG application for legal document analysis, and multi-agent systems for
              financial analysis. Before that, I worked in data analytics, using Python and SQL to automate
              reporting. I like problems that need real technical depth and real judgment, and I'm always
              chasing the next thing worth learning.
            </p>
          </div>
          <NetworkGraphic className="hidden h-auto w-full max-w-[220px] text-ink md:block" />
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="text-2xl font-semibold text-ink">Selected work</h2>
        <p className="mt-3 max-w-[60ch] text-muted">
          A couple of independent projects. See the full list on the{' '}
          <Link to="/work" className="text-crimson-text">
            work page
          </Link>
          .
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProjectCard
            title="Chaintrace"
            description="A four-agent LangChain pipeline that validates RFID scans for fraud in real time, anchoring tamper-proof scan history on-chain."
            tags={['Solidity', 'LangChain', 'Blockchain']}
            href={PROJECT_REPOS.chaintrace}
            accent="crimson"
          />
          <ProjectCard
            title="Ride Match"
            description="A browser-based ride-hailing dispatch simulator with real-time nearest-driver matching, ETA calculation, and dynamic surge pricing."
            tags={['TypeScript', 'React', 'Simulation']}
            href={PROJECT_REPOS.rideMatch}
            accent="brown"
          />
        </div>
      </Section>

      <Section tone="crimson">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-[24ch] text-2xl font-semibold">Want the full picture? Let's talk.</h2>
          <MagneticButton to="/contact" variant="secondary-on-dark">
            Get in touch
          </MagneticButton>
        </div>
      </Section>
    </>
  )
}

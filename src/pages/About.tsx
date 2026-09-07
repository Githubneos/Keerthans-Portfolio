import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltPhoto } from '../components/TiltPhoto'
import { Starfield } from '../components/Starfield'
import keerthanPhoto from '../assets/keerthan-about.jpg'
import keerthanPhoto2 from '../assets/keerthan-about-2.jpg'

const FACTS = [
  { term: 'Based in', detail: 'San Diego, CA' },
  { term: 'Focus', detail: 'Applied AI & full-stack engineering' },
  { term: 'Also building', detail: 'Foliotrend' },
  { term: 'Writing', detail: 'Skeptical Optimist' },
  { term: 'Open to', detail: 'Internships, roles, and collaborations' },
]

export function About() {
  return (
    <>
      <Section tone="cream" reveal={false}>
        <span className="inline-block rounded-sm bg-crimson px-2 py-0.5 text-xs font-medium text-ink-on-dark">
          About
        </span>
        <h1 className="mt-4 max-w-[20ch] text-3xl font-semibold text-ink md:text-5xl">
          Building things, betting cautiously on the future.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <p className="max-w-[64ch] text-lg text-ink">
              Hello! My name is Keerthan. Below you'll find some information on my background, my
              interests, and what I've been building recently.
            </p>
            <p className="mt-6 max-w-[64ch] text-muted">
              I have experience in data analysis, full-stack development, and AI applications, with a
              special focus on intelligent systems and applications based on data. I enjoy working through
              all phases of the process: designing an application, automating the workflow around it,
              analyzing the data it outputs, and figuring out which AI techniques actually work and which
              don't.
            </p>
            <p className="mt-4 max-w-[64ch] text-muted">
              This is how most of my projects begin: seeing a problem and trying to solve it by building
              something on top of it. I created Foliotrend, an AI-based investment platform with data
              pipelines, financial analytics, portfolio management, and LLM workflows. I've also built a
              machine learning system to predict satellite collisions, a RAG-based system for analyzing
              legal documents, and multi-agent systems for financial analysis. Prior to all this, I worked
              in data analytics and automation.
            </p>
            <p className="mt-4 max-w-[64ch] text-muted">
              I'm fascinated by AI engineering, software engineering, data science, and the technology
              underlying all of it. I thrive on challenges that require digging deep and thinking
              critically, always looking for the next thing to master.
            </p>
            <p className="mt-4 max-w-[64ch] text-muted">
              This combination of being skeptical of the field's marketing and optimistic about the end
              result is precisely why I write Skeptical Optimist. I want to stay informed about the
              bleeding edge of AI and startups, and I learn by writing about them.
            </p>
            <p className="mt-4 max-w-[64ch] text-muted">
              Away from engineering, I like playing pickleball, following soccer, checking out cars I
              shouldn't be buying, and playing cards with friends. I believe great ideas always come from
              having a life outside your work. I'm always up for meeting someone, catching up on tech talk,
              exchanging ideas, or learning about a project.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-16 max-w-[15rem] pt-2 pl-6">
              <TiltPhoto
                src={keerthanPhoto}
                alt="Keerthan Karumudi standing outdoors in front of the Washington Monument"
                accent="crimson"
                rotate={-3}
              />
              <TiltPhoto
                src={keerthanPhoto2}
                alt="Keerthan Karumudi standing on a balcony overlooking the ocean in San Diego"
                accent="olive"
                rotate={3}
                floatDelay={0.6}
                className="-ml-14 mt-[-4.5rem] w-[85%]"
              />
            </div>

            <aside className="rounded-sm border border-hairline bg-surface p-6">
              <h2 className="sr-only">Facts</h2>
              <dl>
                {FACTS.map((fact, index) => (
                  <div key={fact.term} className={index > 0 ? 'mt-4' : ''}>
                    <dt className="text-xs text-faint">{fact.term}</dt>
                    <dd className="mt-1 text-ink">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section tone="espresso" background={<Starfield />}>
        <blockquote className="mx-auto max-w-[44ch] text-center font-serif-italic text-2xl italic leading-snug md:text-3xl">
          <span className="mb-4 block h-0.5 w-10 mx-auto bg-olive" aria-hidden="true" />
          "You have power over your mind, not outside events."
          <footer className="mt-4 font-body text-sm not-italic text-ink-on-dark/70">
            Marcus Aurelius, <cite className="not-italic">Meditations</cite>
          </footer>
        </blockquote>
      </Section>
    </>
  )
}

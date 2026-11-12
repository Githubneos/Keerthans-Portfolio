import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

const EXPERIENCE = [
  {
    org: 'SYNK',
    role: 'AI Engineer Intern',
    dates: '2026',
    line: 'Built 3D web environments for virtual investor events, with proximity-based avatar voice chat.',
  },
  {
    org: 'Pilot City',
    role: 'Machine Learning Developer',
    dates: '2025',
    line: 'Led six developers through two Python machine learning projects, from data prep to delivery.',
  },
  {
    org: 'UC San Diego',
    role: 'Particle Physics Researcher',
    dates: '2025',
    line: 'Cleaned, processed and plotted experimental data in Python for a five-person lab.',
  },
]

export function Experience() {
  return (
    <Section id="experience" numeral="III" label="Experience" title="Where I’ve worked.">
      <ol className="border-t border-hairline-strong">
        {EXPERIENCE.map((job, index) => (
          <Reveal key={job.org} delay={index * 0.08}>
            <li className="group grid gap-3 border-b border-hairline-strong py-9 transition-colors hover:bg-white-wall/40 md:grid-cols-[7rem_1fr_1.1fr] md:items-baseline md:gap-10 md:px-4">
              <span className="plaque text-burgundy">{job.dates}</span>
              <div>
                <h3 className="text-3xl text-navy transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">{job.org}</h3>
                <p className="mt-1 text-sm text-muted">{job.role}</p>
              </div>
              <p className="max-w-[42ch] text-navy">{job.line}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

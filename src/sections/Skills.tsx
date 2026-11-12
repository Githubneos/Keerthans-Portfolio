import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

const SKILLS = [
  { group: 'Languages', items: 'Python, SQL, TypeScript, Solidity' },
  { group: 'AI', items: 'LLM APIs, LangChain, agents, RAG, evals, LightGBM, MLflow' },
  { group: 'Data and cloud', items: 'PostgreSQL, pgvector, Supabase, Fly.io' },
  { group: 'Engineering', items: 'FastAPI, React, Docker, GitHub Actions, pytest' },
]

export function Skills() {
  return (
    <Section id="skills" numeral="V" label="Skills" title="What I work with.">
      <dl className="border-t border-hairline-strong">
        {SKILLS.map((row, index) => (
          <Reveal key={row.group} delay={index * 0.06}>
            <div className="grid gap-2 border-b border-hairline-strong py-7 md:grid-cols-[14rem_1fr] md:gap-10 md:px-4">
              <dt className="plaque pt-1.5 text-burgundy">{row.group}</dt>
              <dd className="text-xl text-navy md:text-2xl">{row.items}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}

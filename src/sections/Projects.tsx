import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { FOLIOTREND_URL, PROJECT_REPOS } from '../lib/links'

const PROJECTS = [
  {
    title: 'FolioTrend',
    line: 'AI research for self-directed investors: factor scores, stress tests and plain-English explanations.',
    tags: 'Python · FastAPI · LangChain · React',
    href: FOLIOTREND_URL,
  },
  {
    title: 'MatchWeek Copilot',
    line: 'Five specialist agents answer Premier League questions with live data and match reports.',
    tags: 'Python · Gemini · RAG · Docker',
    href: PROJECT_REPOS.matchWeek,
  },
  {
    title: 'FinEval',
    line: 'An explainable risk model and news sentiment pipeline built on SEC filings.',
    tags: 'LightGBM · FinBERT · SHAP · MLflow',
    href: PROJECT_REPOS.aiCompanyEvaluator,
  },
  {
    title: 'ChainTrace',
    line: 'Agents screen supply-chain scans and send only the anomalies to a human.',
    tags: 'LangChain · RAG · Solidity',
    href: PROJECT_REPOS.chaintrace,
  },
]

export function Projects() {
  return (
    <Section id="projects" numeral="IV" label="Projects" title="Things I’ve built.">
      <ul className="border-t border-hairline-strong">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.07}>
            <li>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-baseline gap-2 border-b border-hairline-strong py-9 transition-colors hover:bg-white-wall/40 md:grid-cols-[1fr_1.1fr_2rem] md:gap-10 md:px-4"
              >
                <span>
                  <span className="block font-display text-3xl text-navy transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">{project.title}</span>
                  <span className="plaque mt-2 block text-faint">{project.tags}</span>
                </span>
                <span className="max-w-[42ch] text-navy">{project.line}</span>
                <span aria-hidden="true" className="hidden text-2xl text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-burgundy md:block">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

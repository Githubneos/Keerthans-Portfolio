import { EssayCard } from '../components/EssayCard'
import { BASE_CLASSES, VARIANT_CLASSES } from '../components/MagneticButton'
import { Section } from '../components/Section'
import { useLatestEssays, type Essay } from '../hooks/useLatestEssays'
import { SOCIAL_LINKS } from '../lib/links'

const FALLBACK_ESSAYS: Essay[] = [
  { title: 'Read the latest on Skeptical Optimist', hook: 'New essays on AI, technology and the world.', href: SOCIAL_LINKS.substack },
]

export function Writing() {
  const state = useLatestEssays()
  const essays = (state.status === 'success' ? state.essays : FALLBACK_ESSAYS).slice(0, 3)

  return (
    <Section id="writing" numeral="VI" label="Writing" title="Skeptical Optimist.">
      <div className="border-t border-hairline-strong">
        {essays.map((essay, index) => (
          <EssayCard key={essay.href + essay.title} index={index} title={essay.title} hook={essay.hook} href={essay.href} />
        ))}
      </div>
      <a href={SOCIAL_LINKS.substack} target="_blank" rel="noopener noreferrer" className={`${BASE_CLASSES} ${VARIANT_CLASSES.primary} mt-10`}>
        Subscribe on Substack
      </a>
    </Section>
  )
}

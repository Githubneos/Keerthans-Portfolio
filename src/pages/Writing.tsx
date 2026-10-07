import { Eyebrow, Section } from '../components/Section'
import { EssayCard } from '../components/EssayCard'
import { MagneticButton } from '../components/MagneticButton'
import { PageHero } from '../components/PageHero'
import { Aurora } from '../components/motion/Aurora'
import { GridBackdrop } from '../components/motion/GridBackdrop'
import { SplitText } from '../components/motion/SplitText'
import { useLatestEssays, type Essay } from '../hooks/useLatestEssays'
import { SOCIAL_LINKS } from '../lib/links'

const FALLBACK_ESSAYS: Essay[] = [
  {
    title: 'Read the latest on Skeptical Optimist',
    hook: 'New essays on AI, technology, and the world at large.',
    href: SOCIAL_LINKS.substack,
  },
  {
    title: 'Browse the full archive',
    hook: 'Every past essay, in one place, on Substack.',
    href: SOCIAL_LINKS.substack,
  },
]

export function Writing() {
  const state = useLatestEssays()
  const essays = state.status === 'success' ? state.essays : FALLBACK_ESSAYS

  return (
    <>
      <PageHero eyebrow="Writing" title="Skeptical Optimist" gradientFrom={1} seed={79}>
        <blockquote className="max-w-[34ch] border-l-2 border-cyan pl-6 font-serif-italic text-2xl italic leading-snug text-ink md:text-3xl">
          Interesting things that happen in the world.
        </blockquote>
      </PageHero>

      <Section tone="surface" outerClassName="border-y border-hairline" background={<Aurora className="opacity-60" />}>
        <Eyebrow>Newsletter</Eyebrow>
        <h2 className="mt-4 text-4xl font-bold md:text-6xl">Equal parts doubt and hope.</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <MagneticButton href={SOCIAL_LINKS.substack} variant="primary">
            Read the archive
          </MagneticButton>
          <MagneticButton href={SOCIAL_LINKS.substack} variant="secondary">
            Subscribe
          </MagneticButton>
        </div>
      </Section>

      <Section tone="base" reveal={false} background={<GridBackdrop />}>
        <Eyebrow>Featured essays</Eyebrow>
        <SplitText as="h2" text="Latest from the archive." className="mt-4 text-4xl font-bold md:text-6xl" />
        <div className="mt-10 border-t border-hairline">
          {essays.map((essay, index) => (
            <EssayCard key={essay.href + essay.title} index={index} title={essay.title} hook={essay.hook} href={essay.href} />
          ))}
        </div>
      </Section>
    </>
  )
}

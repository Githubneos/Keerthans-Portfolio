import { Section } from '../components/Section'
import { MagneticButton } from '../components/MagneticButton'
import { EssayCard } from '../components/EssayCard'
import { TiltPhoto } from '../components/TiltPhoto'
import { Starfield } from '../components/Starfield'
import { useLatestEssays, type Essay } from '../hooks/useLatestEssays'
import { SOCIAL_LINKS } from '../lib/links'
import citylightsOrbit from '../assets/citylights-orbit.jpg'

const FALLBACK_ESSAYS: Essay[] = [
  {
    title: 'Read the latest on Space Signal',
    hook: 'New essays on AI, technology, and the world at large — updated regularly on Substack.',
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
      <Section tone="cream" reveal={false}>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-block rounded-sm bg-crimson px-2 py-0.5 text-xs font-medium text-ink-on-dark">
              Writing
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-ink md:text-5xl">Skeptical Optimist</h1>
            <blockquote className="mt-8 max-w-[60ch] border-l-2 border-olive pl-6 font-serif-italic text-2xl italic leading-snug text-ink">
              Interesting things that happen in the world.
            </blockquote>
          </div>
          <TiltPhoto
            src={citylightsOrbit}
            alt="City lights seen from the International Space Station at night (NASA)"
            accent="crimson"
            rotate={2}
            floatDelay={0.4}
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </Section>

      <Section tone="espresso" background={<Starfield />}>
        <h2 className="text-xl font-semibold">Read the newsletter</h2>
        <p className="mt-2 max-w-[56ch] text-ink-on-dark/80">
          Essays on AI, technology, and the world at large — written with equal parts doubt and hope.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <MagneticButton href={SOCIAL_LINKS.substack} variant="primary">
            Read the archive
          </MagneticButton>
          <MagneticButton href={SOCIAL_LINKS.substack} variant="secondary-on-dark">
            Subscribe
          </MagneticButton>
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="text-2xl font-semibold text-ink">Featured essays</h2>
        <div className="mt-4">
          {essays.map((essay) => (
            <EssayCard key={essay.href + essay.title} title={essay.title} hook={essay.hook} href={essay.href} />
          ))}
        </div>
      </Section>
    </>
  )
}

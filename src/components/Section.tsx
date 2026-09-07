import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Tone = 'cream' | 'surface' | 'crimson' | 'espresso' | 'olive'

const TONE_CLASSES: Record<Tone, string> = {
  cream: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  crimson: 'bg-crimson text-ink-on-dark',
  espresso: 'bg-espresso text-ink-on-dark',
  olive: 'bg-olive text-espresso',
}

interface SectionProps {
  children: ReactNode
  tone?: Tone
  delay?: number
  /** false for the hero -- renders immediately, doesn't wait for scroll into view */
  reveal?: boolean
  /** extra classes on the inner max-w content */
  className?: string
  /** extra classes on the full-bleed tone-colored outer band */
  outerClassName?: string
  as?: 'div' | 'section'
  /** optional decorative layer (e.g. Starfield), rendered behind the content */
  background?: ReactNode
}

/**
 * Full-bleed color-block band (outer) with an inset max-width content
 * container (inner). The tone band is always present -- only the inner
 * content fades/blurs in via Reveal, so scrolling to a new band never
 * looks like a color flash.
 */
export function Section({
  children,
  tone = 'cream',
  delay = 0,
  reveal = true,
  className,
  outerClassName,
  as = 'section',
  background,
}: SectionProps) {
  const Tag = as
  const content = reveal ? (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  ) : (
    <div className={className}>{children}</div>
  )

  return (
    <Tag className={`relative overflow-hidden ${TONE_CLASSES[tone]} ${outerClassName ?? ''}`}>
      {background}
      <div className="relative z-10 mx-auto max-w-(--content-max) px-6 py-24 md:py-28">{content}</div>
    </Tag>
  )
}

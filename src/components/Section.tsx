import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Tone = 'base' | 'surface' | 'raised'

const TONE_CLASSES: Record<Tone, string> = {
  base: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  raised: 'bg-surface-raised text-ink',
}

interface SectionProps {
  children: ReactNode
  tone?: Tone
  delay?: number
  /** false for heroes and sections that choreograph their own motion */
  reveal?: boolean
  /** extra classes on the inner max-width container */
  className?: string
  /** extra classes on the full-bleed outer band */
  outerClassName?: string
  /** drop the default vertical padding (for pinned/sticky sections) */
  flush?: boolean
  id?: string
  /** decorative layer (Starfield, Aurora) rendered behind the content */
  background?: ReactNode
}

/** Small mono label with a glowing gradient dot, used above headlines. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mono-label inline-flex items-center gap-2.5 text-cyan">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_2px_rgb(61_224_255/70%)]" />
      {children}
    </span>
  )
}

/** Full-bleed band with an inset max-width container. */
export function Section({
  children,
  tone = 'base',
  delay = 0,
  reveal = true,
  className,
  outerClassName,
  flush,
  id,
  background,
}: SectionProps) {
  const content = reveal ? (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  ) : (
    <div className={className}>{children}</div>
  )

  return (
    <section id={id} className={`relative ${flush ? '' : 'overflow-hidden'} ${TONE_CLASSES[tone]} ${outerClassName ?? ''}`}>
      {background}
      <div className={`relative z-10 mx-auto max-w-(--content-max) px-6 ${flush ? '' : 'py-24 md:py-32'}`}>{content}</div>
    </section>
  )
}

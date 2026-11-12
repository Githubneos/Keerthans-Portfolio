import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from './Reveal'

/** Museum-label caption with a hairline rule and a Roman plate number. */
export function Eyebrow({ children, numeral, className = 'text-muted', onDark = false }: { children: ReactNode; numeral?: string; className?: string; onDark?: boolean }) {
  return (
    <span className={`plaque inline-flex items-center gap-3 ${onDark ? 'text-white/85' : className}`}>
      <span aria-hidden="true" className={`h-1.5 w-10 rounded-full ${onDark ? 'stripes-gold' : 'stripes'}`} />
      {numeral && <span className={`font-display text-sm normal-case tracking-normal ${onDark ? 'text-gold' : 'text-burgundy'}`}>{numeral}</span>}
      {children}
    </span>
  )
}

interface SectionProps {
  id: string
  numeral: string
  label: string
  title: string
  children: ReactNode
}

/** One plate of the page: numbered label, serif heading, content. Sits on the live background. */
export function Section({ id, numeral, label, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The giant outline numeral drifts slower than the page, so it feels like it sits behind the content.
  const y = useTransform(scrollYProgress, [0, 1], [120, -160])

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-16 overflow-x-clip py-20 md:py-28">
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { y }}
        className="pointer-events-none absolute right-[-2%] top-10 select-none font-display text-[clamp(9rem,26vw,22rem)] leading-none text-transparent opacity-40 [-webkit-text-stroke:2px_var(--color-mist)]"
      >
        {numeral}
      </motion.span>
      <div className="relative mx-auto max-w-(--content-max) px-6">
        <Reveal>
          <Eyebrow numeral={numeral}>{label}</Eyebrow>
          <h2 id={`${id}-title`} className="mt-5 max-w-[20ch] text-5xl md:text-7xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}

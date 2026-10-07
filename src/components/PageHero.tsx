import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Aurora } from './motion/Aurora'
import { GridBackdrop } from './motion/GridBackdrop'
import { NeuralField } from './motion/NeuralField'
import { SplitText } from './motion/SplitText'
import { Eyebrow } from './Section'

interface PageHeroProps {
  eyebrow: string
  title: string
  /** words from this index onward use the gradient */
  gradientFrom?: number
  seed?: number
  children?: ReactNode
}

const PHASES = ['Raw signal', 'Structure', 'Intelligence']

/**
 * Pinned hero: as you scroll, a neural field gathers from scattered points into
 * a connected network while a HUD readout steps through the phases. Static
 * (fully connected, no pinning) under prefers-reduced-motion.
 */
export function PageHero({ eyebrow, title, gradientFrom, seed = 11, children }: PageHeroProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [phase, setPhase] = useState(0)
  const reading = useTransform(scrollYProgress, [0, 1], [0, 100])
  const [pct, setPct] = useState(0)
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setPhase(value < 0.34 ? 0 : value < 0.7 ? 1 : 2)
  })
  useMotionValueEvent(reading, 'change', (value) => setPct(Math.round(value)))

  const content = (
    <div className="relative z-10 mx-auto grid h-full w-full max-w-(--content-max) items-center gap-10 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_1fr]">
      <motion.div style={{ y: textY }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SplitText
          as="h1"
          immediate
          delay={0.8}
          text={title}
          gradientFrom={gradientFrom}
          className="mt-6 text-6xl font-bold leading-[1] md:text-8xl"
        />
        {children && <div className="mt-10">{children}</div>}
      </motion.div>
      <div className="relative">
        <NeuralField progress={reduced ? undefined : scrollYProgress} seed={seed} className="h-auto w-full" />
        <div className="mono-label mt-4 flex items-center justify-between text-faint" aria-hidden="true">
          <span className="text-cyan">
            {String(phase + 1).padStart(2, '0')} / {PHASES[reduced ? 2 : phase]}
          </span>
          <span>{reduced ? 100 : pct}%</span>
        </div>
        <div className="mt-2 h-px w-full bg-hairline" aria-hidden="true">
          <motion.div className="h-px origin-left bg-linear-to-r from-violet to-cyan" style={{ scaleX: reduced ? 1 : scrollYProgress }} />
        </div>
      </div>
    </div>
  )

  if (reduced) {
    return (
      <section className="relative min-h-dvh overflow-hidden bg-bg">
        <Aurora />
        <GridBackdrop />
        {content}
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[190vh] bg-bg">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <Aurora />
        <GridBackdrop />
        {content}
      </div>
    </section>
  )
}

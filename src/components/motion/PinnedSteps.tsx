import { useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export interface Step {
  title: string
  body: string
  visual: ReactNode
}

interface PinnedStepsProps {
  steps: Step[]
  heading?: ReactNode
}

/**
 * Sticky story: scrolling advances through steps; the active step expands on
 * the left and its visual swaps in on the right. Stacks statically under
 * prefers-reduced-motion.
 */
export function PinnedSteps({ steps, heading }: PinnedStepsProps) {
  const reduced = usePrefersReducedMotion()
  const outer = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)))
    setActive((current) => (current === next ? current : next))
  })

  if (reduced) {
    return (
      <div className="mx-auto max-w-(--content-max) px-6 py-24">
        {heading}
        <ol className="mt-10 grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="glass rounded-2xl p-6">
              <span className="mono-label text-cyan">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
              <div className="mt-6">{step.visual}</div>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div ref={outer} className="relative" style={{ height: `${steps.length * 95}vh` }}>
      <div className="sticky top-0 flex h-dvh items-center">
        <div className="mx-auto grid w-full max-w-(--content-max) items-center gap-10 px-6 pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            {heading}
            <div className="relative mt-8 pl-8">
              <div className="absolute bottom-1 left-0 top-1 w-px bg-hairline" aria-hidden="true">
                <motion.div className="h-full w-px origin-top bg-linear-to-b from-violet to-cyan" style={{ scaleY: fill }} />
              </div>
              <ol className="flex flex-col gap-5">
                {steps.map((step, index) => {
                  const isActive = index === active
                  return (
                    <li key={step.title} aria-current={isActive ? 'step' : undefined}>
                      <div className="flex items-baseline gap-3">
                        <span className={`mono-label transition-colors duration-300 ${isActive ? 'text-cyan' : 'text-faint'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className={`text-xl font-semibold transition-colors duration-300 md:text-2xl ${
                            isActive ? 'text-ink' : 'text-faint'
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <motion.p
                        className="overflow-hidden pl-9 text-sm leading-relaxed text-muted"
                        initial={false}
                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 8 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {step.body}
                      </motion.p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          <div className="relative hidden min-h-[22rem] lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 0.98, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-3xl p-8"
              >
                {steps[active].visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

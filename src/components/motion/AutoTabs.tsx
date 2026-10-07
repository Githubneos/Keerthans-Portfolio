import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export interface Tab {
  id: string
  label: string
  title: string
  visual: ReactNode
}

interface AutoTabsProps {
  tabs: Tab[]
  /** ms each tab stays active before advancing */
  interval?: number
}

/** Tab strip that auto-advances with a progress bar; pauses on hover/focus or after manual selection. */
export function AutoTabs({ tabs, interval = 6000 }: AutoTabsProps) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const auto = !paused && !reduced

  useEffect(() => {
    if (!auto) return
    const id = window.setTimeout(() => setActive((current) => (current + 1) % tabs.length), interval)
    return () => window.clearTimeout(id)
  }, [auto, active, interval, tabs.length])

  const tab = tabs[active]

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div role="tablist" aria-label="Capabilities" className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {tabs.map((item, index) => {
          const isActive = index === active
          return (
            <button
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActive(index)}
              className={`relative min-h-14 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors duration-300 ${
                isActive ? 'border-cyan/50 bg-white/6 text-ink' : 'border-hairline text-faint hover:text-ink'
              }`}
            >
              <span className="mono-label block">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-display text-lg font-semibold">{item.label}</span>
              {isActive && (
                <motion.span
                  key={`${active}-${auto}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-violet to-cyan"
                  initial={{ scaleX: reduced ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: auto ? interval / 1000 : 0.3, ease: 'linear' }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} className="glass relative mt-4 min-h-[22rem] overflow-hidden rounded-3xl p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]"
          >
            <h3 className="font-display text-4xl font-bold leading-tight md:text-5xl">{tab.title}</h3>
            <div>{tab.visual}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

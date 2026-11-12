import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const TEXT = 'const { python, fastapi, langchain, rag, react, pgvector, ...more } = skills;'

/** Colours the keywords in the typed line. */
function tint(text: string, onDark: boolean) {
  return text.split(/(\bconst\b|\bskills\b|\.\.\.more)/).map((part, i) => {
    if (part === 'const') return <span key={i} className={onDark ? 'text-gold' : 'text-burgundy'}>{part}</span>
    if (part === 'skills') return <span key={i} className={onDark ? 'text-gold' : 'text-gold-dark'}>{part}</span>
    if (part === '...more') return <span key={i} className={onDark ? 'text-white/60' : 'text-faint'}>{part}</span>
    return part
  })
}

/** A line of code that types itself out, then keeps a blinking caret. Complete at once under reduced motion. */
export function TypedLine({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const shown = reduced ? TEXT.length : count

  useEffect(() => {
    if (reduced) return
    let timer = 0
    const tick = () => {
      setCount((current) => {
        if (current >= TEXT.length) return current
        timer = window.setTimeout(tick, 34 + Math.random() * 40)
        return current + 1
      })
    }
    timer = window.setTimeout(tick, 1100)
    return () => window.clearTimeout(timer)
  }, [reduced])

  return (
    <p aria-label={TEXT} className={`font-mono text-sm md:text-base ${onDark ? 'text-white' : 'text-navy'} ${className ?? ''}`}>
      <span aria-hidden="true">
        {tint(TEXT.slice(0, shown), onDark)}
        <span className={`ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-[blink_1s_steps(1)_infinite] ${onDark ? 'bg-gold' : 'bg-burgundy'}`} />
      </span>
    </p>
  )
}

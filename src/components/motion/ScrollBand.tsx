import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const WORDS = ['AI engineer', 'Founder', 'Writer', 'San Diego', 'Builder', 'Skeptical optimist']

function Row({ reverse, outline }: { reverse?: boolean; outline?: boolean }) {
  const items = [...WORDS, ...WORDS]
  return (
    <>
      {items.map((word, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
          <span className={`font-display text-5xl md:text-7xl ${outline ? 'text-transparent [-webkit-text-stroke:1.5px_var(--color-gold)]' : 'text-white'}`}>{word}</span>
          <span aria-hidden="true" className={`text-3xl ${reverse ? 'text-burgundy' : 'text-gold'}`}>
            ✦
          </span>
        </span>
      ))}
    </>
  )
}

/** A tilted navy ribbon whose two lines slide in opposite directions as you scroll past. Decorative only. */
export function ScrollBand() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const right = useTransform(scrollYProgress, [0, 1], ['-35%', '0%'])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none relative z-10 -my-6 overflow-x-clip py-10">
      <div className="relative -rotate-2 scale-[1.04] bg-deep py-5 shadow-(--shadow-plate)">
        <div className="stripes-gold absolute inset-x-0 top-0 h-1.5" />
        <motion.div style={reduced ? undefined : { x: left }} className="flex w-max whitespace-nowrap">
          <Row />
        </motion.div>
        <motion.div style={reduced ? undefined : { x: right }} className="mt-2 flex w-max whitespace-nowrap">
          <Row reverse outline />
        </motion.div>
        <div className="stripes-gold absolute inset-x-0 bottom-0 h-1.5" />
      </div>
    </div>
  )
}

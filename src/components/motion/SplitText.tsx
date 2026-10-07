import { createElement, useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'div'

interface SplitTextProps {
  text: string
  as?: Tag
  className?: string
  delay?: number
  /** words from this index onward render with the animated gradient */
  gradientFrom?: number
  /** animate immediately instead of when scrolled into view (hero) */
  immediate?: boolean
}

/** Headline that rises word-by-word out of a mask. */
export function SplitText({ text, as = 'h2', className, delay = 0, gradientFrom, immediate }: SplitTextProps) {
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  const children = words.map((word, index) => {
    const wordClass = `inline-block ${gradientFrom !== undefined && index >= gradientFrom ? 'grad-text' : ''}`
    return (
      <span key={index} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        {reduced ? (
          <span className={wordClass}>{word}</span>
        ) : (
          <motion.span
            className={wordClass}
            initial={{ y: '115%', rotate: 4 }}
            {...(immediate ? { animate: { y: 0, rotate: 0 } } : { whileInView: { y: 0, rotate: 0 } })}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, delay: delay + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        )}
        {index < words.length - 1 ? ' ' : ''}
      </span>
    )
  })

  return createElement(as, { className, 'aria-label': text }, <span aria-hidden="true">{children}</span>)
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {' '}
    </motion.span>
  )
}

/** Paragraph whose words light up one by one, scrubbed by scroll position. */
export function ScrubText({ children, className }: { children: string; className?: string }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] })
  const words = children.split(' ')

  if (reduced) return <p className={className}>{children}</p>

  return (
    <p ref={ref} className={className} aria-label={children}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            progress={scrollYProgress}
            range={[index / words.length, Math.min(1, (index + 1.5) / words.length)]}
          />
        ))}
      </span>
    </p>
  )
}

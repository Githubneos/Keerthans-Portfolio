import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RevealTag = 'div' | 'section'
type From = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: RevealTag
  from?: From
  className?: string
}

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
} as const

const PLAIN_TAGS = {
  div: 'div',
  section: 'section',
} as const

const HIDDEN = {
  up: { opacity: 0, y: 40, filter: 'blur(10px)' },
  left: { opacity: 0, x: -60, filter: 'blur(10px)' },
  right: { opacity: 0, x: 60, filter: 'blur(10px)' },
  scale: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
} as const

/** Scroll-into-view entrance: slide/scale in with a blur that resolves. Once per element. */
export function Reveal({ children, delay = 0, as = 'div', from = 'up', className }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    const Tag = PLAIN_TAGS[as]
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = MOTION_TAGS[as]
  return (
    <MotionTag
      className={className}
      initial={HIDDEN[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

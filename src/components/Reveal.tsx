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

const MOTION_TAGS = { div: motion.div, section: motion.section } as const
const PLAIN_TAGS = { div: 'div', section: 'section' } as const

const HIDDEN = {
  up: { opacity: 0, y: 36 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  scale: { opacity: 0, scale: 0.94 },
} as const

/** Scroll-into-view entrance: a calm gallery-style rise. Once per element. */
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
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

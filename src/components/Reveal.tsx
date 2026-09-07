import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RevealTag = 'div' | 'section'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: RevealTag
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

/**
 * Wrap exactly once per page section -- fade-up + blur-resolve on scroll
 * into view, never stacked with other reveals in the same section.
 */
export function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    const Tag = PLAIN_TAGS[as]
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = MOTION_TAGS[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

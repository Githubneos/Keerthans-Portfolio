import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const MotionLink = motion.create(Link)

interface BaseProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-on-dark'
  className?: string
}

type MagneticButtonProps =
  | (BaseProps & { to: string; href?: never })
  | (BaseProps & { href: string; to?: never })

const VARIANT_CLASSES = {
  primary: 'bg-crimson text-ink-on-dark hover:bg-crimson-text',
  secondary: 'bg-transparent text-ink border border-hairline hover:border-crimson hover:text-crimson-text',
  'secondary-on-dark':
    'bg-transparent text-ink-on-dark border border-hairline-on-dark hover:border-olive hover:text-olive',
} as const

const BASE_CLASSES =
  'inline-flex items-center gap-2 rounded-sm px-6 py-3 font-display font-medium text-sm transition-colors duration-150'

/**
 * Magnetic hover pull toward the cursor via useMotionValue/useSpring
 * (never useState, to avoid a re-render on every mousemove). No-ops
 * under prefers-reduced-motion; the tap-press scale still applies since
 * it's a discrete interaction, not ambient motion.
 */
export function MagneticButton({ children, variant = 'primary', className, ...linkProps }: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.3)
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.3)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className ?? ''}`
  const externalProps = 'href' in linkProps && linkProps.href ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  if ('to' in linkProps && linkProps.to) {
    return (
      <MotionLink
        ref={ref}
        to={linkProps.to}
        className={classes}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.a
      ref={ref}
      href={'href' in linkProps ? linkProps.href : undefined}
      className={classes}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...externalProps}
    >
      {children}
    </motion.a>
  )
}

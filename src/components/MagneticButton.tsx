import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const MotionLink = motion.create(Link)

interface BaseProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

type MagneticButtonProps =
  | (BaseProps & { to: string; href?: never })
  | (BaseProps & { href: string; to?: never })

const VARIANT_CLASSES = {
  primary:
    'bg-linear-to-r from-violet to-cyan text-bg shadow-[0_0_30px_-4px_rgb(139_124_255/60%)] hover:shadow-[0_0_44px_0_rgb(61_224_255/55%)]',
  secondary: 'glass text-ink hover:border-cyan hover:text-cyan',
} as const

const BASE_CLASSES =
  'group inline-flex min-h-11 items-center gap-2.5 rounded-full px-7 py-3 font-display text-sm font-semibold transition-[box-shadow,color,border-color] duration-300'

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

/**
 * Pill button that is pulled toward the cursor (useMotionValue/useSpring, no
 * re-renders on mousemove). Magnetism no-ops under prefers-reduced-motion.
 */
export function MagneticButton({ children, variant = 'primary', className, ...linkProps }: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 })

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.35)
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35)
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
        whileTap={{ scale: 0.97 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <Arrow />
      </MotionLink>
    )
  }

  return (
    <motion.a
      ref={ref}
      href={'href' in linkProps ? linkProps.href : undefined}
      className={classes}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...externalProps}
    >
      {children}
      <Arrow />
    </motion.a>
  )
}

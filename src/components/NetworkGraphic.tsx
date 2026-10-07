import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface NetworkGraphicProps {
  className?: string
}

const NODES = [
  { x: 40, y: 60, r: 5, accent: 'violet' },
  { x: 140, y: 30, r: 7, accent: 'cyan' },
  { x: 210, y: 100, r: 4, accent: 'signal' },
  { x: 90, y: 160, r: 6, accent: 'cyan' },
  { x: 200, y: 190, r: 5, accent: 'violet' },
  { x: 260, y: 50, r: 4, accent: 'signal' },
  { x: 30, y: 220, r: 4, accent: 'violet' },
] as const

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [2, 5],
  [3, 6],
  [4, 2],
]

const DOT_FILL = {
  violet: '#8B7CFF',
  cyan: '#3DE0FF',
  signal: '#4ADE80',
} as const

/**
 * Decorative constellation: edges draw in on view, nodes pulse. Aria-hidden;
 * animation disabled under reduced motion.
 */
export function NetworkGraphic({ className }: NetworkGraphicProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <svg viewBox="0 0 280 240" className={className} aria-hidden="true">
      {EDGES.map(([a, b], index) => {
        const from = NODES[a]
        const to = NODES[b]
        return (
          <motion.line
            key={index}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="currentColor"
            strokeOpacity={0.3}
            strokeWidth={1.5}
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0 } : { duration: 1.1, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
          />
        )
      })}
      {NODES.map((node, index) => (
        <motion.circle
          key={index}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={DOT_FILL[node.accent]}
          style={{ filter: `drop-shadow(0 0 6px ${DOT_FILL[node.accent]})` }}
          animate={reduced ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.2, 1] }}
          transition={
            reduced ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }
          }
        />
      ))}
    </svg>
  )
}

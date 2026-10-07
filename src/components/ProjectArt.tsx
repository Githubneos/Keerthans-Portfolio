import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export type ArtKind = 'chain' | 'ride' | 'match' | 'drift' | 'eval'

const COLORS = ['#8b7cff', '#3de0ff', '#4ade80']

/** Animated SVG cover illustration for a project card. Decorative. */
export function ProjectArt({ kind }: { kind: ArtKind }) {
  const reduced = usePrefersReducedMotion()
  const pulse = (delay: number) =>
    reduced
      ? {}
      : { animate: { opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }, transition: { duration: 3, repeat: Infinity, delay } }

  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="160" fill="#0b0f1a" />
      <circle cx="260" cy="20" r="90" fill={COLORS[0]} opacity="0.12" />
      <circle cx="40" cy="150" r="80" fill={COLORS[1]} opacity="0.1" />

      {kind === 'chain' && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={30 + i * 70}
              y={55}
              width="50"
              height="50"
              rx="10"
              fill="none"
              stroke={COLORS[i % 3]}
              strokeWidth="2"
              {...pulse(i * 0.4)}
              style={{ transformOrigin: `${55 + i * 70}px 80px` }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${80 + i * 70} 80 H${100 + i * 70}`} stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 4" />
          ))}
        </g>
      )}

      {kind === 'ride' && (
        <g>
          <path d="M20 120 C 90 20, 150 140, 300 40" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="5 6" />
          <motion.path
            d="M20 120 C 90 20, 150 140, 300 40"
            fill="none"
            stroke="url(#ride)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="ride">
              <stop offset="0" stopColor={COLORS[0]} />
              <stop offset="1" stopColor={COLORS[1]} />
            </linearGradient>
          </defs>
          <circle cx="20" cy="120" r="7" fill={COLORS[0]} />
          <motion.circle cx="300" cy="40" r="7" fill={COLORS[2]} {...pulse(0)} style={{ transformOrigin: '300px 40px' }} />
        </g>
      )}

      {kind === 'match' && (
        <g fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="2">
          <rect x="40" y="25" width="240" height="110" rx="6" />
          <path d="M160 25 V135" />
          <circle cx="160" cy="80" r="22" />
          <rect x="40" y="55" width="30" height="50" />
          <rect x="250" y="55" width="30" height="50" />
          {[[90, 60], [110, 105], [210, 55], [230, 100], [160, 80]].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r="6" fill={COLORS[i % 3]} stroke="none" {...pulse(i * 0.3)} style={{ transformOrigin: `${x}px ${y}px` }} />
          ))}
        </g>
      )}

      {kind === 'eval' && (
        <g>
          {[22, 48, 30, 70, 54, 92, 66].map((h, i) => (
            <motion.rect
              key={i}
              x={34 + i * 24}
              width="14"
              rx="3"
              fill={COLORS[i % 3]}
              fillOpacity="0.85"
              initial={reduced ? { y: 128 - h * 1.2, height: h * 1.2 } : { y: 128, height: 0 }}
              whileInView={{ y: 128 - h * 1.2, height: h * 1.2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
            />
          ))}
          <path d="M20 128 H210" stroke="white" strokeOpacity="0.25" />
          <circle cx="262" cy="70" r="34" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="8" />
          <motion.circle
            cx="262"
            cy="70"
            r="34"
            fill="none"
            stroke={COLORS[2]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="150 214"
            transform="rotate(-90 262 70)"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          />
        </g>
      )}

      {kind === 'drift' && (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M-10 ${130 - i * 14} C 100 ${130 - i * 14}, 140 ${40 + i * 10}, 330 ${50 + i * 8}`}
              fill="none"
              stroke={COLORS[i]}
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity={0.9 - i * 0.2}
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.25 }}
            />
          ))}
          <path d="M255 60 a13 13 0 1 1 26 0 c0 14 -13 26 -13 26 s-13 -12 -13 -26z" fill="white" fillOpacity="0.9" />
          <circle cx="268" cy="60" r="5" fill="#0b0f1a" />
        </g>
      )}
    </svg>
  )
}

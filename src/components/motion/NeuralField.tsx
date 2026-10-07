import { useEffect, useMemo, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface NeuralFieldProps {
  /** 0 = scattered data, 0.5 = clustered, 1 = connected network. Omit to self-play once on mount. */
  progress?: MotionValue<number>
  seed?: number
  className?: string
}

const COLORS = ['#8b7cff', '#3de0ff', '#4ade80']
const COLS = 4
const ROWS = 6

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function buildLayouts(seed: number) {
  const rand = rng(seed)
  const scatter: [number, number][] = []
  const cluster: [number, number][] = []
  const network: [number, number][] = []
  const centers: [number, number][] = [
    [110, 95],
    [290, 110],
    [195, 220],
  ]
  for (let i = 0; i < COLS * ROWS; i++) {
    scatter.push([20 + rand() * 360, 20 + rand() * 260])
    const c = centers[i % 3]
    const angle = rand() * Math.PI * 2
    const radius = 10 + rand() * 48
    cluster.push([c[0] + Math.cos(angle) * radius, c[1] + Math.sin(angle) * radius])
    const col = Math.floor(i / ROWS)
    const row = i % ROWS
    network.push([55 + col * 96 + (rand() - 0.5) * 12, 35 + row * 46 + (rand() - 0.5) * 12])
  }
  const edges: [number, number][] = []
  for (let col = 0; col < COLS - 1; col++) {
    for (let row = 0; row < ROWS; row++) {
      const from = col * ROWS + row
      edges.push([from, (col + 1) * ROWS + row])
      edges.push([from, (col + 1) * ROWS + ((row + 1) % ROWS)])
    }
  }
  return { scatter, cluster, network, edges }
}

const ease = (t: number) => t * t * (3 - 2 * t)
const mix = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Scroll-morphing neural network: scattered points gather into clusters, then
 * wire up into a layered network. Decorative (aria-hidden).
 */
export function NeuralField({ progress, seed = 11, className }: NeuralFieldProps) {
  const reduced = usePrefersReducedMotion()
  const layouts = useMemo(() => buildLayouts(seed), [seed])
  const own = useMotionValue(reduced ? 1 : 0)
  const source = progress ?? own
  const [t, setT] = useState(() => source.get())

  useEffect(() => {
    if (progress || reduced) return
    const controls = animate(own, 1, { duration: 5, delay: 0.6, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [progress, reduced, own])

  useMotionValueEvent(source, 'change', (value) => setT(Math.min(1, Math.max(0, value))))

  const first = t < 0.5
  const k = ease(first ? t * 2 : (t - 0.5) * 2)
  const from = first ? layouts.scatter : layouts.cluster
  const to = first ? layouts.cluster : layouts.network
  const points = from.map(([x, y], i) => [mix(x, to[i][0], k), mix(y, to[i][1], k)] as const)
  const edgeOpacity = ease(Math.min(1, Math.max(0, (t - 0.45) / 0.45))) * 0.55

  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      {layouts.edges.map(([a, b], index) => (
        <line
          key={index}
          x1={points[a][0]}
          y1={points[a][1]}
          x2={points[b][0]}
          y2={points[b][1]}
          stroke={COLORS[index % 3]}
          strokeOpacity={edgeOpacity}
          strokeWidth="1"
          strokeDasharray="3 5"
          className={reduced ? '' : 'animate-dash'}
        />
      ))}
      {points.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={2.5 + (index % 3)}
          fill={COLORS[index % 3]}
          style={{ filter: `drop-shadow(0 0 5px ${COLORS[index % 3]})` }}
        />
      ))}
    </svg>
  )
}

import { Canvas } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Scene } from './Scene'

/**
 * Lazy-loaded WebGL canvas (default export so it can be React.lazy'd, which
 * keeps three.js out of the first paint). Pauses rendering offscreen.
 */
export default function SceneCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.05 })

  return (
    <div ref={ref} className={className}>
      <Canvas dpr={[1, 1.75]} frameloop={visible ? 'always' : 'never'} camera={{ position: [0, 0, 7.4], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} aria-hidden="true">
        <Scene />
      </Canvas>
    </div>
  )
}

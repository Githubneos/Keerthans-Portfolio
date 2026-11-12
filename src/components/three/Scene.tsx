import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, PMREMGenerator, type Group } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const GARNET = '#0a4aa8' // knot lacquer (blue, so it reads against the burgundy flood)
const MIST = '#b9c7de'
const GOLD = '#edbb00'
const WHITE = '#ffffff'
const RINGS = [GOLD, WHITE, GOLD]

/** Local studio lighting: reflections without fetching an HDR from a CDN. */
function Studio() {
  const get = useThree((s) => s.get)
  useEffect(() => {
    const { gl, scene } = get()
    const pmrem = new PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [get])
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff4e6" />
      <directionalLight position={[-5, -2, -4]} intensity={0.9} color="#7aa7ff" />
    </>
  )
}

/** Deterministic pseudo-random so the scene is stable between renders. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function Dust({ count = 60 }: { count?: number }) {
  const ref = useRef<Group>(null)
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        p: [(rand(i + 1) - 0.5) * 9, (rand(i + 50) - 0.5) * 6, (rand(i + 99) - 0.5) * 6 - 1] as [number, number, number],
        s: 0.012 + rand(i + 7) * 0.03,
      })),
    [count],
  )
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02
  })
  return (
    <group ref={ref}>
      {dots.map((d, i) => (
        <mesh key={i} position={d.p}>
          <sphereGeometry args={[d.s, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? GOLD : i % 3 === 0 ? WHITE : MIST} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/** The hero sculpture: a lacquered torus knot ringed in blue. It spins and leans toward the cursor. */
export function Scene() {
  const group = useRef<Group>(null)
  const pointer = useThree((s) => s.pointer)

  const lastY = useRef(0)

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    // Scrolling spins the knot: faster scroll, faster spin, and it eases back to a slow idle.
    const y = window.scrollY
    const delta = MathUtils.clamp(y - lastY.current, -80, 80)
    lastY.current = y
    g.rotation.y += dt * 0.28 + delta * 0.012
    g.rotation.z = MathUtils.damp(g.rotation.z, delta * 0.01, 4, dt)
    g.rotation.x = MathUtils.damp(g.rotation.x, -pointer.y * 0.4 + 0.15, 3, dt)
    g.position.x = MathUtils.damp(g.position.x, pointer.x * 0.3, 3, dt)
  })

  return (
    <>
      <Studio />
      <group ref={group}>
        <mesh>
          <torusKnotGeometry args={[0.95, 0.3, 220, 32, 2, 3]} />
          <meshPhysicalMaterial color={GARNET} roughness={0.2} metalness={0.15} clearcoat={1} clearcoatRoughness={0.08} />
        </mesh>
        {RINGS.map((color, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.5, i * 0.7, 0]} scale={1 + i * 0.15}>
            <torusGeometry args={[1.65, 0.012, 8, 160]} />
            <meshBasicMaterial color={color} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
      <Dust />
    </>
  )
}

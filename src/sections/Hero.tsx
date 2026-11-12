import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { BASE_CLASSES, VARIANT_CLASSES } from '../components/MagneticButton'
import { SplitText } from '../components/motion/SplitText'
import { Eyebrow } from '../components/Section'
import { TypedLine } from '../components/TypedLine'
import { useContact } from '../components/ContactDialog'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// three.js loads in its own chunk so the first paint stays fast.
const SceneCanvas = lazy(() => import('../components/three/SceneCanvas'))

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Static stand-in for reduced motion, no WebGL, or while three.js loads. */
function Orb() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <div className="animate-float h-[60%] w-[60%] max-w-72 rounded-full" style={{ background: 'radial-gradient(circle at 32% 28%, #4d8fe0 0%, #004d98 45%, #061434 100%)', boxShadow: '0 40px 60px -30px rgb(0 0 0 / 55%)' }} />
    </div>
  )
}

/** The opening colour flood: burgundy sweeps up from the bottom edge, then breathes for as long as you stay on the hero. */
function Flood({ reduced }: { reduced: boolean }) {
  const pulse = (duration: number, delay = 0) => (reduced ? undefined : { duration, delay, repeat: Infinity, ease: 'easeInOut' as const })
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-burgundy"
        initial={reduced ? false : { clipPath: 'circle(0% at 50% 100%)' }}
        animate={{ clipPath: 'circle(150% at 50% 100%)' }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 70% at 20% 25%, #e0386f 0%, transparent 70%)' }}
          animate={reduced ? undefined : { opacity: [0.35, 0.95, 0.35], scale: [1, 1.18, 1] }}
          transition={pulse(4.8)}
        />
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(50% 60% at 85% 80%, #004d98 0%, transparent 70%)' }}
          animate={reduced ? undefined : { opacity: [0.9, 0.35, 0.9], scale: [1.12, 1, 1.12] }}
          transition={pulse(4.8)}
        />
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(35% 40% at 70% 20%, rgb(237 187 0 / 55%) 0%, transparent 70%)' }}
          animate={reduced ? undefined : { opacity: [0, 0.8, 0] }}
          transition={pulse(4.8, 1.2)}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>
    </div>
  )
}

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const { open } = useContact()
  const [webgl] = useState(hasWebGL)
  return (
    <section id="top" className="relative flex min-h-dvh items-center pb-16 pt-24 text-white">
      <Flood reduced={reduced} />
      <div className="relative z-10 mx-auto grid w-full max-w-(--content-max) items-center gap-4 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <Eyebrow numeral="I" onDark>San Diego, CA</Eyebrow>
          <SplitText as="h1" immediate delay={0.4} text="Keerthan Karumudi" accentFrom={1} accentClass="text-gold" className="mt-6 text-6xl leading-[1] sm:text-7xl lg:text-8xl" />
          <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="plaque mt-6 text-white/80">
            AI engineer · Founder · Writer
          </motion.p>
          <TypedLine onDark className="mt-8" />
          <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className={`${BASE_CLASSES} ${VARIANT_CLASSES.light}`}>
                See my projects
              </a>
              <button type="button" onClick={open} className={`${BASE_CLASSES} border border-white/50 text-white hover:bg-white/10`}>
                Contact me
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[22rem] sm:h-[28rem] lg:h-[36rem]">
          {webgl && !reduced ? (
            <Suspense fallback={<Orb />}>
              <SceneCanvas className="h-full w-full" />
            </Suspense>
          ) : (
            <Orb />
          )}
        </div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white md:flex">
        <span className="plaque">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/30">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-gold" />
        </span>
      </a>
    </section>
  )
}

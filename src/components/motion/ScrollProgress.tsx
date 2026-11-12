import { motion, useScroll, useSpring } from 'framer-motion'

/** Hairline blue bar at the top of the viewport that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.4 })

  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-1 origin-left stripes" style={{ scaleX }} />
}

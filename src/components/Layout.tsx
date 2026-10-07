import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Footer } from './Footer'
import { Nav } from './Nav'
import { CursorGlow } from './motion/CursorGlow'
import { ScrollProgress } from './motion/ScrollProgress'

export function Layout() {
  const reduced = usePrefersReducedMotion()
  const outlet = useOutlet()
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollProgress />
      <CursorGlow />
      <Nav />

      {reduced ? (
        <main className="flex-1">{outlet}</main>
      ) : (
        <>
          {/* route curtain: grows over the old page, then lifts off the new one */}
          <motion.div
            key={`curtain-${pathname}`}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[65] bg-linear-to-br from-violet via-cyan to-signal"
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: [0, 1, 1, 0], originY: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, times: [0, 0.28, 0.32, 1], ease: [0.76, 0, 0.24, 1] }}
          />
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.main
              key={pathname}
              className="flex-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {outlet}
            </motion.main>
          </AnimatePresence>
        </>
      )}

      <Footer />
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { ContactProvider } from './ContactDialog'
import { FluidBackground } from './FluidBackground'
import { Footer } from './Footer'
import { Nav } from './Nav'
import { ScrollProgress } from './motion/ScrollProgress'
import { SmoothScroll } from './motion/SmoothScroll'

export function Layout() {
  return (
    <ContactProvider>
      <SmoothScroll />
      <FluidBackground />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </ContactProvider>
  )
}

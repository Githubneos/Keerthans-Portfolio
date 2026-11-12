import { ScrollBand } from '../components/motion/ScrollBand'
import { About } from '../sections/About'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import { Writing } from '../sections/Writing'

/** The whole site is one scrolling page: Hero, About, Experience, Projects, Skills, Writing. */
export function Home() {
  return (
    <>
      <Hero />
      <ScrollBand />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Writing />
    </>
  )
}

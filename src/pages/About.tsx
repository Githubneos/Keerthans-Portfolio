import { motion } from 'framer-motion'
import { MagneticButton } from '../components/MagneticButton'
import { PageHero } from '../components/PageHero'
import { Eyebrow, Section } from '../components/Section'
import { TiltPhoto } from '../components/TiltPhoto'
import { Aurora } from '../components/motion/Aurora'
import { GridBackdrop } from '../components/motion/GridBackdrop'
import { ScrubText } from '../components/motion/SplitText'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import keerthanPhoto from '../assets/keerthan-about.jpg'
import keerthanPhoto2 from '../assets/keerthan-about-2.jpg'

const FACTS = [
  { icon: 'M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', term: 'Based in', detail: 'San Diego, CA' },
  { icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5', term: 'Focus', detail: 'Applied AI & full-stack' },
  { icon: 'M3 17l6-6 4 4 8-9M15 6h6v6', term: 'Building', detail: 'FolioTrend' },
  { icon: 'M4 20h4l11-11-4-4L4 16v4zM13 7l4 4', term: 'Writing', detail: 'Skeptical Optimist' },
  { icon: 'M5 12h14M13 6l6 6-6 6', term: 'Open to', detail: 'Roles & collabs' },
]

const HOBBIES = ['Pickleball', 'Soccer', 'Cars', 'Cards']

export function About() {
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <PageHero eyebrow="About" title="Hi, I'm Keerthan." gradientFrom={2} seed={31} />

      <Section tone="base" reveal={false} background={<Aurora className="opacity-60" />}>
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>The short version</Eyebrow>
            <ScrubText className="mt-8 max-w-[26ch] font-display text-3xl font-semibold leading-snug md:text-5xl">
              I build intelligent systems from data to product, and bet cautiously on the future.
            </ScrubText>
            <div className="mt-10">
              <MagneticButton to="/work">See the work</MagneticButton>
            </div>
          </div>
          <div className="mx-auto max-w-sm pl-4">
            <TiltPhoto src={keerthanPhoto} alt="Keerthan Karumudi standing outdoors in front of the Washington Monument" accent="violet" rotate={-3} parallax={20} />
            <TiltPhoto
              src={keerthanPhoto2}
              alt="Keerthan Karumudi standing on a balcony overlooking the ocean in San Diego"
              accent="cyan"
              rotate={3}
              floatDelay={0.6}
              parallax={50}
              className="-ml-16 -mt-20 w-[80%]"
            />
          </div>
        </div>
      </Section>

      <Section tone="surface" outerClassName="border-y border-hairline" reveal={false}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {FACTS.map((fact, index) => (
            <motion.div
              key={fact.term}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={reduced ? undefined : { y: -6 }}
              className="glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={fact.icon} />
              </svg>
              <dl>
                <dt className="mono-label text-faint">{fact.term}</dt>
                <dd className="mt-1 font-medium text-ink">{fact.detail}</dd>
              </dl>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="base" reveal={false}>
        <Eyebrow>Off the clock</Eyebrow>
        <div className="mt-8 flex flex-wrap gap-4">
          {HOBBIES.map((hobby, index) => (
            <Reveal key={hobby} delay={index * 0.08} from="scale">
              <span className="glass inline-block rounded-full px-8 py-4 font-display text-2xl font-semibold md:text-4xl">{hobby}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" outerClassName="border-t border-hairline" reveal={false} background={<GridBackdrop />}>
        <Reveal from="scale">
          <blockquote className="mx-auto max-w-[24ch] py-10 text-center font-serif-italic text-4xl italic leading-snug md:text-6xl">
            <span aria-hidden="true" className="mx-auto mb-8 block h-0.5 w-14 bg-linear-to-r from-violet to-cyan" />
            "You have power over your mind, not outside events."
            <footer className="mono-label mt-8 not-italic text-faint">Marcus Aurelius</footer>
          </blockquote>
        </Reveal>
      </Section>
    </>
  )
}

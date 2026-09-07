import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { MagneticButton } from '../components/MagneticButton'
import { NetworkGraphic } from '../components/NetworkGraphic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import zoologistPerfumes from '../assets/zoologist-perfumes.jpg'
import imaginaryAuthors from '../assets/imaginary-authors.jpg'

const SERVICES = [
  {
    title: 'SaaS development',
    description:
      'End-to-end SaaS builds, from the first wireframe to a product real users pay for: product design, full-stack development, authentication and billing, and the data pipelines and APIs running underneath it. I work across the whole stack so the product ships as one coherent system, not a pile of disconnected parts.',
  },
  {
    title: 'Website building',
    description:
      'Marketing sites, portfolios, and small-business websites, designed and built from scratch and deployed fast. I focus on clean, fast-loading pages and a structure that stays easy for you to update long after the initial build.',
  },
]

const RECENT_WORK = [
  {
    name: 'Zoologist Perfumes',
    href: 'https://www.zoologistperfumes.com/',
    image: zoologistPerfumes,
  },
  {
    name: 'Imaginary Authors',
    href: 'https://imaginaryauthors.com/',
    image: imaginaryAuthors,
  },
]

function WorkCard({ name, href, image }: { name: string; href: string; image: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4 rounded-sm border border-hairline bg-surface p-6"
      whileHover={reduced ? undefined : { y: -6, scale: 1.015, borderColor: '#CA2E55' }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="aspect-video overflow-hidden rounded-sm border border-hairline">
        <img src={image} alt={`${name} homepage screenshot`} className="h-full w-full object-cover object-top" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-ink">{name}</h3>
        <span className="text-sm font-medium text-crimson-text">Visit site →</span>
      </div>
    </motion.a>
  )
}

export function Freelance() {
  return (
    <>
      <Section tone="cream" reveal={false}>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="inline-block rounded-sm bg-crimson px-2 py-0.5 text-xs font-medium text-ink-on-dark">
              Freelance
            </span>
            <h1 className="mt-4 max-w-[22ch] text-3xl font-semibold text-ink md:text-5xl">
              SaaS products and websites, built end-to-end.
            </h1>
            <p className="mt-4 max-w-[60ch] text-muted">
              I build websites and small SaaS products for solo founders and small teams, the kind of
              self-funded, founder-led operations that care as much about craft as they do about function.
              I'm drawn to niche, well-made brands: a one-person perfume house, a two-person type foundry, a
              hobby that turned into a storefront. If that sounds like you, I'd love to help you build
              something that matches the quality of what you're already making.
            </p>
          </div>
          <NetworkGraphic className="hidden h-auto w-full max-w-[220px] text-ink md:block" />
        </div>
      </Section>

      <Section tone="surface">
        <h2 className="text-2xl font-semibold text-ink">What I offer</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-sm border border-hairline bg-bg p-6">
              <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="text-2xl font-semibold text-ink">Most recent work</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {RECENT_WORK.map((site) => (
            <WorkCard key={site.name} name={site.name} href={site.href} image={site.image} />
          ))}
        </div>
      </Section>

      <Section tone="crimson">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-[24ch] text-2xl font-semibold">Have a project in mind? Let's talk.</h2>
          <MagneticButton to="/contact" variant="secondary-on-dark">
            Get in touch
          </MagneticButton>
        </div>
      </Section>
    </>
  )
}

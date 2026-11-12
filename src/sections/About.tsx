import { useContact } from '../components/ContactDialog'
import { BASE_CLASSES, VARIANT_CLASSES } from '../components/MagneticButton'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltPhoto } from '../components/TiltPhoto'
import oceanBalcony from '../assets/ocean-balcony.jpg'
import dcDusk from '../assets/dc-dusk.jpg'
import dinosaurHall from '../assets/dinosaur-hall.jpg'

export function About() {
  const { open } = useContact()

  return (
    <Section id="about" numeral="II" label="About" title="Who I am.">
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-20">
        <div>
          <p className="max-w-[26ch] font-display text-3xl leading-snug text-navy md:text-5xl">
            I build AI systems and data-driven apps, from the pipeline to the product.
          </p>
          <p className="mt-7 max-w-[46ch] text-lg text-muted">
            I founded FolioTrend and work across machine learning, agents and full-stack web. Based in San Diego, open to roles and collaborations.
          </p>
          <button type="button" onClick={open} className={`${BASE_CLASSES} ${VARIANT_CLASSES.primary} mt-9`}>
            Say hello
          </button>
        </div>
        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <TiltPhoto src={oceanBalcony} alt="Keerthan Karumudi in sunglasses and a white shirt, leaning on a railing above the Pacific with two palm trees behind" rotate={-1.5} parallax={24} />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-5 md:ml-auto md:w-3/5">
        <Reveal>
          <TiltPhoto src={dcDusk} alt="Keerthan Karumudi standing in an empty Washington, D.C. street at dusk, with a lit church on the right" parallax={10} />
        </Reveal>
        <Reveal delay={0.1}>
          <TiltPhoto src={dinosaurHall} alt="Keerthan Karumudi in a baseball cap in front of mounted dinosaur skeletons in a museum hall" floatDelay={0.6} parallax={10} />
        </Reveal>
      </div>
    </Section>
  )
}

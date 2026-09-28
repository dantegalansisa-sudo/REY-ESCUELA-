import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Camera, ChevronLeft, ChevronRight, HeartHandshake, Quote, Sparkles, UserRound } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Magnetic, Reveal, RevealItem } from '../motion'
import { CEO, SCHOOL_PHOTOS } from '../../data/about'
import { SITE } from '../../data/site'
import './About.css'

const VALUES = [
  { label: ['Negocio', 'familiar'], Icon: HeartHandshake },
  { label: ['Clases', 'privadas'], Icon: UserRound },
  { label: ['Atención', 'personalizada'], Icon: Sparkles },
]

function SchoolGallery() {
  const [i, setI] = useState(0)
  const many = SCHOOL_PHOTOS.length > 1
  const go = (d: number) => setI((p) => (p + d + SCHOOL_PHOTOS.length) % SCHOOL_PHOTOS.length)
  const photo = SCHOOL_PHOTOS[i]

  return (
    <div className="agallery">
      <div className="agallery__main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        {many && (
          <>
            <span className="agallery__count">
              {i + 1} / {SCHOOL_PHOTOS.length}
            </span>
            <button className="agallery__arrow agallery__arrow--prev" onClick={() => go(-1)} aria-label="Foto anterior">
              <ChevronLeft size={20} />
            </button>
            <button className="agallery__arrow agallery__arrow--next" onClick={() => go(1)} aria-label="Siguiente foto">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      {many && (
        <div className="agallery__thumbs">
          {SCHOOL_PHOTOS.map((p, n) => (
            <button key={p.src} className={n === i ? 'is-active' : ''} onClick={() => setI(n)} aria-label={`Ver foto ${n + 1}`}>
              <img src={p.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function About() {
  return (
    <section className="section about" id="nosotros">
      <div className="container about__inner">
        <div className="about__copy">
          <SectionHead
            eyebrow="Sobre nosotros"
            title={['Una escuela que', <>nació <span className="about__accent">en familia.</span></>]}
          />
          <Reveal delay={0.15} className="about__text">
            <p>
              REY Escuela de Chofer nació en el núcleo familiar, con una idea sencilla: enseñar a manejar a nuestra gente
              de Baní con paciencia, respeto y responsabilidad.
            </p>
            <p>
              Hoy, bajo la dirección de <strong>{CEO.name}</strong>, banilejo de corazón, seguimos ese legado con clases
              privadas, simulador y práctica real para que salgas a la carretera con confianza.
            </p>
          </Reveal>

          <Reveal stagger={0.1} as="ul" className="about__values">
            {VALUES.map(({ label, Icon }) => (
              <RevealItem as="li" key={label.join()}>
                <span className="about__vicon">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span>
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="about__quote">
            <Quote className="about__qmark" size={30} fill="currentColor" strokeWidth={0} />
            <p>
              Aprender a manejar es ganar libertad. Nuestro compromiso es que cada estudiante salga preparado, seguro y
              orgulloso de lo que logró.
            </p>
            <footer>
              <strong>{CEO.name}</strong>
              <small>Director</small>
            </footer>
          </Reveal>

          <Reveal delay={0.25}>
            <Magnetic href={SITE.mapsDirections} className="btn btn--gold btn--sm">
              Visítanos en Baní <ArrowRight size={16} strokeWidth={2.4} />
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="about__ceo">
          <div className="about__ceo-photo">
            <img src={CEO.photo} alt={`${CEO.name}, director de REY Escuela de Chofer`} loading="lazy" width={800} height={1000} />
          </div>
          <p className="about__ceo-script script" aria-hidden="true">
            Tu licencia,
            <br />
            nuestro compromiso.
          </p>
          <div className="about__ceo-card">
            <strong>{CEO.name}</strong>
            <small>{CEO.role}</small>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="about__school">
          <span className="eyebrow about__school-label">
            <Camera size={15} strokeWidth={2.2} /> Nuestra escuela
          </span>
          <p className="about__school-text">Así te recibimos en Calle Duvergé #41 Norte, Baní.</p>
          <SchoolGallery />
          <p className="about__school-script script">Formando conductores responsables.</p>
        </Reveal>
      </div>
    </section>
  )
}

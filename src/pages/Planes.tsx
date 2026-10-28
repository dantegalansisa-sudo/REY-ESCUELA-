import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Banknote, Check, ChevronRight, Clock, Crown, MapPin, Minus } from 'lucide-react'
import { Magnetic, Reveal, RevealItem, RevealText } from '../components/motion'
import SectionHead from '../components/SectionHead'
import { Accordion } from '../components/sections/Faq'
import { WhatsAppIcon } from '../components/icons'
import { PLANS, planWaLink } from '../data/plans'
import { FAQS } from '../data/faqs'
import { SITE, waLink } from '../data/site'
import './Planes.css'

const MINI_FAQ = [FAQS[0], FAQS[2], FAQS[3]]

export default function Planes() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Planes y precios de clases de manejo en Baní | REY Escuela de Chofer'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <>
      <section className="phero">
        <motion.div
          className="phero__bg"
          aria-hidden="true"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/images/planes-banner.webp" alt="" />
        </motion.div>
        <div className="phero__veil" aria-hidden="true" />
        <div className="container phero__inner">
          <Reveal onMount>
            <nav className="phero__crumbs" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <ChevronRight size={14} />
              <span aria-current="page">Planes</span>
            </nav>
          </Reveal>
          <Reveal onMount delay={0.1}>
            <span className="eyebrow phero__eyebrow">Planes y precios</span>
          </Reveal>
          <RevealText
            as="h1"
            onMount
            delay={0.2}
            className="phero__title"
            lines={['¡Aprende a conducir', <span className="phero__accent">desde cero!</span>]}
          />
          <Reveal onMount delay={0.5}>
            <p className="phero__lead">
              Elige el plan que mejor se adapte a ti. Todos incluyen clases privadas de 35 minutos, simulador y práctica
              real en ruta y parqueo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <Reveal onMount delay={0.45} stagger={0.12} className="pricing__grid">
            {PLANS.map((p) => (
              <RevealItem as="article" className={`pcard ${p.featured ? 'pcard--featured' : ''}`} key={p.id}>
                {p.featured && (
                  <span className="pcard__ribbon">
                    <Crown size={14} /> Más completo
                  </span>
                )}
                <header className="pcard__head">
                  <h2>{p.name}</h2>
                  <p>{p.tagline}</p>
                  <div className="pcard__price">
                    <span className="pcard__cur">RD$</span>
                    <strong>{p.price.replace('RD$', '')}</strong>
                  </div>
                </header>
                <ul className="pcard__list">
                  {p.features.map((f) => (
                    <li key={f.label} className={f.included ? '' : 'is-off'}>
                      <span className="pcard__mark">
                        {f.included ? <Check size={14} strokeWidth={3} /> : <Minus size={14} strokeWidth={2.5} />}
                      </span>
                      <span>
                        {f.included ? '' : <span className="sr-only">No incluye: </span>}
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <Magnetic href={planWaLink(p)} className={`btn ${p.featured ? 'btn--gold' : 'btn--outline'} pcard__cta`} strength={0.2}>
                  Inscribirme <ArrowRight size={18} strokeWidth={2.4} />
                </Magnetic>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal stagger={0.1} className="pinfo">
            <RevealItem className="pinfo__item">
              <span className="pinfo__icon">
                <Banknote size={22} />
              </span>
              <div>
                <strong>Aceptamos pagos en efectivo y transferencia</strong>
                <small>Consulta las opciones al inscribirte.</small>
              </div>
            </RevealItem>
            <RevealItem className="pinfo__item">
              <span className="pinfo__icon">
                <MapPin size={22} />
              </span>
              <div>
                <strong>{SITE.addressShort}</strong>
                <small>
                  República Dominicana ·{' '}
                  <a href={SITE.mapsDirections} target="_blank" rel="noopener noreferrer">
                    Cómo llegar
                  </a>
                </small>
              </div>
            </RevealItem>
            <RevealItem className="pinfo__item">
              <span className="pinfo__icon">
                <Clock size={22} />
              </span>
              <div>
                <strong>{SITE.hours[0]}</strong>
                <small>
                  {SITE.hours[1]} · {SITE.hours[2]}
                </small>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="section pfaq">
        <div className="container pfaq__inner">
          <SectionHead eyebrow="Antes de inscribirte" title={['Preguntas', 'frecuentes']} swoosh />
          <Accordion items={MINI_FAQ} />
        </div>
      </section>

      <section className="pcta">
        <div className="container">
          <Reveal className="pcta__box">
            <div>
              <h2>¿No sabes qué plan elegir?</h2>
              <p>Escríbenos y te ayudamos a escoger el plan ideal para ti.</p>
            </div>
            <Magnetic href={waLink('Hola, necesito ayuda para elegir un plan.')} className="btn btn--gold">
              <WhatsAppIcon size={20} /> Escríbenos por WhatsApp
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  )
}

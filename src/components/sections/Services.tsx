import { ArrowRight, GraduationCap, IdCard, MapPin, MonitorPlay } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Magnetic, Reveal, RevealItem } from '../motion'
import { waLink } from '../../data/site'
import './Services.css'

const SERVICES = [
  {
    title: 'Clases de simulador',
    text: 'Practica en un entorno seguro y controlado antes de salir a la carretera. Sesiones de 35 minutos.',
    img: '/images/servicio-simulador.webp',
    Icon: MonitorPlay,
  },
  {
    title: 'Clases en ruta y parqueo',
    text: 'Maneja en calles reales y domina el parqueo con tu instructor siempre a tu lado.',
    img: '/images/servicio-ruta-parqueo.webp',
    Icon: MapPin,
  },
  {
    title: 'Trámite de licencia',
    text: 'Te acompañamos en todo el proceso para obtener tu licencia de conducir, sin complicaciones.',
    img: '/images/servicio-tramite.webp',
    Icon: IdCard,
  },
  {
    title: 'Máster clase para tu examen',
    text: 'Te preparamos para aprobar tu examen de conducir con una clase especial.',
    img: '/images/servicio-master-clase.webp',
    Icon: GraduationCap,
    badge: 'Incluido en VIP Premium',
  },
]

export default function Services() {
  return (
    <section className="section services" id="servicios">
      <div className="container">
        <div className="services__head">
          <SectionHead eyebrow="Nuestros servicios" title={['Todo lo que necesitas', 'en un solo lugar']} swoosh />
          <Reveal delay={0.15}>
            <p className="services__intro">
              Te acompañamos en cada paso, desde tu primera clase hasta la obtención de tu licencia de conducir.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="services__cta">
            <Magnetic to="/planes" className="btn btn--outline btn--sm">
              Ver planes <ArrowRight size={16} strokeWidth={2.4} />
            </Magnetic>
          </Reveal>
        </div>

        <Reveal stagger={0.12} className="services__grid">
          {SERVICES.map(({ title, text, img, Icon, badge }) => (
            <RevealItem as="article" className="svc" key={title}>
              <div className="svc__media">
                <img src={img} alt={title} loading="lazy" width={1000} height={563} />
                {badge && <span className="svc__badge">{badge}</span>}
              </div>
              <div className="svc__body">
                <span className="svc__icon">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a
                  className="svc__link"
                  href={waLink(`Hola, quiero más información sobre: ${title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conoce más <ArrowRight size={15} strokeWidth={2.4} />
                </a>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

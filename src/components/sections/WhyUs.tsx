import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock, GraduationCap, Headset, House, UserRound } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Magnetic, Reveal, RevealItem } from '../motion'
import { SteeringWheelIcon } from '../icons'
import './WhyUs.css'

const REASONS = [
  { title: 'Clases privadas', sub: 'Atención uno a uno', Icon: UserRound },
  { title: 'Horarios flexibles', sub: '¡Nos ajustamos a tu tiempo!', Icon: Clock },
  { title: 'Simulador + práctica real', sub: 'Del simulador a la calle', Icon: SteeringWheelIcon },
  { title: 'Servicio a domicilio', sub: 'Te buscamos donde estés', Icon: House },
  { title: 'Soporte vía WhatsApp y llamadas', sub: 'Siempre disponibles', Icon: Headset },
  { title: 'Máster clase para tu examen', sub: 'Llega preparado', Icon: GraduationCap },
]

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section className="why" id="por-que" ref={ref}>
      <motion.div className="why__bg" style={{ y }} aria-hidden="true">
        <img src="/images/porque-elegirnos.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="why__veil" aria-hidden="true" />

      <div className="container why__inner">
        <div className="why__intro">
          <SectionHead eyebrow="¿Por qué elegirnos?" title={['Más que una', 'escuela de chofer']} />
          <Reveal delay={0.15}>
            <p>
              En REY te enseñamos a conducir con paciencia, práctica real y un acompañamiento personalizado para que
              manejes con confianza y responsabilidad en Baní y en cualquier carretera.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Magnetic to="/planes" className="btn btn--gold btn--sm">
              Conoce nuestros planes <ArrowRight size={16} strokeWidth={2.4} />
            </Magnetic>
          </Reveal>
        </div>

        <Reveal stagger={0.08} as="ul" className="why__grid">
          {REASONS.map(({ title, sub, Icon }) => (
            <RevealItem as="li" className="why__item" key={title}>
              <span className="why__icon">
                <Icon size={26} strokeWidth={1.7} />
              </span>
              <strong>{title}</strong>
              <small>{sub}</small>
            </RevealItem>
          ))}
        </Reveal>

        <motion.p
          className="why__script script"
          aria-hidden="true"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          “Tu próxima
          <br />
          meta está
          <br />
          en la carretera.”
        </motion.p>
      </div>
    </section>
  )
}

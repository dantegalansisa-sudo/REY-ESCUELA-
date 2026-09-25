import { motion } from 'framer-motion'
import SectionHead from '../SectionHead'
import { Reveal, RevealItem } from '../motion'
import './Process.css'

const STEPS = [
  { title: 'Elige tu plan', text: 'Básico, Premium o VIP Premium.' },
  { title: 'Agenda tu clase', text: 'Coordina tu fecha y horario por WhatsApp.' },
  { title: 'Aprende y practica', text: 'Simulador, ruta y parqueo con tu instructor.' },
  { title: 'Obtén tu licencia', text: 'Y comienza a conducir con confianza.' },
]

export default function Process() {
  return (
    <section className="process">
      <div className="container process__inner">
        <SectionHead eyebrow="Tu camino hacia la licencia" title={['Es un proceso sencillo']} />

        <Reveal stagger={0.14} as="ol" className="process__steps">
          {STEPS.map((s, i) => (
            <RevealItem as="li" className="process__step" key={s.title}>
              <span className="process__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="process__text">
                <strong>{s.title}</strong>
                <small>{s.text}</small>
              </span>
              {i < STEPS.length - 1 && (
                <motion.span
                  className="process__line"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

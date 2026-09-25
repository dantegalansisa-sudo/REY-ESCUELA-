import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Crown } from 'lucide-react'
import { Magnetic, Reveal, RevealText } from '../motion'
import { PLANS } from '../../data/plans'
import './PlansBanner.css'

export default function PlansBanner() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%'])

  return (
    <section className="pbanner" ref={ref}>
      <motion.div className="pbanner__bg" style={{ y }} aria-hidden="true">
        <img src="/images/planes-banner.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="pbanner__veil" aria-hidden="true" />

      <div className="container pbanner__inner">
        <div className="pbanner__copy">
          <Reveal>
            <span className="eyebrow">Planes y precios</span>
          </Reveal>
          <RevealText
            className="pbanner__title"
            lines={[
              'Planes desde',
              <span className="pbanner__price">RD$11,990</span>,
            ]}
          />
          <Reveal delay={0.2}>
            <p className="pbanner__sub">Aprende a conducir desde cero</p>
          </Reveal>
          <Reveal delay={0.3}>
            <Magnetic to="/planes" className="btn btn--gold">
              Ver planes <ArrowRight size={18} strokeWidth={2.4} />
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="pbanner__card">
          <h3>Encuentra el plan ideal para ti</h3>
          <ul>
            {PLANS.map((p) => (
              <li key={p.id} className={p.featured ? 'is-featured' : ''}>
                <span className="pbanner__check">{p.featured ? <Crown size={14} /> : <Check size={14} strokeWidth={3} />}</span>
                <span className="pbanner__pname">{p.name}</span>
                <span className="pbanner__pprice">{p.price}</span>
              </li>
            ))}
          </ul>
          <p className="pbanner__note">Todos incluyen clases privadas, simulador y práctica en ruta y parqueo.</p>
          <Magnetic to="/planes" className="btn btn--gold btn--sm pbanner__cardcta" strength={0.2}>
            Comparar planes <ArrowRight size={16} strokeWidth={2.4} />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

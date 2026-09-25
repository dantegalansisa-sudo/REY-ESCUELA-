import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Reveal, RevealItem } from '../motion'
import { FAQS, type Faq as FaqT } from '../../data/faqs'
import './Faq.css'

export function Accordion({ items }: { items: FaqT[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Reveal stagger={0.07} className="acc">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <RevealItem className={`acc__item ${isOpen ? 'is-open' : ''}`} key={f.q}>
            <h3>
              <button
                className="acc__q"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <span className="acc__icon">
                  <Plus size={18} strokeWidth={2.4} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="acc__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        )
      })}
    </Reveal>
  )
}

export default function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq__inner">
        <div className="faq__head">
          <SectionHead eyebrow="Preguntas frecuentes" title={['Resolvemos', 'tus dudas']} swoosh />
          <Reveal delay={0.15}>
            <p>¿Tienes otra pregunta? Escríbenos por WhatsApp y te respondemos al momento.</p>
          </Reveal>
        </div>
        <Accordion items={FAQS} />
      </div>
    </section>
  )
}

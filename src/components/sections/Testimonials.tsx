import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Reveal } from '../motion'
import { TESTIMONIALS } from '../../data/testimonials'
import './Testimonials.css'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>('.tcard')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }

  return (
    <section className="section testimonials">
      <div className="container testimonials__inner">
        <div className="testimonials__head">
          <SectionHead eyebrow="Nuestros estudiantes" title={['Historias reales,', 'resultados reales']} />
          <Reveal delay={0.2} className="testimonials__arrows">
            <button className="tarrow" onClick={() => go(-1)} disabled={edge.start} aria-label="Testimonio anterior">
              <ChevronLeft size={20} />
            </button>
            <button className="tarrow" onClick={() => go(1)} disabled={edge.end} aria-label="Siguiente testimonio">
              <ChevronRight size={20} />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="testimonials__viewport">
          <div className="testimonials__track" ref={track} onScroll={update}>
            {TESTIMONIALS.map((t) => (
              <figure className="tcard" key={t.name}>
                <Quote className="tcard__quote" size={26} fill="currentColor" strokeWidth={0} />
                <blockquote>“{t.text}”</blockquote>
                <div className="tcard__stars" aria-label={`${t.rating} de 5 estrellas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={17} strokeWidth={0} fill={i < t.rating ? 'currentColor' : '#e3e3dc'} />
                  ))}
                </div>
                <figcaption>
                  <span className="tcard__avatar">{initials(t.name)}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

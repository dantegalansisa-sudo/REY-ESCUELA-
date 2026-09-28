import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Video, X } from 'lucide-react'
import { Reveal, RevealText } from '../motion'
import { VIDEOS, VIDEO_CATEGORIES, VIDEO_TAGS, type StudentVideo, type VideoCategory } from '../../data/videos'
import { waLink } from '../../data/site'
import './Videos.css'

type Filter = 'todos' | VideoCategory

function VideoCard({ v, index, onOpen }: { v: StudentVideo; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  const preview = (on: boolean) => {
    const el = ref.current
    if (!el || !canHover) return
    if (on) el.play().catch(() => {})
    else {
      el.pause()
      el.currentTime = 0
    }
  }

  return (
    <motion.button
      layout
      className="vcard"
      onClick={onOpen}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      aria-label={`Ver video: ${v.title}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <video ref={ref} className="vcard__media" src={v.src} poster={v.poster} muted loop playsInline preload="none" />
      <span className="vcard__shade" aria-hidden="true" />
      <span className="vcard__time">{v.duration}</span>
      <span className="vcard__play" aria-hidden="true">
        <Play size={20} fill="currentColor" strokeWidth={0} />
      </span>
      <span className="vcard__info">
        <strong>{v.title}</strong>
        <small>{v.text}</small>
        <span className="vcard__meta">
          <span className="vcard__author">
            <img src="/favicon.png" alt="" width={28} height={28} />
            Estudiante REY
          </span>
          <span className={`vcard__tag vcard__tag--${v.category}`}>{VIDEO_TAGS[v.category]}</span>
        </span>
      </span>
    </motion.button>
  )
}

function Lightbox({ list, index, onClose, onNav }: { list: StudentVideo[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
  const v = list[index]
  const many = list.length > 1

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (many && e.key === 'ArrowRight') onNav((index + 1) % list.length)
      if (many && e.key === 'ArrowLeft') onNav((index - 1 + list.length) % list.length)
    }
    document.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', key)
      document.body.style.overflow = ''
    }
  }, [index, list.length, many, onClose, onNav])

  return (
    <motion.div
      className="vbox"
      role="dialog"
      aria-modal="true"
      aria-label={v.title}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="vbox__stage"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <video key={v.src} src={v.src} poster={v.poster} controls autoPlay playsInline className="vbox__video" />
        <div className="vbox__caption">
          <strong>{v.title}</strong>
          <small>{v.text}</small>
        </div>
      </motion.div>
      <button className="vbox__close" onClick={onClose} aria-label="Cerrar video">
        <X size={22} />
      </button>
      {many && (
        <>
          <button
            className="vbox__nav vbox__nav--prev"
            aria-label="Video anterior"
            onClick={(e) => {
              e.stopPropagation()
              onNav((index - 1 + list.length) % list.length)
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="vbox__nav vbox__nav--next"
            aria-label="Siguiente video"
            onClick={(e) => {
              e.stopPropagation()
              onNav((index + 1) % list.length)
            }}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </motion.div>
  )
}

export default function Videos() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [open, setOpen] = useState<number | null>(null)

  const filters = useMemo(() => {
    const used = new Set(VIDEOS.map((v) => v.category))
    return (Object.keys(VIDEO_CATEGORIES) as VideoCategory[]).filter((c) => used.has(c))
  }, [])
  const list = filter === 'todos' ? VIDEOS : VIDEOS.filter((v) => v.category === filter)

  return (
    <section className="section videos" id="videos">
      <div className="container">
        <div className="videos__head">
          <div>
            <Reveal>
              <span className="eyebrow videos__eyebrow">
                <Video size={16} strokeWidth={2.2} /> Videos de nuestros estudiantes
              </span>
            </Reveal>
            <RevealText
              className="shead__title videos__title"
              delay={0.08}
              lines={['Personas reales,', <>historias que <span className="videos__accent">avanzan</span></>]}
            />
            <Reveal delay={0.2}>
              <p className="videos__lead">
                Mira a nuestros estudiantes en acción. Con práctica, paciencia y buena guía, ¡todos llegan a su meta!
              </p>
            </Reveal>
          </div>
          <motion.p
            className="videos__script script"
            aria-hidden="true"
            initial={{ opacity: 0, rotate: -10, y: 10 }}
            whileInView={{ opacity: 1, rotate: -8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Tú también puedes
            <br />
            ser el siguiente
            <svg viewBox="0 0 60 70" fill="none" className="videos__arrow">
              <path d="M40 4C14 14 4 36 18 62" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M9 54l9 9 8-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.p>
        </div>

        {filters.length > 1 && (
          <Reveal delay={0.1} className="videos__filters" >
            <div role="tablist" aria-label="Filtrar videos">
              {(['todos', ...filters] as Filter[]).map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={`chip ${filter === f ? 'is-active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'todos' ? 'Todos' : VIDEO_CATEGORIES[f]}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <motion.div layout className="videos__grid">
          <AnimatePresence>
            {list.map((v, i) => (
              <VideoCard key={v.src} v={v} index={i} onOpen={() => setOpen(i)} />
            ))}
            <motion.a
              layout
              key="cta"
              className="vcta"
              href={waLink('Hola, quiero empezar mis clases de manejo en REY Escuela de Chofer.')}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: list.length * 0.08 }}
            >
              <img src="/images/logo.webp" alt="" className="vcta__logo" />
              <strong>Tu historia puede ser la próxima</strong>
              <small>Reserva tu primera clase y empieza a manejar con confianza.</small>
              <span className="btn btn--gold btn--sm">
                Reservar clase <ArrowRight size={16} strokeWidth={2.4} />
              </span>
            </motion.a>
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && list[open] && <Lightbox list={list} index={open} onClose={() => setOpen(null)} onNav={setOpen} />}
      </AnimatePresence>
    </section>
  )
}

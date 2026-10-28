import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, Car, IdCard, Play, Trophy, UserRound } from 'lucide-react'
import { Magnetic, Reveal, RevealItem, RevealText } from './motion'
import { SteeringWheelIcon } from './icons'
import { SITE, waLink } from '../data/site'
import './Hero.css'

const STEPS = [
  { n: '01', title: 'Aprende', sub: 'Desde cero', Icon: BookOpen },
  { n: '02', title: 'Practica', sub: 'Simulador y ruta real', Icon: Car },
  { n: '03', title: 'Obtén tu licencia', sub: 'Y conduce tu propio futuro', Icon: Trophy },
]

const BADGES = [
  { label: ['Clases', 'privadas'], Icon: UserRound },
  { label: ['Simulador +', 'ruta real'], Icon: SteeringWheelIcon },
  { label: ['Trámite de', 'licencia'], Icon: IdCard },
]

const WA_COMENZAR = waLink('Hola, quiero comenzar mis clases de manejo en REY Escuela de Chofer.')

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const clip = useRef<HTMLVideoElement>(null)

  // Pre-rendered HTML can't carry the `muted` attribute (React sets it as a property),
  // so browsers block the autoplay; start the silent loop once hydrated.
  useEffect(() => {
    const v = clip.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [reduce])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.14])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY, scale: bgScale }} aria-hidden="true">
        <img src="/images/hero.webp" alt="" width={1920} height={1080} {...{ fetchpriority: 'high' }} />
      </motion.div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal onMount delay={0.1}>
            <span className="eyebrow hero__eyebrow">Escuela de chofer</span>
          </Reveal>

          <RevealText
            as="h1"
            onMount
            delay={0.2}
            className="hero__title"
            lines={[
              'Tu libertad',
              <span className="hero__title-accent">comienza</span>,
              <>
                aquí<span className="hero__dot">.</span>
              </>,
            ]}
          />

          <Reveal onMount delay={0.65}>
            <p className="hero__lead">
              Aprende a conducir desde cero con seguridad, confianza y preparación para la carretera real.
            </p>
          </Reveal>

          <Reveal onMount delay={0.8} className="hero__ctas">
            <Magnetic href={WA_COMENZAR} className="btn btn--gold">
              Comenzar clases <ArrowRight size={18} strokeWidth={2.4} />
            </Magnetic>
            <Magnetic to="/planes" className="btn btn--outline">
              Ver planes
              <span className="hero__play-dot">
                <Play size={11} fill="currentColor" strokeWidth={0} />
              </span>
            </Magnetic>
          </Reveal>

          <Reveal onMount delay={1} stagger={0.1} as="ul" className="hero__badges">
            {BADGES.map(({ label, Icon }) => (
              <RevealItem as="li" className="hero__badge" key={label.join()}>
                <span className="hero__badge-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span>
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        <motion.p
          className="hero__script script"
          aria-hidden="true"
          initial={{ opacity: 0, rotate: -14, y: 10 }}
          animate={{ opacity: 1, rotate: -12, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        >
          Más que conducir,
          <br />
          es avanzar.
          <svg className="hero__swoosh" viewBox="0 0 120 40" fill="none">
            <path d="M4 30C30 10 70 4 116 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.p>

        <motion.div className="hero__side" style={{ y: cardsY }}>
          <Reveal onMount delay={0.5} stagger={0.12} as="ul" className="hero__steps">
            {STEPS.map(({ n, title, sub, Icon }) => (
              <RevealItem as="li" className="hero__step" key={n}>
                <span className="hero__step-n">{n}</span>
                <span className="hero__step-text">
                  <strong>{title}</strong>
                  <small>{sub}</small>
                </span>
                <Icon className="hero__step-icon" size={22} strokeWidth={1.7} />
              </RevealItem>
            ))}
          </Reveal>

          <Reveal onMount delay={1.15}>
            <a className="hero__exp" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <span className="hero__exp-thumb">
                {reduce ? (
                  <img src="/videos/hero-experiencia.jpg" alt="" loading="lazy" />
                ) : (
                  <video ref={clip} src="/videos/hero-experiencia.mp4" poster="/videos/hero-experiencia.jpg" autoPlay muted loop playsInline preload="none" aria-hidden="true" />
                )}
                <span className="hero__exp-play">
                  <Play size={16} fill="currentColor" strokeWidth={0} />
                </span>
              </span>
              <span className="hero__exp-text">
                <strong>
                  Descubre
                  <br />
                  la experiencia
                </strong>
                <small>Mira cómo son nuestras clases en la carretera.</small>
              </span>
              <ArrowRight className="hero__exp-arrow" size={20} />
            </a>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Magnetic } from './motion'
import { WA_RESERVAR } from '../data/site'
import './Navbar.css'

const LINKS = [
  { label: 'Inicio', to: '/', match: (p: string, h: string) => p === '/' && (h === '' || h === '#inicio') },
  { label: 'Servicios', to: '/#servicios', match: (_p: string, h: string) => h === '#servicios' },
  { label: 'Planes', to: '/planes', match: (p: string) => p === '/planes' },
  { label: 'Nosotros', to: '/#nosotros', match: (_p: string, h: string) => h === '#nosotros' },
  { label: 'Contacto', to: '/#contacto', match: (_p: string, h: string) => h === '#contacto' },
]

export default function Navbar() {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" aria-label="REY Escuela de Chofer — Inicio">
          <img src="/images/logo.webp" alt="REY Escuela de Chofer" width={480} height={240} />
        </Link>

        <nav className="nav__links" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.label} to={l.to} className={`nav__link ${l.match(pathname, hash) ? 'is-active' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__cta">
          <Magnetic href={WA_RESERVAR} className="btn btn--gold btn--sm">
            Reservar clase <ArrowRight size={17} strokeWidth={2.4} />
          </Magnetic>
        </div>

        <button
          className="nav__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__mobile"
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.div key={l.label} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Link to={l.to} className={`nav__mlink ${l.match(pathname, hash) ? 'is-active' : ''}`}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <a href={WA_RESERVAR} target="_blank" rel="noopener noreferrer" className="btn btn--gold nav__mcta">
              Reservar clase <ArrowRight size={18} strokeWidth={2.4} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

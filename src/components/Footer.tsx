import { Link } from 'react-router-dom'
import { InstagramIcon, TikTokIcon } from './icons'
import { SITE } from '../data/site'
import './Footer.css'

const LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Planes', to: '/planes' },
  { label: 'Nosotros', to: '/#nosotros' },
  { label: 'Contacto', to: '/#contacto' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link to="/" className="footer__logo" aria-label="REY Escuela de Chofer — Inicio">
          <img src="/images/logo.webp" alt="REY Escuela de Chofer" width={480} height={240} loading="lazy" />
        </Link>

        <nav className="footer__nav" aria-label="Pie de página">
          {LINKS.map((l) => (
            <Link key={l.label} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="footer__social">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon size={20} />
          </a>
          <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <TikTokIcon size={19} />
          </a>
        </div>

        <div className="footer__meta">
          <p>© 2026 REY Escuela de Chofer. Todos los derechos reservados.</p>
          <p>{SITE.addressShort}</p>
        </div>
      </div>
      <div className="footer__stripe" aria-hidden="true" />
    </footer>
  )
}

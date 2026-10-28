import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Banknote, Clock, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './icons'
import { Magnetic, Reveal } from './motion'
import { SITE, WA_RESERVAR } from '../data/site'
import { PLANS } from '../data/plans'
import './Footer.css'

const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Planes y precios', to: '/planes' },
  { label: 'Videos', to: '/#videos' },
  { label: 'Sobre nosotros', to: '/#nosotros' },
  { label: 'Preguntas frecuentes', to: '/#faq' },
  { label: 'Contacto', to: '/#contacto' },
]

export default function Footer() {
  // /planes closes with its own WhatsApp CTA, so skip the footer one there
  const showCta = useLocation().pathname !== '/planes'
  return (
    <footer className="footer">
      <div className="container">
        {showCta && (
        <Reveal className="fcta">
          <div className="fcta__copy">
            <span className="fcta__eyebrow">¿Listo para tomar el volante?</span>
            <h2>
              Tu licencia empieza con <span>una clase.</span>
            </h2>
          </div>
          <div className="fcta__actions">
            <Magnetic href={WA_RESERVAR} className="btn btn--gold">
              <WhatsAppIcon size={19} /> Reservar por WhatsApp
            </Magnetic>
            <Magnetic to="/planes" className="btn fcta__ghost">
              Ver planes <ArrowRight size={17} strokeWidth={2.4} />
            </Magnetic>
          </div>
        </Reveal>
        )}

        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="REY Escuela de Chofer — Inicio">
              <img src="/images/logo.webp" alt="REY Escuela de Chofer" width={480} height={240} loading="lazy" />
            </Link>
            <p>Escuela de chofer en Baní. Clases privadas, simulador y práctica real para que conduzcas con seguridad y confianza.</p>
            <div className="footer__social">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de REY Escuela de Chofer">
                <InstagramIcon size={19} />
              </a>
              <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de REY Escuela de Chofer">
                <TikTokIcon size={18} />
              </a>
              <a href={WA_RESERVAR} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de REY Escuela de Chofer">
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Navegación del pie de página">
            <h3>Navegación</h3>
            <ul>
              {NAV.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Planes</h3>
            <ul className="footer__plans">
              {PLANS.map((p) => (
                <li key={p.id}>
                  <Link to="/planes">
                    <span>{p.name}</span>
                    <strong>{p.price}</strong>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="footer__pay">
              <Banknote size={16} /> {SITE.payments}
            </p>
          </div>

          <div className="footer__col">
            <h3>Contacto</h3>
            <ul className="footer__contact">
              <li>
                <Phone size={16} />
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <MapPin size={16} />
                <a href={SITE.mapsDirections} target="_blank" rel="noopener noreferrer">
                  {SITE.addressShort}
                  <small>Cómo llegar</small>
                </a>
              </li>
              <li>
                <Clock size={16} />
                <span>
                  {SITE.hours[0]}
                  <small>
                    {SITE.hours[1]}
                    <br />
                    {SITE.hours[2]}
                  </small>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 REY Escuela de Chofer. Todos los derechos reservados.</p>
          <nav className="footer__legal" aria-label="Legal">
            <Link to="/privacidad">Política de privacidad</Link>
            <Link to="/terminos">Términos y condiciones</Link>
          </nav>
          <p className="footer__credit">
            Desarrollado por{' '}
            <a href="https://nexixtechstudio.com" target="_blank" rel="noopener">
              NexixTechStudio.com <ArrowUpRight size={13} strokeWidth={2.4} />
            </a>
          </p>
        </div>
      </div>
      <div className="footer__stripe" aria-hidden="true" />
    </footer>
  )
}

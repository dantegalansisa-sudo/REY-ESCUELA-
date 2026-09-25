import { useState, type FormEvent } from 'react'
import { ArrowRight, Clock, MapPin, Navigation, Phone } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Magnetic, Reveal, RevealItem } from '../motion'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '../icons'
import { SITE, WA_DEFAULT, waLink } from '../../data/site'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', telefono: '', mensaje: '' })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text =
      `Hola, soy ${form.nombre.trim()}.` +
      (form.telefono.trim() ? ` Mi teléfono es ${form.telefono.trim()}.` : '') +
      `\n\n${form.mensaje.trim()}`
    window.open(waLink(text), '_blank', 'noopener,noreferrer')
  }

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section className="section contact" id="contacto">
      <div className="container contact__inner">
        <div className="contact__info">
          <SectionHead eyebrow="Contáctanos" title={['Estamos aquí', 'para ayudarte']} />

          <Reveal stagger={0.08} as="ul" className="contact__list">
            <RevealItem as="li">
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="citem">
                <span className="citem__icon citem__icon--wa">
                  <WhatsAppIcon size={20} />
                </span>
                <span>
                  <strong>Escríbenos por WhatsApp</strong>
                  <small>Respuesta rápida</small>
                </span>
              </a>
            </RevealItem>
            <RevealItem as="li">
              <a href={`tel:${SITE.phoneTel}`} className="citem">
                <span className="citem__icon">
                  <Phone size={19} />
                </span>
                <span>
                  <strong>Llámanos</strong>
                  <small>{SITE.phoneDisplay}</small>
                </span>
              </a>
            </RevealItem>
            <RevealItem as="li">
              <div className="citem">
                <span className="citem__icon">
                  <Clock size={19} />
                </span>
                <span>
                  <strong>{SITE.hours[0]}</strong>
                  <small>
                    {SITE.hours[1]} · {SITE.hours[2]}
                  </small>
                </span>
              </div>
            </RevealItem>
            <RevealItem as="li">
              <a href={SITE.mapsDirections} target="_blank" rel="noopener noreferrer" className="citem">
                <span className="citem__icon">
                  <MapPin size={19} />
                </span>
                <span>
                  <strong>Visítanos</strong>
                  <small>{SITE.address}</small>
                </span>
              </a>
            </RevealItem>
          </Reveal>

          <Reveal delay={0.3} className="contact__social">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de REY Escuela de Chofer" className="social social--ig">
              <InstagramIcon size={20} />
            </a>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de REY Escuela de Chofer" className="social social--tt">
              <TikTokIcon size={19} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="contact__form-wrap">
          <form className="cform" onSubmit={submit}>
            <h3>Envíanos un mensaje</h3>
            <p className="cform__hint">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
            <div className="cform__row">
              <label>
                <span>Nombre</span>
                <input required name="nombre" autoComplete="name" placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} />
              </label>
              <label>
                <span>Teléfono</span>
                <input
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  placeholder="809 000 0000"
                  value={form.telefono}
                  onChange={set('telefono')}
                />
              </label>
            </div>
            <label>
              <span>Mensaje</span>
              <textarea
                required
                name="mensaje"
                rows={4}
                placeholder="Quiero información sobre los planes…"
                value={form.mensaje}
                onChange={set('mensaje')}
              />
            </label>
            <Magnetic type="submit" className="btn btn--gold cform__submit" strength={0.2}>
              Enviar por WhatsApp <ArrowRight size={18} strokeWidth={2.4} />
            </Magnetic>
          </form>
        </Reveal>

        <Reveal delay={0.2} className="contact__map">
          <iframe
            title="Mapa: REY Escuela de Chofer, Calle Duvergé #41 Norte, Baní"
            src={SITE.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="contact__map-card">
            <span className="citem__icon citem__icon--gold">
              <MapPin size={18} />
            </span>
            <div>
              <strong>Visítanos</strong>
              <small>{SITE.addressShort}</small>
              <a href={SITE.mapsDirections} target="_blank" rel="noopener noreferrer">
                Cómo llegar <Navigation size={13} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

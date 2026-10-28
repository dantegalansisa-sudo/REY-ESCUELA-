import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react'
import { Reveal, RevealText } from '../components/motion'
import type { LegalDoc } from '../data/legal'
import './Legal.css'

type Props = { doc: LegalDoc; kind: 'privacidad' | 'terminos' }

export default function Legal({ doc, kind }: Props) {
  useEffect(() => {
    const prev = document.title
    document.title = `${doc.title} | REY Escuela de Chofer`
    return () => {
      document.title = prev
    }
  }, [doc.title])

  const Icon = kind === 'privacidad' ? ShieldCheck : FileText
  const other = kind === 'privacidad' ? { to: '/terminos', label: 'Términos y condiciones' } : { to: '/privacidad', label: 'Política de privacidad' }

  return (
    <>
      <section className="lhero">
        <div className="container">
          <Reveal onMount>
            <nav className="phero__crumbs" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <ChevronRight size={14} />
              <span aria-current="page">{doc.title}</span>
            </nav>
          </Reveal>
          <Reveal onMount delay={0.1}>
            <span className="lhero__icon">
              <Icon size={26} strokeWidth={1.8} />
            </span>
          </Reveal>
          <RevealText as="h1" onMount delay={0.15} className="lhero__title" lines={[doc.title]} />
          <Reveal onMount delay={0.3}>
            <p className="lhero__updated">Última actualización: {doc.updated}</p>
          </Reveal>
        </div>
      </section>

      <section className="legal">
        <div className="container legal__inner">
          <aside className="legal__toc" aria-label="Contenido">
            <span className="eyebrow">Contenido</span>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title.replace(/^\d+\.\s*/, '')}</a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="legal__body">
            <p className="legal__intro">{doc.intro}</p>
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="legal__section">
                <h2>{s.title}</h2>
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i}>
                      {b.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{b}</p>
                  ),
                )}
              </section>
            ))}
            <div className="legal__next">
              <span>También te puede interesar</span>
              <Link to={other.to}>
                {other.label} <ChevronRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

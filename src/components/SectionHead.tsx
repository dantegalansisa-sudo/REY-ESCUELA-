import type { ReactNode } from 'react'
import { Reveal, RevealText } from './motion'

type Props = {
  eyebrow: string
  title: ReactNode[]
  swoosh?: boolean
  className?: string
  as?: 'h1' | 'h2'
  onMount?: boolean
}

/** Eyebrow + masked heading + optional gold hand-drawn underline (template style). */
export default function SectionHead({ eyebrow, title, swoosh, className = '', as = 'h2', onMount }: Props) {
  return (
    <div className={`shead ${className}`}>
      <Reveal onMount={onMount}>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <div className="shead__title-wrap">
        <RevealText as={as} className="shead__title" lines={title} delay={0.08} onMount={onMount} />
        {swoosh && (
          <svg className="shead__swoosh" viewBox="0 0 90 22" fill="none" aria-hidden="true">
            <path d="M3 17C26 9 54 5 87 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M18 20C38 15 58 12 80 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55" />
          </svg>
        )}
      </div>
    </div>
  )
}

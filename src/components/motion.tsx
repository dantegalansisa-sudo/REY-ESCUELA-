import { useRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'

const EASE = [0.22, 1, 0.36, 1] as const

/* ---------- Text reveal mask: each line slides up from behind a mask ---------- */
type RevealTextProps = {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  /** animate on mount (hero) instead of on scroll into view */
  onMount?: boolean
}

export function RevealText({ lines, as = 'h2', className, delay = 0, onMount = false }: RevealTextProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }
  const line: Variants = {
    hidden: { y: reduce ? 0 : '105%' },
    show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
  }
  const trigger = onMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <Tag className={className} variants={container} initial="hidden" {...trigger}>
      {lines.map((l, i) => (
        <span className="reveal-line" key={i}>
          <motion.span className="reveal-line__inner" variants={line}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ---------- Fade-up block + staggered group ---------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  onMount?: boolean
  as?: 'div' | 'ul' | 'section' | 'article'
}

export function Reveal({ children, className, delay = 0, stagger, onMount = false, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  const variants: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
    : { hidden: fadeUp.hidden, show: { ...(fadeUp.show as object), transition: { duration: 0.75, ease: EASE, delay } } }
  const trigger = onMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Tag className={className} variants={variants} initial="hidden" {...trigger}>
      {children}
    </Tag>
  )
}

/** Child of a staggered <Reveal stagger> */
export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' | 'article' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}

/* ---------- Magnetic button (external link, internal route or button) ---------- */
type MagneticProps = {
  children: ReactNode
  className?: string
  href?: string
  to?: string
  strength?: number
  type?: 'button' | 'submit'
  onClick?: () => void
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'>

export function Magnetic({ children, className, href, to, strength = 0.3, type = 'button', onClick, ...rest }: MagneticProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  const move = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  const common = {
    className,
    style: { x, y },
    onMouseMove: move,
    onMouseLeave: leave,
    whileTap: { scale: 0.97 },
    ...rest,
  }

  if (to) {
    return (
      <MotionLink to={to} ref={ref as React.Ref<HTMLAnchorElement>} {...common}>
        {children}
      </MotionLink>
    )
  }
  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" ref={ref as React.Ref<HTMLAnchorElement>} {...common}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} onClick={onClick} ref={ref as React.Ref<HTMLButtonElement>} {...common}>
      {children}
    </motion.button>
  )
}

const MotionLink = motion.create(Link)

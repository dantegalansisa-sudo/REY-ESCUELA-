import { waLink } from './site'

export type Plan = {
  id: 'basico' | 'premium' | 'vip'
  name: string
  price: string
  tagline: string
  featured?: boolean
  features: { label: string; included: boolean }[]
}

const ALL = [
  'Clases privadas',
  'Soporte vía WhatsApp y llamadas',
  '2 clases de simulador (35 min)',
  '8 clases en ruta y parqueo (35 min)',
  'Servicio a domicilio',
  'Trámite de licencia (impuestos incluidos)',
  'Máster clase para tu examen de conducir',
]

const upTo = (n: number) => ALL.map((label, i) => ({ label, included: i < n }))

export const PLANS: Plan[] = [
  { id: 'basico', name: 'Básico', price: 'RD$11,990', tagline: 'Lo esencial para aprender desde cero.', features: upTo(4) },
  { id: 'premium', name: 'Premium', price: 'RD$12,990', tagline: 'Aprende con la comodidad de ir a buscarte.', features: upTo(5) },
  { id: 'vip', name: 'VIP Premium', price: 'RD$22,990', tagline: 'Todo incluido, hasta tu licencia en mano.', featured: true, features: upTo(7) },
]

export const planWaLink = (p: Plan) => waLink(`Hola, quiero inscribirme en el plan ${p.name}`)

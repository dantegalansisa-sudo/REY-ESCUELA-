import type { ReactNode } from 'react'

export type Faq = { q: string; a: ReactNode }

export const FAQS: Faq[] = [
  { q: '¿Cuánto dura cada clase?', a: 'Cada clase dura 35 minutos, tanto las de simulador como las de ruta y parqueo.' },
  {
    q: '¿Qué incluyen los planes?',
    a: 'Todos los planes incluyen clases privadas, clases de simulador y clases en ruta y parqueo. Premium suma servicio a domicilio y VIP Premium incluye además el trámite de licencia y la máster clase para tu examen.',
  },
  { q: '¿Van a domicilio?', a: 'Sí. El servicio a domicilio está incluido en los planes Premium y VIP Premium.' },
  { q: '¿Cuáles son los métodos de pago?', a: 'Aceptamos pagos en efectivo y por transferencia.' },
  { q: '¿Cuál es el horario?', a: 'Lunes a viernes de 8:30 AM a 12:00 PM y de 2:00 PM a 6:30 PM.' },
]

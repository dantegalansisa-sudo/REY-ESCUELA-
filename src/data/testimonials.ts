/**
 * TESTIMONIOS — EDITABLE
 * Reemplaza estos textos de ejemplo por reseñas reales de estudiantes antes de publicar.
 * Para agregar uno nuevo, copia un objeto y cambia nombre, texto y rol.
 */
export type Testimonial = { name: string; role: string; text: string; rating: number }

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María Peña',
    role: 'Estudiante — Plan VIP Premium',
    text: 'Empecé sin saber nada y el instructor tuvo mucha paciencia. Me sentí segura desde la primera clase.',
    rating: 5,
  },
  {
    name: 'Carlos Báez',
    role: 'Estudiante — Plan Premium',
    text: 'Las clases en el simulador me ayudaron muchísimo antes de salir a la calle. Súper recomendado.',
    rating: 5,
  },
  {
    name: 'Yokasta Soto',
    role: 'Estudiante — Plan VIP Premium',
    text: 'Me ayudaron con todo el trámite de la licencia. Rápido y sin complicaciones, siempre disponibles por WhatsApp.',
    rating: 5,
  },
  {
    name: 'Luis Mejía',
    role: 'Estudiante — Plan Básico',
    text: 'Los horarios se ajustaron a mi trabajo. Aprendí a parquear en pocas clases.',
    rating: 5,
  },
  {
    name: 'Rosanna Pujols',
    role: 'Estudiante — Plan Premium',
    text: 'Que me buscaran a la casa fue lo mejor. Muy buen trato y mucha profesionalidad.',
    rating: 5,
  },
]

/**
 * VIDEOS DE ESTUDIANTES — EDITABLE
 *
 * Para agregar un video:
 *  1. Copia el archivo .mp4 (vertical, 9:16) en /public/videos/  → ej. public/videos/mi-video.mp4
 *  2. Copia una imagen de portada .jpg con el mismo nombre           → ej. public/videos/mi-video.jpg
 *  3. Agrega un objeto a la lista de abajo. Aparece solo en la web, en el orden de la lista.
 *
 * `category` define el filtro donde aparece. Los filtros sin videos no se muestran.
 */
export type VideoCategory = 'simulador' | 'ruta' | 'examenes' | 'escuela'

export const VIDEO_CATEGORIES: Record<VideoCategory, string> = {
  simulador: 'Simulador',
  ruta: 'Práctica en ruta',
  examenes: 'Exámenes',
  escuela: 'Momentos en la escuela',
}

/** Etiqueta corta que se muestra dentro de cada tarjeta */
export const VIDEO_TAGS: Record<VideoCategory, string> = {
  simulador: 'Simulador',
  ruta: 'En ruta',
  examenes: 'Examen',
  escuela: 'La escuela',
}

export type StudentVideo = {
  src: string
  poster: string
  title: string
  text: string
  duration: string
  category: VideoCategory
}

export const VIDEOS: StudentVideo[] = [
  {
    src: '/videos/practica-simulador.mp4',
    poster: '/videos/practica-simulador.jpg',
    title: 'Primeros pasos en el simulador',
    text: 'Antes de salir a la calle, se practica en un entorno seguro.',
    duration: '0:07',
    category: 'simulador',
  },
  {
    src: '/videos/practica-en-ruta.mp4',
    poster: '/videos/practica-en-ruta.jpg',
    title: 'Práctica en ruta real',
    text: 'Manos al volante y el instructor siempre al lado.',
    duration: '0:13',
    category: 'ruta',
  },
  {
    src: '/videos/manejando-por-bani.mp4',
    poster: '/videos/manejando-por-bani.jpg',
    title: 'Manejando por Baní',
    text: 'De la práctica a la calle, con confianza y seguridad.',
    duration: '0:08',
    category: 'ruta',
  },
]

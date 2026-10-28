/**
 * VIDEOS DE ESTUDIANTES — EDITABLE
 *
 * Para agregar un video:
 *  1. Copia el archivo .mp4 en /public/videos/                  → ej. public/videos/mi-video.mp4
 *  2. Copia una imagen de portada .jpg con el mismo nombre        → ej. public/videos/mi-video.jpg
 *  3. Agrega un objeto a la lista de abajo. Aparece en la web (y en el sitemap) en el orden de la lista.
 *
 * `category` define el filtro donde aparece. Los filtros sin videos no se muestran.
 * `landscape: true` solo si el video es horizontal.
 */
export type VideoCategory = 'licencia' | 'simulador' | 'ruta' | 'parqueo' | 'escuela'

export const VIDEO_CATEGORIES: Record<VideoCategory, string> = {
  licencia: 'Licencia en mano',
  simulador: 'Simulador',
  ruta: 'Práctica en ruta',
  parqueo: 'Parqueo',
  escuela: 'Momentos en la escuela',
}

/** Etiqueta corta que se muestra dentro de cada tarjeta */
export const VIDEO_TAGS: Record<VideoCategory, string> = {
  licencia: 'Licencia',
  simulador: 'Simulador',
  ruta: 'En ruta',
  parqueo: 'Parqueo',
  escuela: 'La escuela',
}

export type StudentVideo = {
  src: string
  poster: string
  title: string
  text: string
  /** m:ss */
  duration: string
  category: VideoCategory
  /** AAAA-MM-DD, se usa en el sitemap de videos */
  uploadDate: string
  landscape?: boolean
}

export const VIDEOS: StudentVideo[] = [
  {
    src: '/videos/licencia-en-mano.mp4',
    poster: '/videos/licencia-en-mano.jpg',
    title: '¡Licencia en mano!',
    text: 'Del primer día a la meta cumplida. Así se celebra en REY.',
    duration: '0:05',
    category: 'licencia',
    uploadDate: '2026-10-27',
  },
  {
    src: '/videos/parqueo-con-conos.mp4',
    poster: '/videos/parqueo-con-conos.jpg',
    title: 'Parqueo entre conos',
    text: 'Maniobras de parqueo con nuestro carro de práctica.',
    duration: '0:40',
    category: 'parqueo',
    uploadDate: '2026-10-27',
  },
  {
    src: '/videos/confianza-al-volante.mp4',
    poster: '/videos/confianza-al-volante.jpg',
    title: 'Confianza al volante',
    text: 'Paso a paso, la seguridad se nota en cada vuelta.',
    duration: '0:14',
    category: 'ruta',
    uploadDate: '2026-10-27',
  },
  {
    src: '/videos/practica-simulador.mp4',
    poster: '/videos/practica-simulador.jpg',
    title: 'Primeros pasos en el simulador',
    text: 'Antes de salir a la calle, se practica en un entorno seguro.',
    duration: '0:07',
    category: 'simulador',
    uploadDate: '2026-09-28',
  },
  {
    src: '/videos/clase-en-ruta-paso-a-paso.mp4',
    poster: '/videos/clase-en-ruta-paso-a-paso.jpg',
    title: 'Clase en ruta, paso a paso',
    text: 'Concentración y buenas decisiones en cada cruce.',
    duration: '0:40',
    category: 'ruta',
    uploadDate: '2026-10-27',
    landscape: true,
  },
  {
    src: '/videos/primeras-vueltas.mp4',
    poster: '/videos/primeras-vueltas.jpg',
    title: 'Primeras vueltas en la calle',
    text: 'Con el instructor al lado, cada salida suma experiencia.',
    duration: '0:14',
    category: 'ruta',
    uploadDate: '2026-10-27',
  },
  {
    src: '/videos/simulador-concentracion.mp4',
    poster: '/videos/simulador-concentracion.jpg',
    title: 'Concentración en el simulador',
    text: 'Se practica sin riesgos hasta sentirse listo.',
    duration: '0:05',
    category: 'simulador',
    uploadDate: '2026-10-27',
  },
  {
    src: '/videos/practica-en-ruta.mp4',
    poster: '/videos/practica-en-ruta.jpg',
    title: 'Práctica en ruta real',
    text: 'Manos al volante y el instructor siempre al lado.',
    duration: '0:13',
    category: 'ruta',
    uploadDate: '2026-09-28',
  },
  {
    src: '/videos/manejando-por-bani.mp4',
    poster: '/videos/manejando-por-bani.jpg',
    title: 'Manejando por Baní',
    text: 'De la práctica a la calle, con confianza y seguridad.',
    duration: '0:08',
    category: 'ruta',
    uploadDate: '2026-09-28',
  },
]

/**
 * CONFIGURACIÓN SEO — único lugar donde cambiar el dominio.
 * Al tener el dominio definitivo, cámbialo aquí (o define la variable de entorno SITE_URL en el hosting)
 * y vuelve a ejecutar `npm run build`: canonical, Open Graph, sitemap.xml, robots.txt y JSON-LD se actualizan solos.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://rey-escuela.vercel.app').replace(/\/+$/, '')

export const ROUTES = [
  {
    path: '/',
    out: ['index.html'],
    title: 'REY Escuela de Chofer | Aprende a conducir en Baní',
    description:
      'REY Escuela de Chofer en Baní: clases de manejo privadas, simulador, práctica en ruta y parqueo, y trámite de licencia de conducir. Planes desde RD$11,990.',
    image: '/images/og.jpg',
    preload: '/images/hero.webp',
    priority: '1.0',
  },
  {
    path: '/planes',
    out: ['planes.html', 'planes/index.html'],
    title: 'Planes y precios de clases de manejo en Baní | REY Escuela de Chofer',
    description:
      'Planes de clases de manejo en Baní desde RD$11,990: Básico, Premium y VIP Premium con simulador, práctica en ruta y parqueo, servicio a domicilio y trámite de licencia.',
    image: '/images/og.jpg',
    preload: '/images/planes-banner.webp',
    priority: '0.9',
  },
  {
    path: '/privacidad',
    out: ['privacidad.html', 'privacidad/index.html'],
    title: 'Política de privacidad | REY Escuela de Chofer',
    description:
      'Cómo REY Escuela de Chofer en Baní trata tus datos personales, conforme a la Ley 172-13 de protección de datos de la República Dominicana.',
    image: '/images/og.jpg',
    priority: '0.3',
  },
  {
    path: '/terminos',
    out: ['terminos.html', 'terminos/index.html'],
    title: 'Términos y condiciones | REY Escuela de Chofer',
    description:
      'Condiciones de uso del sitio y de los servicios de REY Escuela de Chofer en Baní: planes, pagos, clases, trámite de licencia y más.',
    image: '/images/og.jpg',
    priority: '0.3',
  },
]

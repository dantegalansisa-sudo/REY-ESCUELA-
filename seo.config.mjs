/**
 * CONFIGURACIÓN SEO — único lugar donde cambiar el dominio.
 * Al tener el dominio definitivo, cámbialo aquí (o define la variable de entorno SITE_URL en el hosting)
 * y vuelve a ejecutar `npm run build`: canonical, Open Graph, sitemap.xml, robots.txt y JSON-LD se actualizan solos.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://reyescueladechofer.com').replace(/\/+$/, '')

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
]

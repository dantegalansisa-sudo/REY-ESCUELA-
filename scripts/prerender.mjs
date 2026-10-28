/**
 * Post-build: renders every route to static HTML (so Google, WhatsApp, Facebook… read real content
 * and per-page metadata without running JS), then writes sitemap.xml (with video entries) and robots.txt.
 * Run by `npm run build` after the client and SSR bundles are built.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITE_URL, ROUTES } from '../seo.config.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const { render, SITE, FAQS, PLANS, VIDEOS, CEO } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

const abs = (p) => SITE_URL + p
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const isoDuration = (mmss) => {
  const [m, s] = mmss.split(':').map(Number)
  return `PT${m ? `${m}M` : ''}${s}S`
}
const price = (p) => p.price.replace(/[^\d]/g, '')
const today = new Date().toISOString().slice(0, 10)

/* ---------- structured data ---------- */
const business = {
  '@type': 'DrivingSchool',
  '@id': abs('/#escuela'),
  name: SITE.name,
  url: abs('/'),
  logo: abs('/images/logo.png'),
  image: [abs('/images/og.jpg'), abs('/images/nosotros-escuela-2.webp')],
  description: ROUTES[0].description,
  telephone: '+1-829-214-9737',
  priceRange: 'RD$11,990 - RD$22,990',
  currenciesAccepted: 'DOP',
  paymentAccepted: 'Efectivo, Transferencia',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Duvergé #41 Norte',
    addressLocality: 'Baní',
    addressRegion: 'Peravia',
    addressCountry: 'DO',
  },
  areaServed: { '@type': 'City', name: 'Baní' },
  hasMap: SITE.mapsDirections,
  openingHoursSpecification: [
    ['08:30', '12:00'],
    ['14:00', '18:30'],
  ].map(([opens, closes]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens,
    closes,
  })),
  employee: { '@type': 'Person', name: CEO.name, jobTitle: 'Director' },
  sameAs: [SITE.instagram, SITE.tiktok],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Planes de clases de manejo',
    url: abs('/planes'),
    itemListElement: PLANS.map((p) => ({
      '@type': 'Offer',
      name: `Plan ${p.name}`,
      description: p.features.filter((f) => f.included).map((f) => f.label).join(', '),
      price: price(p),
      priceCurrency: 'DOP',
      availability: 'https://schema.org/InStock',
      url: abs('/planes'),
    })),
  },
}

const faqPage = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

const videoObjects = VIDEOS.map((v) => ({
  '@type': 'VideoObject',
  name: v.title,
  description: v.text,
  thumbnailUrl: abs(v.poster),
  contentUrl: abs(v.src),
  uploadDate: v.uploadDate,
  duration: isoDuration(v.duration),
}))

const graph = {
  '/': [{ '@type': 'WebSite', '@id': abs('/#web'), url: abs('/'), name: SITE.name, inLanguage: 'es-DO' }, business, faqPage(FAQS), ...videoObjects],
  '/planes': [
    business,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: abs('/') },
        { '@type': 'ListItem', position: 2, name: 'Planes', item: abs('/planes') },
      ],
    },
    faqPage([FAQS[0], FAQS[2], FAQS[3]]),
  ],
}

const legalGraph = (r) => [
  { '@type': 'WebPage', name: r.title, url: abs(r.path), inLanguage: 'es-DO', isPartOf: { '@id': abs('/#web') } },
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: r.title.split(' | ')[0], item: abs(r.path) },
    ],
  },
]

/* ---------- HTML per route ---------- */
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

for (const r of ROUTES) {
  const url = abs(r.path === '/' ? '/' : r.path)
  const head = [
    `<meta name="description" content="${esc(r.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="geo.region" content="DO-17" />`,
    `<meta name="geo.placename" content="Baní" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_DO" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${abs(r.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SITE.name)}, escuela de manejo en Baní" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${abs(r.image)}" />`,
    r.preload ? `<link rel="preload" as="image" href="${r.preload}" fetchpriority="high" />` : '',
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph[r.path] ?? legalGraph(r) }).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace('<!--seo-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${render(r.path)}</div>`)

  for (const file of r.out) {
    const out = resolve(dist, file)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html)
  }
  console.log(`  prerendered ${r.path} → dist/${r.out.join(' + dist/')} (${(html.length / 1024).toFixed(1)} kB)`)
}

/* ---------- sitemap.xml (pages + video extension) & robots.txt ---------- */
const videoTags = VIDEOS.map(
  (v) => `
    <video:video>
      <video:thumbnail_loc>${abs(v.poster)}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(v.text)}</video:description>
      <video:content_loc>${abs(v.src)}</video:content_loc>
      <video:duration>${v.duration.split(':').reduce((m, s) => Number(m) * 60 + Number(s))}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`,
).join('')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${ROUTES.map(
  (r) => `  <url>
    <loc>${abs(r.path === '/' ? '/' : r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.priority}</priority>
    ${r.preload ? `<image:image><image:loc>${abs(r.preload)}</image:loc></image:image>` : ''}${r.path === '/' ? videoTags : ''}
  </url>`,
).join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`)
console.log(`  sitemap.xml + robots.txt → ${SITE_URL}`)

rmSync(ssrDir, { recursive: true, force: true })

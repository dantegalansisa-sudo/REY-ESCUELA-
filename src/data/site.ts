export const SITE = {
  name: 'REY Escuela de Chofer',
  phoneDisplay: '+1 (829) 214-9737',
  phoneTel: '+18292149737',
  whatsappNumber: '18292149737',
  instagram: 'https://www.instagram.com/rey_escuelade_manejo',
  tiktok: 'https://www.tiktok.com/@escueladechoferesrey',
  address: 'Calle Duvergé #41 Norte, Baní, República Dominicana',
  addressShort: 'Calle Duvergé #41 Norte, Baní',
  hours: ['Lunes a viernes', '8:30 AM a 12:00 PM', '2:00 PM a 6:30 PM'],
  payments: 'Efectivo y transferencia',
  mapsEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Calle Duvergé #41 Norte, Baní, República Dominicana') +
    '&output=embed',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('Calle Duvergé #41 Norte, Baní, República Dominicana'),
}

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}` + (text ? `?text=${encodeURIComponent(text)}` : '')

export const WA_DEFAULT = waLink('Hola, quiero información sobre las clases de manejo en REY Escuela de Chofer.')
export const WA_RESERVAR = waLink('Hola, quiero reservar una clase de manejo.')

/**
 * TEXTOS LEGALES — EDITABLE
 * Redactados según el funcionamiento real del sitio (el formulario abre WhatsApp, no se guardan datos en un servidor).
 * Recomendado: que un abogado los revise antes de publicar.
 */
export type LegalSection = { id: string; title: string; body: (string | string[])[] }
export type LegalDoc = { title: string; intro: string; updated: string; sections: LegalSection[] }

const UPDATED = '28 de octubre de 2026'

export const PRIVACY: LegalDoc = {
  title: 'Política de privacidad',
  updated: UPDATED,
  intro:
    'En REY Escuela de Chofer respetamos tu privacidad. Esta política explica qué datos personales recibimos a través de este sitio web y de nuestros canales de contacto, para qué los usamos y cuáles son tus derechos, conforme a la Ley No. 172-13 sobre Protección de Datos Personales de la República Dominicana.',
  sections: [
    {
      id: 'responsable',
      title: '1. Responsable del tratamiento',
      body: [
        'El responsable de tus datos es REY Escuela de Chofer, ubicada en Calle Duvergé #41 Norte, Baní, República Dominicana. Puedes contactarnos por WhatsApp o llamada al +1 (829) 214-9737.',
      ],
    },
    {
      id: 'datos',
      title: '2. Datos que recibimos',
      body: [
        'Solo recibimos los datos que tú decides compartir con nosotros:',
        [
          'Nombre, teléfono y mensaje, cuando usas el formulario de contacto. Al enviarlo, el formulario abre WhatsApp con tu mensaje listo; este sitio web no guarda esa información en ningún servidor.',
          'Los datos que nos envíes por WhatsApp, llamada o en persona para informarte o inscribirte en un plan (por ejemplo, nombre, cédula, edad y horario disponible).',
          'Los documentos necesarios para gestionar el trámite de tu licencia de conducir, cuando contratas ese servicio.',
        ],
      ],
    },
    {
      id: 'uso',
      title: '3. Para qué usamos tus datos',
      body: [
        [
          'Responder tus consultas y enviarte información sobre nuestros planes.',
          'Agendar, coordinar y dar seguimiento a tus clases.',
          'Gestionar el trámite de tu licencia de conducir ante las autoridades correspondientes, cuando lo solicitas.',
          'Cumplir con obligaciones legales y administrativas.',
        ],
        'No vendemos ni alquilamos tus datos personales, ni los usamos para fines distintos a los indicados.',
      ],
    },
    {
      id: 'terceros',
      title: '4. Servicios de terceros',
      body: [
        'Este sitio utiliza servicios externos que tienen sus propias políticas de privacidad:',
        [
          'WhatsApp (Meta), para la comunicación contigo.',
          'Google Maps, para mostrar nuestra ubicación. Al cargar el mapa, Google puede recopilar datos técnicos de tu navegación.',
          'Google Fonts, para mostrar las tipografías del sitio.',
          'Instagram y TikTok, cuando visitas nuestros perfiles desde los enlaces del sitio.',
        ],
        'Para gestionar trámites de licencia, compartimos con las autoridades competentes únicamente la información necesaria para dicho trámite.',
      ],
    },
    {
      id: 'cookies',
      title: '5. Cookies',
      body: [
        'Este sitio no utiliza cookies propias de publicidad ni de seguimiento. Algunos servicios de terceros incluidos en la página, como el mapa de Google, pueden instalar cookies técnicas. Puedes bloquearlas o eliminarlas desde la configuración de tu navegador.',
      ],
    },
    {
      id: 'conservacion',
      title: '6. Conservación y seguridad',
      body: [
        'Conservamos tus datos solo durante el tiempo necesario para prestarte el servicio y cumplir con nuestras obligaciones legales. Aplicamos medidas razonables para protegerlos contra pérdida, uso indebido o acceso no autorizado.',
      ],
    },
    {
      id: 'derechos',
      title: '7. Tus derechos',
      body: [
        'Puedes solicitar en cualquier momento el acceso, la rectificación, la actualización o la eliminación de tus datos personales, así como oponerte a su uso. Para ejercer estos derechos, escríbenos por WhatsApp al +1 (829) 214-9737 indicando tu solicitud.',
      ],
    },
    {
      id: 'menores',
      title: '8. Menores de edad',
      body: [
        'Si eres menor de edad, la inscripción y el envío de tus datos deben realizarse con la autorización de tu padre, madre o tutor.',
      ],
    },
    {
      id: 'cambios',
      title: '9. Cambios en esta política',
      body: [
        'Podemos actualizar esta política cuando sea necesario. La versión vigente siempre estará publicada en esta página, con su fecha de última actualización.',
      ],
    },
  ],
}

export const TERMS: LegalDoc = {
  title: 'Términos y condiciones',
  updated: UPDATED,
  intro:
    'Estos términos regulan el uso de este sitio web y la contratación de los servicios de REY Escuela de Chofer. Al usar el sitio o inscribirte en uno de nuestros planes, aceptas estas condiciones.',
  sections: [
    {
      id: 'servicios',
      title: '1. Servicios',
      body: [
        'REY Escuela de Chofer ofrece clases de manejo privadas, clases en simulador, práctica en ruta y parqueo, servicio a domicilio, máster clase de preparación para el examen y gestión del trámite de licencia de conducir, según el plan contratado. El detalle de cada plan está publicado en la página de Planes.',
      ],
    },
    {
      id: 'precios',
      title: '2. Precios y pagos',
      body: [
        [
          'Los precios están expresados en pesos dominicanos (RD$).',
          'Aceptamos pagos en efectivo y por transferencia bancaria.',
          'Los precios publicados pueden cambiar sin previo aviso. El precio válido es el confirmado por la escuela al momento de tu inscripción.',
          'El plan VIP Premium incluye los impuestos del trámite de licencia, según se indica en su descripción.',
        ],
      ],
    },
    {
      id: 'inscripcion',
      title: '3. Inscripción y clases',
      body: [
        [
          'La inscripción se coordina por WhatsApp, llamada o en nuestras instalaciones.',
          'Cada clase tiene una duración de 35 minutos. Las fechas y horarios se acuerdan con la escuela dentro de nuestro horario de atención.',
          'Las condiciones para reprogramar o cancelar una clase se te informarán al momento de inscribirte. Te pedimos avisar con anticipación si no puedes asistir.',
        ],
      ],
    },
    {
      id: 'responsabilidades',
      title: '4. Responsabilidades del estudiante',
      body: [
        [
          'Asistir puntual a sus clases y seguir en todo momento las indicaciones del instructor.',
          'Proporcionar información y documentos verdaderos y vigentes.',
          'No conducir bajo los efectos del alcohol, drogas o medicamentos que afecten su capacidad.',
          'Cuidar los vehículos y equipos de la escuela durante las clases.',
        ],
      ],
    },
    {
      id: 'licencia',
      title: '5. Trámite de licencia y examen',
      body: [
        'Gestionamos el trámite de tu licencia de conducir de acuerdo con los requisitos y procesos establecidos por el Instituto Nacional de Tránsito y Transporte Terrestre (INTRANT) y demás autoridades competentes. Los plazos de emisión dependen de dichas instituciones.',
        'Te preparamos para el examen, pero su aprobación depende del desempeño de cada estudiante; la escuela no puede garantizar el resultado.',
      ],
    },
    {
      id: 'sitio',
      title: '6. Uso del sitio web',
      body: [
        'La información de este sitio es orientativa y puede actualizarse en cualquier momento. Los textos, imágenes, videos, logotipos y diseño son propiedad de REY Escuela de Chofer o se usan con autorización, y no pueden reproducirse sin permiso.',
        'El sitio contiene enlaces a servicios de terceros (WhatsApp, Google Maps, Instagram, TikTok). No somos responsables del contenido ni de las políticas de esos servicios.',
      ],
    },
    {
      id: 'imagen',
      title: '7. Fotos y videos de estudiantes',
      body: [
        'Las fotos y videos de estudiantes publicados en este sitio y en nuestras redes se comparten con su autorización. Si apareces en alguno y deseas que lo retiremos, escríbenos por WhatsApp y lo eliminaremos.',
      ],
    },
    {
      id: 'ley',
      title: '8. Ley aplicable',
      body: [
        'Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se intentará resolver primero de forma amistosa a través de nuestros canales de contacto.',
      ],
    },
    {
      id: 'contacto',
      title: '9. Contacto',
      body: [
        'Para cualquier duda sobre estos términos, contáctanos por WhatsApp o llamada al +1 (829) 214-9737, o visítanos en Calle Duvergé #41 Norte, Baní.',
      ],
    },
  ],
}

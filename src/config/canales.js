/**
 * Canales de recepción de contenidos.
 *
 * `activo: false` marca los canales diseñados pero no habilitados: la
 * interfaz los muestra como «Canal pendiente de activación». Instagram,
 * Facebook y TikTok están así porque la política de protección de datos
 * y el registro de actividades de tratamiento todavía no los incluyen.
 *
 * `valor: null` con `pendiente` indica un dato que falta (por ejemplo, un
 * número de teléfono): el canal se describe, pero no se genera el enlace.
 */
export const CANALES = [
  {
    id: 'whatsapp',
    nombre: 'WhatsApp',
    activo: true,
    valor: null,
    pendiente: 'Número de WhatsApp del canal',
    enlace: (v) => `https://wa.me/${String(v).replace(/\D/g, '')}`,
    accion: 'Abrir WhatsApp',
    uso: 'Para cadenas, audios e imágenes que circulan por mensajería. Reenvía el mensaje tal cual, sin recortarlo.',
    nota: 'La respuesta automática muestra la información básica de protección de datos y te pide que escribas «ACEPTO» antes de continuar.',
  },
  {
    id: 'formulario',
    nombre: 'Formulario web',
    activo: true,
    valor: 'formulario',
    accion: 'Ir al formulario',
    uso: 'Para enlaces que necesitan contexto: dónde lo viste, cuándo y por qué te genera dudas.',
  },
  {
    id: 'telefono',
    nombre: 'Teléfono',
    activo: true,
    valor: null,
    pendiente: 'Teléfono del canal. Confirmar si es el general de ODESOCAN (621 267 948)',
    enlace: (v) => `tel:+34${String(v).replace(/\D/g, '')}`,
    accion: 'Llamar',
    uso: 'Si prefieres explicarlo de viva voz o no usas canales digitales.',
    nota: 'Al empezar la llamada se lee la información básica de protección de datos.',
  },
  {
    id: 'telegram',
    nombre: 'Telegram',
    activo: true,
    valor: null,
    pendiente: 'Usuario de Telegram del canal',
    enlace: (v) => `https://t.me/${String(v).replace(/^@/, '')}`,
    accion: 'Abrir Telegram',
    uso: 'Para mensajes, imágenes y enlaces que circulan por Telegram.',
  },
  {
    id: 'correo',
    nombre: 'Correo electrónico',
    activo: true,
    valor: 'info@odesocan.org',
    enlace: (v) => `mailto:${v}?subject=${encodeURIComponent('Odesocan Verifica: contenido para verificar')}`,
    accion: 'Escribir un correo',
    uso: 'Para documentos, varias capturas o contenidos largos.',
  },
  {
    id: 'instagram',
    nombre: 'Instagram',
    activo: false,
    valor: 'odesocan',
    enlace: (v) => `https://ig.me/m/${v}`,
    accion: 'Abrir Instagram',
    uso: 'Mediante mención o mensaje directo a @odesocan.',
  },
  {
    id: 'facebook',
    nombre: 'Facebook',
    activo: false,
    valor: 'OdesocanDerechosSociales',
    enlace: (v) => `https://m.me/${v}`,
    accion: 'Abrir Messenger',
    uso: 'Mediante mención o mensaje directo a la página de ODESOCAN.',
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    activo: false,
    valor: null,
    pendiente: 'Cuenta de TikTok de ODESOCAN',
    enlace: (v) => `https://www.tiktok.com/@${String(v).replace(/^@/, '')}`,
    accion: 'Abrir TikTok',
    uso: 'Mediante mención o mensaje directo.',
  },
];

export const canalPorId = (id) => CANALES.find((c) => c.id === id) ?? null;

/** Redes de ODESOCAN para el pie de página (se enlazan, no se incrustan). */
export const REDES = [
  { id: 'x', nombre: 'X', usuario: '@ODESOCAN', url: 'https://x.com/ODESOCAN' },
  { id: 'instagram', nombre: 'Instagram', usuario: '@odesocan', url: 'https://www.instagram.com/odesocan/' },
  { id: 'facebook', nombre: 'Facebook', usuario: 'OdesocanDerechosSociales', url: 'https://www.facebook.com/OdesocanDerechosSociales' },
  { id: 'tiktok', nombre: 'TikTok', usuario: null, url: null, pendiente: 'Cuenta de TikTok' },
];

/** Servicio de emergencias: siempre primero cuando hay riesgo inmediato. */
export const EMERGENCIAS = { numero: '112', enlace: 'tel:112' };

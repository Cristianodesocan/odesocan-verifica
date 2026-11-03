/**
 * Configuración general del sitio.
 *
 * Los valores `null` son datos pendientes: la interfaz los muestra con el
 * componente <Pendiente> y nunca inventa un sustituto. Todos están listados
 * en docs/decisiones.md con su ubicación.
 */
const env = import.meta.env ?? {};

export const SITIO = {
  nombre: 'Odesocan Verifica',
  // PENDIENTE: subdirectorio (https://odesocan.org/verifica) o subdominio
  // (https://verifica.odesocan.org). Mientras tanto, la URL del prototipo.
  URL_BASE: env.VITE_URL_BASE || null,
  URL_PROTOTIPO: 'https://cristianodesocan.github.io/odesocan-verifica/',
};

export const ENTIDAD = {
  nombre: 'Fundación Canaria Observatorio de Derechos Sociales de Canarias',
  siglas: 'ODESOCAN',
  cif: 'G75744482',
  domicilio: 'Calle Pérez Díaz, 56, 38380 La Victoria de Acentejo (Santa Cruz de Tenerife)',
  pais: 'España',
  forma_juridica: 'Fundación',
  entidad_fundadora: 'ACUFADE',
  registro: null, // PENDIENTE: nombre del registro de fundaciones
  numero_registro: null, // PENDIENTE
  web: 'https://odesocan.org',
  correo: 'info@odesocan.org',
};

export const URLS = {
  // Hoja de Google publicada como CSV con el registro de correcciones.
  // Mientras sea null se usa public/data/correcciones-ejemplo.csv.
  CORRECCIONES_CSV_URL: env.VITE_CORRECCIONES_CSV_URL || null,
  POLITICA_CORRECCIONES_URL: null, // PENDIENTE: documento completo
  POLITICA_DATOS_URL: null, // PENDIENTE
  METODOLOGIA_PDF_URL: null, // PENDIENTE: versión pública en PDF
  ESTATUTOS_PDF_URL: null, // PENDIENTE
  DIRECTRICES_INDEPENDENCIA_URL: null, // PENDIENTE
  CRITERIOS_LENGUAJE_URL: null, // PENDIENTE
  INFORMES_BALANCE_URL: null, // PENDIENTE
  CODIGO_EFCSN_URL: 'https://efcsn.com/code-of-standards/',
  // Formulario de quejas de la EFCSN (artículo 3.3.H). Solo se muestra
  // cuando ODESOCAN sea miembro verificado: ver EFCSN_MIEMBRO.
  EFCSN_QUEJAS_URL: null,
};

export const BANDERAS = {
  // Mientras sea false, el aviso de queja ante la EFCSN (artículo 3.3.H)
  // existe en el código pero no se muestra.
  EFCSN_MIEMBRO: false,
  // Inyecta el marcado ClaimReview en la página. Con datos de ejemplo debe
  // quedar apagado: se activa con VITE_CLAIMREVIEW=on.
  CLAIMREVIEW: env.VITE_CLAIMREVIEW === 'on',
  // Origen de los datos: 'json' (por defecto), 'csv' o 'supabase'.
  FUENTE: env.VITE_FUENTE || 'json',
};

/**
 * Fecha que el portal usa como «hoy» para los atajos de fecha mientras los
 * datos sean de ejemplo, para que los filtros sigan dando resultados aunque
 * el prototipo se consulte meses después. Con datos reales se usa la fecha
 * del sistema.
 */
export const FECHA_REFERENCIA_EJEMPLO = '2026-11-03';

/**
 * Registro de correcciones (artículo 3.3.E del Código EFCSN).
 *
 * Lee la hoja de Google publicada como CSV en CORRECCIONES_CSV_URL. Mientras
 * no esté configurada, usa public/data/correcciones-ejemplo.csv, generado a
 * partir de los datos de ejemplo.
 *
 * Aviso de privacidad: leer la hoja directamente desde el navegador hace que
 * cada visita contacte con los servidores de Google. En producción conviene
 * copiar el CSV al propio dominio (por ejemplo, con una tarea programada en
 * WordPress o en GitHub Actions). Ver docs/decisiones.md.
 */
import { URLS } from '../config/sitio.js';
import { leerCSV } from './csv.js';

const BASE = import.meta.env?.BASE_URL ?? '/';

/**
 * Nombre de cada columna en la hoja. Si la hoja definitiva usa otros
 * encabezados, basta con cambiarlos aquí.
 */
export const COLUMNAS = {
  fecha: 'fecha',
  id: 'id_verificacion',
  titular: 'titular',
  tipo: 'tipo',
  nota: 'nota',
  cambia: 'cambia_calificacion',
  anterior: 'calificacion_anterior',
  actual: 'calificacion_actual',
  pdf: 'version_original_pdf',
};

const siNo = (v) => /^(s[ií]|true|1|verdadero)$/i.test(String(v).trim());

export async function cargarCorrecciones() {
  const configurada = Boolean(URLS.CORRECCIONES_CSV_URL);
  const url = URLS.CORRECCIONES_CSV_URL ?? `${BASE}data/correcciones-ejemplo.csv`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`No se pudo leer el registro de correcciones (${r.status})`);
  const filas = leerCSV(await r.text()).map((f) => ({
    fecha: f[COLUMNAS.fecha],
    id: f[COLUMNAS.id],
    titular: f[COLUMNAS.titular],
    tipo: (f[COLUMNAS.tipo] || '').toLowerCase().startsWith('act') ? 'actualizacion' : 'correccion',
    nota: f[COLUMNAS.nota],
    cambia: siNo(f[COLUMNAS.cambia]),
    anterior: f[COLUMNAS.anterior] || null,
    actual: f[COLUMNAS.actual] || null,
    pdf: f[COLUMNAS.pdf] || null,
  }));
  filas.sort((a, b) => b.fecha.localeCompare(a.fecha));
  return { filas, origen: configurada ? 'hoja' : 'ejemplo' };
}

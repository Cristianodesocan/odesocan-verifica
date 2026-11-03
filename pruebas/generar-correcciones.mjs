/**
 * Genera public/data/correcciones-ejemplo.csv a partir de las correcciones
 * de public/data/verificaciones.json, con las mismas columnas que se esperan
 * en la hoja de Google publicada (ver src/data/correcciones.js, COLUMNAS).
 *
 * Uso: node pruebas/generar-correcciones.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const raiz = new URL('../public/data/', import.meta.url);
const { verificaciones } = JSON.parse(readFileSync(new URL('verificaciones.json', raiz), 'utf8'));
const campo = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const cabecera = ['fecha', 'id_verificacion', 'titular', 'tipo', 'nota', 'cambia_calificacion', 'calificacion_anterior', 'calificacion_actual', 'version_original_pdf'];
const filas = [];
for (const v of verificaciones) {
  for (const c of v.correcciones ?? []) {
    filas.push([
      c.fecha,
      v.id,
      v.titular,
      c.tipo === 'actualizacion' ? 'Actualización' : 'Corrección',
      c.nota,
      c.cambia_calificacion ? 'sí' : 'no',
      c.calificacion_anterior?.etiqueta ?? '',
      v.calificacion.etiqueta,
      c.version_original_pdf ?? '',
    ]);
  }
}
filas.sort((a, b) => b[0].localeCompare(a[0]));
const csv = [cabecera, ...filas].map((f) => f.map(campo).join(',')).join('\n') + '\n';
writeFileSync(new URL('correcciones-ejemplo.csv', raiz), csv);
console.log(`${filas.length} correcciones escritas en public/data/correcciones-ejemplo.csv`);

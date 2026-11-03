/**
 * Valida public/data/verificaciones.json contra el contrato de datos
 * (apartado 11 del encargo) y contra los criterios de lenguaje del servicio.
 *
 * Uso: npm run validar:datos
 * Sale con código 1 si hay errores; los avisos no bloquean.
 */
import { readFileSync } from 'node:fs';
import { MATERIAS } from '../src/config/materias.js';
import { ISLAS, AMBITOS } from '../src/config/islas.js';
import { ESCALA } from '../src/config/escala.js';

const ruta = new URL('../public/data/verificaciones.json', import.meta.url);
const datos = JSON.parse(readFileSync(ruta, 'utf8'));
const lista = Array.isArray(datos) ? datos : datos.verificaciones;

const errores = [];
const avisos = [];
const err = (id, msg) => errores.push(`${id}: ${msg}`);
const aviso = (id, msg) => avisos.push(`${id}: ${msg}`);

const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const VIAS = ['influenciabilidad', 'viralidad', 'peligrosidad'];
const CAMPOS = [
  'id', 'ejemplo', 'titular', 'resumen', 'calificacion', 'afirmacion', 'materia',
  'isla', 'ambito', 'fecha_publicacion', 'via_entrada', 'por_que', 'evidencia',
  'fuentes', 'metodo', 'conflictos', 'replica', 'correcciones', 'emergencia',
];
// Campos internos que nunca pueden aparecer en los datos públicos.
const PROHIBIDOS = ['revisor', 'revisora', 'autor', 'autora', 'equipo', 'reportante',
  'contacto', 'email', 'telefono', 'adscripcion', 'partido', 'descartadas', 'nombre'];

if (!Array.isArray(lista)) {
  console.error('El archivo no contiene una lista de verificaciones');
  process.exit(1);
}
if (lista.length < 24 || lista.length > 36) {
  errores.push(`Hay ${lista.length} verificaciones; el encargo pide entre 24 y 36`);
}

const ids = new Set();
const textos = [];

const recorrer = (obj, id, camino = '') => {
  if (typeof obj === 'string') {
    textos.push({ id, camino, texto: obj });
    return;
  }
  if (Array.isArray(obj)) return obj.forEach((v, i) => recorrer(v, id, `${camino}[${i}]`));
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (PROHIBIDOS.includes(k.toLowerCase())) err(id, `campo interno no permitido: ${camino}.${k}`);
      recorrer(v, id, camino ? `${camino}.${k}` : k);
    }
  }
};

for (const v of lista) {
  const id = v.id ?? '(sin id)';
  for (const c of CAMPOS) if (!(c in v)) err(id, `falta el campo ${c}`);
  if (!/^OV-\d{4}-\d{4}$/.test(v.id)) err(id, 'el identificador no sigue el formato OV-AAAA-NNNN');
  if (ids.has(v.id)) err(id, 'identificador duplicado');
  ids.add(v.id);
  if (v.ejemplo !== true) err(id, 'falta "ejemplo": true');

  const cat = ESCALA.find((c) => c.valor === v.calificacion?.valor);
  if (!cat) err(id, 'calificación fuera de la escala');
  else if (cat.etiqueta !== v.calificacion.etiqueta) err(id, `la etiqueta no corresponde al valor ${cat.valor}`);

  if (!MATERIAS.some((m) => m.etiqueta === v.materia)) err(id, `materia desconocida: ${v.materia}`);
  if (!ISLAS.some((i) => i.etiqueta === v.isla)) err(id, `isla desconocida: ${v.isla}`);
  if (!AMBITOS.includes(v.ambito)) err(id, `ámbito desconocido: ${v.ambito}`);
  if (v.isla === 'Canarias' && v.ambito !== 'Autonómico') aviso(id, 'isla Canarias con ámbito no autonómico');

  if (!FECHA.test(v.fecha_publicacion)) err(id, 'fecha_publicacion no es AAAA-MM-DD');
  if (!FECHA.test(v.afirmacion?.fecha)) err(id, 'afirmacion.fecha no es AAAA-MM-DD');
  if (v.afirmacion?.fecha > v.fecha_publicacion) err(id, 'la afirmación es posterior a la publicación');
  if (!v.id.startsWith(`OV-${v.fecha_publicacion.slice(0, 4)}-`)) aviso(id, 'el año del identificador no coincide con el de publicación');
  for (const k of ['texto', 'tipo_emisora', 'fecha', 'canal', 'enlace_archivado']) {
    if (!(k in (v.afirmacion ?? {}))) err(id, `falta afirmacion.${k}`);
  }

  if (!Array.isArray(v.via_entrada) || !v.via_entrada.length) err(id, 'via_entrada vacía');
  else for (const via of v.via_entrada) if (!VIAS.includes(via)) err(id, `vía de entrada desconocida: ${via}`);
  if (v.emergencia && !v.via_entrada?.includes('peligrosidad')) aviso(id, 'emergencia sin vía de peligrosidad');

  if (!Array.isArray(v.evidencia?.a_favor) || !Array.isArray(v.evidencia?.en_contra)) err(id, 'evidencia mal formada');
  if (!Array.isArray(v.fuentes) || v.fuentes.length < 2) err(id, 'menos de dos fuentes');
  for (const f of v.fuentes ?? []) {
    if (!['primaria', 'secundaria'].includes(f.tipo)) err(id, `tipo de fuente desconocido: ${f.tipo}`);
    if (!FECHA.test(f.fecha_consulta)) err(id, 'fecha_consulta mal formada');
    if (f.fecha_consulta > v.fecha_publicacion) err(id, 'fuente consultada después de publicar');
    if (!String(f.url).startsWith('https://example.org/')) err(id, `la URL de ejemplo debe apuntar a example.org: ${f.url}`);
  }
  if (!(v.fuentes ?? []).some((f) => f.tipo === 'primaria')) aviso(id, 'ninguna fuente primaria');
  for (const k of ['indicador', 'definicion', 'serie', 'codigo_url']) if (!(k in (v.metodo ?? {}))) err(id, `falta metodo.${k}`);
  if (typeof v.replica?.ofrecida !== 'boolean') err(id, 'replica.ofrecida debe ser booleano');
  for (const c of v.correcciones ?? []) {
    if (!['correccion', 'actualizacion'].includes(c.tipo)) err(id, `tipo de corrección desconocido: ${c.tipo}`);
    if (c.fecha < v.fecha_publicacion) err(id, 'corrección anterior a la publicación');
    if (typeof c.cambia_calificacion !== 'boolean') err(id, 'cambia_calificacion debe ser booleano');
  }

  // Titulares: contienen el dato verificado y no repiten la afirmación.
  if (/[«»"“”?¿]/.test(v.titular)) err(id, 'el titular no puede llevar comillas ni forma de pregunta');
  if (!/\d/.test(v.titular)) aviso(id, 'el titular no contiene ninguna cifra');

  recorrer(v, id);
}

// Criterios de lenguaje sobre todos los textos.
for (const { id, camino, texto } of textos) {
  if (camino.endsWith('url') || camino.endsWith('enlace_archivado') || camino.endsWith('pdf')) continue;
  if (/[—–]/.test(texto)) err(id, `${camino}: raya o guion medio como puntuación`);
  if (/\d%/.test(texto)) err(id, `${camino}: falta el espacio antes de %`);
  if (/\d\.\d{1,2}\s?%/.test(texto)) err(id, `${camino}: decimal con punto en un porcentaje`);
  if (/\b\d+,\d+(?!\s?(%|puntos|euros|millones|años|meses|días|horas|personas|por|veces|€|m|km|grados))/.test(texto)) {
    // Decimales sin unidad: solo aviso.
  }
  if (/fact[- ]?check/i.test(texto)) err(id, `${camino}: anglicismo fact-checking`);
  if (/\b(miente|mintió|mentira|bulo de|manipul[aó] a)\b/i.test(texto)) err(id, `${camino}: verbo que atribuye intenciones`);
  if (/@\w/.test(texto)) err(id, `${camino}: parece una cuenta real (@)`);
  if (/\b(PSOE|PP|Vox|Coalición Canaria|Nueva Canarias|Podemos|Sumar|CC|NC|ASG)\b/.test(texto)) err(id, `${camino}: menciona un partido`);
}

// Distribuciones para probar gráficos y filtros.
const cuenta = (f) => lista.reduce((m, v) => ((m[f(v)] = (m[f(v)] ?? 0) + 1), m), {});
const porCal = cuenta((v) => v.calificacion?.etiqueta);
const porMat = cuenta((v) => v.materia);
const porIsla = cuenta((v) => v.isla);
for (const c of ESCALA) if (!porCal[c.etiqueta]) err('distribución', `ninguna verificación ${c.etiqueta}`);
for (const m of MATERIAS) if (!porMat[m.etiqueta]) aviso('distribución', `ninguna verificación de ${m.etiqueta}`);
for (const i of ISLAS) if (!porIsla[i.etiqueta]) aviso('distribución', `ninguna verificación en ${i.etiqueta}`);

console.log(`Verificaciones: ${lista.length}`);
console.log('Por calificación:', porCal);
console.log('Por materia:', porMat);
console.log('Por isla:', porIsla);
console.log('Con corrección:', lista.filter((v) => v.correcciones?.length).length,
  '· emergencia:', lista.filter((v) => v.emergencia).length);
const fechas = lista.map((v) => v.fecha_publicacion).sort();
console.log('Fechas:', fechas[0], 'a', fechas.at(-1));

if (avisos.length) console.log(`\nAvisos (${avisos.length}):\n  ${avisos.join('\n  ')}`);
if (errores.length) {
  console.error(`\nErrores (${errores.length}):\n  ${errores.join('\n  ')}`);
  process.exit(1);
}
console.log('\nSin errores.');

/**
 * Adaptador de datos de Odesocan Verifica.
 *
 * Toda la lectura de verificaciones pasa por aquí. Los componentes solo
 * conocen cargarVerificaciones() y cargarVerificacion(id), así que el JSON
 * de ejemplo puede sustituirse por un CSV publicado de Google Sheets o por
 * una consulta a Supabase cambiando VITE_FUENTE, sin tocar la interfaz.
 *
 *   VITE_FUENTE=json      public/data/verificaciones.json (por defecto)
 *   VITE_FUENTE=csv       VITE_VERIFICACIONES_CSV_URL (columnas con punto,
 *                         por ejemplo «afirmacion.texto»; listas en JSON)
 *   VITE_FUENTE=supabase  VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY, sobre
 *                         una vista pública «verificaciones_publicas»
 */
import { BANDERAS } from '../config/sitio.js';
import { leerCSV, desaplanar } from './csv.js';

const env = import.meta.env ?? {};
const BASE = env.BASE_URL ?? '/';

/**
 * Campos que pueden llegar a la interfaz. Cualquier otro (nombres del
 * equipo, personas revisoras, datos de quien reporta, candidatas
 * descartadas, adscripción política) se elimina aquí aunque la fuente lo
 * traiga por error.
 */
const CAMPOS_PUBLICOS = [
  'id', 'ejemplo', 'titular', 'resumen', 'calificacion', 'afirmacion', 'materia', 'isla',
  'ambito', 'fecha_publicacion', 'via_entrada', 'por_que', 'evidencia', 'fuentes', 'metodo',
  'conflictos', 'replica', 'correcciones', 'emergencia',
];

const adaptadores = {
  async json() {
    const r = await fetch(`${BASE}data/verificaciones.json`);
    if (!r.ok) throw new Error(`No se pudo leer verificaciones.json (${r.status})`);
    const d = await r.json();
    return Array.isArray(d)
      ? { verificaciones: d, meta: {} }
      : { verificaciones: d.verificaciones ?? [], meta: { aviso: d.aviso, generado: d.generado } };
  },

  async csv() {
    const url = env.VITE_VERIFICACIONES_CSV_URL;
    if (!url) throw new Error('Falta VITE_VERIFICACIONES_CSV_URL');
    const r = await fetch(url);
    if (!r.ok) throw new Error(`No se pudo leer el CSV de verificaciones (${r.status})`);
    return { verificaciones: leerCSV(await r.text()).map(desaplanar), meta: {} };
  },

  async supabase() {
    const url = env.VITE_SUPABASE_URL;
    const clave = env.VITE_SUPABASE_ANON_KEY;
    if (!url || !clave) throw new Error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
    // La vista debe exponer solo los campos públicos y estar protegida con RLS.
    const r = await fetch(`${url}/rest/v1/verificaciones_publicas?select=*&order=fecha_publicacion.desc`, {
      headers: { apikey: clave, Authorization: `Bearer ${clave}` },
    });
    if (!r.ok) throw new Error(`Supabase respondió ${r.status}`);
    return { verificaciones: await r.json(), meta: {} };
  },
};

function limpiar(v) {
  const salida = {};
  for (const c of CAMPOS_PUBLICOS) if (c in v) salida[c] = v[c];
  salida.via_entrada ??= [];
  salida.correcciones ??= [];
  salida.fuentes ??= [];
  salida.evidencia ??= { a_favor: [], en_contra: [] };
  return salida;
}

let promesa = null;

export function cargarVerificaciones() {
  if (!promesa) {
    const adaptador = adaptadores[BANDERAS.FUENTE] ?? adaptadores.json;
    promesa = adaptador()
      .then(({ verificaciones, meta }) => {
        const lista = verificaciones
          .map(limpiar)
          .sort((a, b) => b.fecha_publicacion.localeCompare(a.fecha_publicacion) || b.id.localeCompare(a.id));
        return {
          verificaciones: lista,
          meta: { ...meta, ejemplo: lista.length > 0 && lista.every((v) => v.ejemplo) },
        };
      })
      .catch((e) => {
        promesa = null;
        throw e;
      });
  }
  return promesa;
}

export async function cargarVerificacion(id) {
  const { verificaciones } = await cargarVerificaciones();
  return verificaciones.find((v) => v.id === id) ?? null;
}

/**
 * Estado de los filtros del explorador. Vive en la URL para que cualquier
 * vista se pueda compartir: #/portal?periodo=trimestre&cal=falso,enganoso&tema=vivienda&q=alquiler
 */
import { ESCALA } from '../../config/escala.js';
import { MATERIAS, materiaPorEtiqueta } from '../../config/materias.js';
import { sumarMeses } from '../../data/formato.js';

export const PERIODOS = [
  { id: 'mes', etiqueta: 'Último mes', meses: 1 },
  { id: 'trimestre', etiqueta: 'Últimos tres meses', meses: 3 },
  { id: 'anio', etiqueta: 'Último año', meses: 12 },
  { id: 'todo', etiqueta: 'Todo', meses: null },
  { id: 'rango', etiqueta: 'Fechas concretas', meses: null },
];

const lista = (v) => (v ? v.split(',').filter(Boolean) : []);
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export function leerFiltros(params) {
  const periodo = PERIODOS.some((p) => p.id === params.get('periodo')) ? params.get('periodo') : 'todo';
  return {
    periodo,
    desde: FECHA.test(params.get('desde') ?? '') ? params.get('desde') : '',
    hasta: FECHA.test(params.get('hasta') ?? '') ? params.get('hasta') : '',
    cal: lista(params.get('cal')).filter((c) => ESCALA.some((e) => e.clave === c)),
    tema: lista(params.get('tema')).filter((t) => MATERIAS.some((m) => m.id === t)),
    q: params.get('q') ?? '',
  };
}

export function escribirFiltros(f) {
  const p = new URLSearchParams();
  if (f.periodo && f.periodo !== 'todo') p.set('periodo', f.periodo);
  if (f.periodo === 'rango') {
    if (f.desde) p.set('desde', f.desde);
    if (f.hasta) p.set('hasta', f.hasta);
  }
  if (f.cal?.length) p.set('cal', f.cal.join(','));
  if (f.tema?.length) p.set('tema', f.tema.join(','));
  if (f.q?.trim()) p.set('q', f.q.trim());
  return p;
}

/** Filtros activos por dimensión, en el orden de las marcas de la mira: norte, este, sur, oeste. */
export const dimensionesActivas = (f) => [
  f.periodo !== 'todo' && !(f.periodo === 'rango' && !f.desde && !f.hasta),
  f.cal.length > 0,
  f.tema.length > 0,
  f.q.trim() !== '',
];

export const NOMBRES_DIMENSIONES = ['fecha', 'calificación', 'temática', 'búsqueda'];

const normalizar = (t) =>
  String(t ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export function intervalo(f, hoy) {
  const periodo = PERIODOS.find((p) => p.id === f.periodo);
  if (periodo?.meses) return { desde: sumarMeses(hoy, -periodo.meses), hasta: hoy };
  if (f.periodo === 'rango') return { desde: f.desde || null, hasta: f.hasta || null };
  return { desde: null, hasta: null };
}

export function aplicarFiltros(verificaciones, f, hoy) {
  const { desde, hasta } = intervalo(f, hoy);
  const q = normalizar(f.q.trim());
  return verificaciones.filter((v) => {
    if (desde && v.fecha_publicacion < desde) return false;
    if (hasta && v.fecha_publicacion > hasta) return false;
    if (f.cal.length) {
      const clave = ESCALA.find((e) => e.valor === v.calificacion?.valor)?.clave;
      if (!f.cal.includes(clave)) return false;
    }
    if (f.tema.length && !f.tema.includes(materiaPorEtiqueta(v.materia)?.id)) return false;
    if (q) {
      const texto = normalizar(
        [v.id, v.titular, v.resumen, v.afirmacion?.texto, v.afirmacion?.tipo_emisora, v.materia, v.isla].join(' '),
      );
      if (!q.split(/\s+/).every((palabra) => texto.includes(palabra))) return false;
    }
    return true;
  });
}

export const FILTROS_VACIOS = { periodo: 'todo', desde: '', hasta: '', cal: [], tema: [], q: '' };

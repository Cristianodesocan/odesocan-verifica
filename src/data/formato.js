/**
 * Formato de fechas y cifras conforme a los criterios de lenguaje:
 * coma decimal, punto como separador de miles y espacio antes de %.
 */
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

const partes = (iso) => {
  const [a, m, d] = String(iso).slice(0, 10).split('-').map(Number);
  return { a, m, d };
};

export const fechaLarga = (iso) => {
  if (!iso) return '';
  const { a, m, d } = partes(iso);
  return `${d} de ${MESES[m - 1]} de ${a}`;
};

export const fechaCorta = (iso) => {
  if (!iso) return '';
  const { a, m, d } = partes(iso);
  return `${d} ${MESES_CORTOS[m - 1]} ${a}`;
};

export const mesAnio = (clave) => {
  const [a, m] = clave.split('-').map(Number);
  return `${MESES[m - 1]} de ${a}`;
};

export const mesCorto = (clave) => {
  const [a, m] = clave.split('-').map(Number);
  return `${MESES_CORTOS[m - 1]} ${String(a).slice(2)}`;
};

/** 8240 → «8.240»; 2,5 → «2,5». */
export const numero = (n, decimales = 0) => {
  const fijo = Number(n).toFixed(decimales);
  const [entero, dec] = fijo.split('.');
  const conMiles = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return dec ? `${conMiles},${dec}` : conMiles;
};

/** 26,666 → «26,7 %», con espacio de no separación para que el % no quede solo al final de una línea. */
export const porcentaje = (n, decimales = 1) => `${numero(n, decimales)}\u00a0%`;

/** Fecha ISO de hoy en la zona horaria local. */
export const hoyISO = () => {
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/** Suma (o resta) meses a una fecha ISO. */
export const sumarMeses = (iso, meses) => {
  const { a, m, d } = partes(iso);
  const f = new Date(Date.UTC(a, m - 1 + meses, d));
  return f.toISOString().slice(0, 10);
};

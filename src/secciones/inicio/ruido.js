/**
 * Composición del ruido del hero y de las referencias que la mira enfoca.
 *
 * Regla de fondo: el ruido nunca se lee completo. Son formas (barras con la
 * proporción de una línea de texto, rectángulos con la de una imagen,
 * círculos con la de un avatar) desenfocadas, sin un solo carácter. Lo que
 * se lee nítido dentro de la mira son los elementos que sostienen una
 * verificación: tipo de fuente, organismo, fecha de consulta, serie, huella.
 * Ningún bulo, ni real ni inventado, aparece aquí.
 */

/** Referencias nítidas: tipos de evidencia, no afirmaciones. */
export const REFERENCIAS = [
  ['Fuente primaria', 'ISTAC', 'consulta 13 oct 2026'],
  ['Serie mensual', '2019-2026', 'misma definición'],
  ['Segunda fuente', 'INE', 'EPA, tercer trimestre'],
  ['Archivo público', 'web.archive.org', 'captura 12 oct 2026'],
  ['Huella SHA-256', '9f2c 41ab 7d03', 'sin modificar'],
  ['Normativa', 'BOC', 'consulta 2 oct 2026'],
  ['Réplica', 'solicitada', 'plazo de 48 horas'],
  ['Expediente', 'OV-2026-0000', 'fase 3 de 9'],
  ['Evidencia', 'a favor y en contra', 'antes de calificar'],
  ['Fuente primaria', 'IMSERSO', 'datos a 30 sep 2026'],
  ['Código', 'análisis replicable', 'enlazado en la ficha'],
  ['Persona experta', 'credenciales', 'conflictos declarados'],
];

/** Generador pseudoaleatorio determinista (mulberry32): mismo ruido en cada visita. */
function azar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Publicaciones del ruido en coordenadas relativas (0 a 1) a la capa.
 * Cada una lleva una referencia que aparece nítida al pasar la mira.
 *
 * @param {'ancho'|'estrecho'} formato  Rejilla de escritorio o columna de móvil.
 */
export function componerRuido(formato) {
  const r = azar(formato === 'ancho' ? 20261129 : 20261103);
  const publicaciones = [];
  const fragmentos = [];

  if (formato === 'ancho') {
    const columnas = 5;
    const filas = 3;
    let n = 0;
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        publicaciones.push({
          x: (c + 0.5) / columnas + (r() - 0.5) * 0.07,
          y: (f + 0.5) / filas + (r() - 0.5) * 0.12,
          tipo: r() < 0.35 ? 'imagen' : 'texto',
          lineas: 3 + Math.floor(r() * 3),
          referencia: REFERENCIAS[n++ % REFERENCIAS.length],
        });
      }
    }
    for (let i = 0; i < 46; i++) {
      fragmentos.push({ x: r(), y: r(), ancho: 30 + r() * 120, alto: 6 + Math.round(r()) * 3 });
    }
  } else {
    // En móvil, una columna centrada que pasa por debajo de la mira fija.
    // La separación es mayor que el diámetro de la mira, para que dentro
    // de ella se lea una sola referencia cada vez.
    const total = 6;
    for (let i = 0; i < total; i++) {
      publicaciones.push({
        x: 0.5,
        y: (i + 0.5) / total,
        tipo: i % 3 === 1 ? 'imagen' : 'texto',
        lineas: 3 + Math.floor(r() * 2),
        referencia: REFERENCIAS[(i * 2) % REFERENCIAS.length],
      });
    }
    for (let i = 0; i < 40; i++) {
      const lado = r() < 0.5 ? r() * 0.22 : 0.78 + r() * 0.22;
      fragmentos.push({ x: lado, y: r(), ancho: 24 + r() * 70, alto: 6 + Math.round(r()) * 3 });
    }
  }

  return { publicaciones, fragmentos };
}

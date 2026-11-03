/**
 * Temáticas iniciales del servicio.
 *
 * PENDIENTE: sustituir por la lista definitiva del registro maestro.
 * El texto de `etiqueta` es el que aparece en los datos (campo `materia`)
 * y en la interfaz; `id` es el que se usa en la URL de los filtros.
 */
export const MATERIAS = [
  { id: 'vivienda', etiqueta: 'Vivienda' },
  { id: 'dependencia', etiqueta: 'Dependencia' },
  { id: 'sanidad', etiqueta: 'Sanidad' },
  { id: 'educacion', etiqueta: 'Educación' },
  { id: 'empleo', etiqueta: 'Empleo' },
  { id: 'pobreza-exclusion', etiqueta: 'Pobreza y exclusión' },
  { id: 'igualdad', etiqueta: 'Igualdad' },
  { id: 'servicios-sociales', etiqueta: 'Servicios sociales' },
  { id: 'migraciones', etiqueta: 'Migraciones' },
  { id: 'medio-ambiente', etiqueta: 'Medio ambiente' },
];

export const materiaPorEtiqueta = (etiqueta) =>
  MATERIAS.find((m) => m.etiqueta === etiqueta) ?? null;

export const materiaPorId = (id) => MATERIAS.find((m) => m.id === id) ?? null;

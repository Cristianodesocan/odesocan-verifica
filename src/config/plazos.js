/**
 * Plazos de la metodología y de la primera capa de protección de datos.
 *
 * Los que llevan `pendiente: true` están pendientes de validar por el equipo
 * y la interfaz los muestra con la marca «[plazo pendiente de validar]».
 * Cuando se validen, basta con cambiar `pendiente` a false.
 */
export const PLAZOS = {
  dictamen_revision: {
    nombre: 'Dictamen de la revisión editorial',
    texto: '24 horas laborables',
    pendiente: true,
  },
  subsanacion: {
    nombre: 'Subsanación tras una devolución',
    texto: '24 horas, más 24 horas para el nuevo dictamen',
    pendiente: true,
  },
  segunda_revision: {
    nombre: 'Segunda revisión',
    texto: '24 horas para solicitarla, más 24 horas para el dictamen definitivo',
    pendiente: true,
  },
  suspension_maxima: {
    nombre: 'Suspensión máxima',
    texto: '5 días laborables',
    pendiente: true,
  },
  revision_urgente: {
    nombre: 'Revisión por la vía urgente',
    texto: null,
    pendiente: true,
    // La metodología fija 4 horas y el protocolo de emergencia, 12.
    discrepancia: 'La metodología fija 4 horas y el protocolo de emergencia, 12 horas.',
  },
  replica: {
    nombre: 'Plazo de réplica de las partes',
    texto: '48 horas',
    pendiente: false,
  },
  recorrido_emergencia: {
    nombre: 'Recorrido máximo por la vía urgente',
    texto: 'unas 20 horas, sin devoluciones',
    pendiente: false,
  },
};

export const CONSERVACION = {
  contenido_no_verificado: {
    nombre: 'Contenidos que no se verifican',
    texto: '90 días',
    pendiente: true,
  },
  datos_contacto: {
    nombre: 'Datos de contacto',
    texto: '6 meses desde la respuesta',
    pendiente: true,
  },
};

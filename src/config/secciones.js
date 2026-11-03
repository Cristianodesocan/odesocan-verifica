/**
 * Arquitectura de la información: las cuatro secciones principales y la
 * capa transversal de Transparencia.
 */
export const SECCIONES = [
  {
    id: 'que-es',
    numero: 1,
    ruta: '/que-es-verificar',
    titulo: 'Qué es verificar',
    corto: 'Qué es',
    descripcion:
      'Qué hace un servicio de verificación, qué normas sigue y por qué ODESOCAN lo separa de su incidencia política.',
  },
  {
    id: 'metodologia',
    numero: 2,
    ruta: '/metodologia',
    titulo: 'Metodología',
    corto: 'Método',
    descripcion: 'Las nueve fases por las que pasa cada pieza y la escala con la que se califica.',
  },
  {
    id: 'envia',
    numero: 3,
    ruta: '/envia',
    titulo: 'Envía un contenido',
    corto: 'Enviar',
    descripcion: 'Qué se puede verificar, por qué canal llega antes y qué pasa después de enviarlo.',
  },
  {
    id: 'portal',
    numero: 4,
    ruta: '/portal',
    titulo: 'Portal de verificaciones',
    corto: 'Portal',
    descripcion: 'Todas las verificaciones publicadas, sus fuentes, sus indicadores y las correcciones.',
  },
];

export const TRANSPARENCIA = {
  ruta: '/transparencia',
  titulo: 'Transparencia',
  apartados: [
    { id: 'quienes-somos', titulo: 'Quiénes somos y control editorial' },
    { id: 'titularidad', titulo: 'Titularidad y estatuto jurídico' },
    { id: 'gobernanza', titulo: 'Gobernanza y estatutos' },
    { id: 'financiacion', titulo: 'Financiación' },
    { id: 'independencia', titulo: 'Independencia y no partidismo' },
    { id: 'correcciones', titulo: 'Política de correcciones' },
    { id: 'datos', titulo: 'Protección de datos' },
  ],
};

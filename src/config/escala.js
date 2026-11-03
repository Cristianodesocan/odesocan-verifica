/**
 * Escala de calificación de Odesocan Verifica.
 *
 * El juicio recae siempre sobre la afirmación y nunca sobre la persona.
 * `forma` indica qué estado de la mira representa cada categoría
 * (ver src/componentes/GlifoEscala.jsx), para que el color nunca sea
 * el único portador del significado.
 */
export const ESCALA = [
  {
    valor: 1,
    clave: 'falso',
    etiqueta: 'Falso',
    forma: 'tachada',
    lectura: 'La mira tachada: lo afirmado no se corresponde con los datos.',
    definicion:
      'La afirmación o el contenido no se corresponden con los datos disponibles. Incluye las imágenes generadas con inteligencia artificial y las atribuidas a hechos ajenos.',
  },
  {
    valor: 2,
    clave: 'enganoso',
    etiqueta: 'Engañoso',
    forma: 'desplazada',
    lectura: 'El punto desplazado: los datos se han movido de sitio.',
    definicion:
      'La afirmación mezcla datos correctos con elementos falsos que cambian su sentido.',
  },
  {
    valor: 3,
    clave: 'contexto',
    etiqueta: 'Contexto',
    forma: 'abierta',
    lectura: 'El anillo abierto: falta una parte para entender el dato.',
    definicion:
      'Los datos pueden ser correctos, pero falta información necesaria para entender la afirmación o el asunto sigue abierto.',
  },
  {
    valor: 4,
    clave: 'verdadero',
    etiqueta: 'Verdadero',
    forma: 'completa',
    lectura: 'La mira completa: la afirmación encaja con los datos.',
    definicion:
      'La afirmación es rigurosa y completa, sin que le falten datos ni contexto.',
  },
];

export const categoriaPorValor = (valor) =>
  ESCALA.find((c) => c.valor === Number(valor)) ?? null;

/**
 * Preguntas de decisión, en orden: la primera respuesta afirmativa
 * decide la categoría.
 */
export const PREGUNTAS_DECISION = [
  {
    pregunta:
      '¿La evidencia contradice la afirmación central, o la imagen o el vídeo son falsos o están fuera de contexto?',
    valor: 1,
  },
  {
    pregunta:
      '¿La afirmación mezcla datos correctos con elementos falsos que cambian su sentido?',
    valor: 2,
  },
  {
    pregunta:
      '¿Los datos son correctos, pero falta información necesaria o el asunto sigue abierto?',
    valor: 3,
  },
  { pregunta: '¿La afirmación es exacta y completa?', valor: 4 },
];

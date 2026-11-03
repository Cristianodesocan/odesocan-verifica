/**
 * Contenido de «Envía un contenido». Borrador pendiente de revisión.
 *
 * Los enunciados de «¿Esto se puede verificar?» son genéricos: no citan a
 * personas reales ni tocan temas que puedan reforzar estigmas.
 */
export const ENUNCIADOS = [
  {
    texto: 'La lista de espera se ha reducido un 20 % este año.',
    verificable: true,
    explicacion: 'Es una cifra con un periodo concreto, así que se puede contrastar con la estadística oficial de listas de espera.',
  },
  {
    texto: 'Nuestro modelo es el mejor de Europa.',
    verificable: false,
    explicacion: 'Es una valoración: no existe un dato que diga qué modelo es «el mejor». Sí se podrían verificar las cifras en las que se apoye.',
  },
  {
    texto: 'El año que viene construiremos 5.000 viviendas.',
    verificable: false,
    explicacion: 'Es una promesa sobre el futuro y todavía no hay un hecho que contrastar. Lo que sí se podrá comprobar, más adelante, es si se cumplió.',
  },
  {
    texto: 'La ley obliga a resolver en seis meses.',
    verificable: true,
    explicacion: 'Es una afirmación sobre una norma: se comprueba leyendo la ley y su desarrollo reglamentario.',
  },
  {
    texto: 'Esta foto muestra la inundación de ayer en nuestro municipio.',
    verificable: true,
    explicacion: 'Con búsqueda inversa, geolocalización y comparación de fechas se puede comprobar si la foto es de ese lugar y de ese día.',
  },
  {
    texto: 'El paro bajará el próximo año.',
    verificable: false,
    explicacion: 'Es una predicción: no hay todavía un dato con el que contrastarla.',
  },
];

export const TIPOS_CONTENIDO = [
  {
    id: 'mensaje',
    etiqueta: 'Un mensaje reenviado o un audio',
    canal: 'whatsapp',
    motivo: 'Los mensajes y audios que circulan por mensajería llegan mejor si se reenvían tal cual, con su formato original y sin recortes.',
  },
  {
    id: 'redes',
    etiqueta: 'Una publicación en redes sociales',
    canal: 'formulario',
    motivo: 'Una publicación se entiende mejor con su enlace y con el contexto: dónde la viste, cuándo y por qué te genera dudas.',
  },
  {
    id: 'declaracion',
    etiqueta: 'Una declaración de un cargo público',
    canal: 'formulario',
    motivo: 'En una declaración importa saber dónde y cuándo se hizo, y el formulario te deja añadir el enlace y ese contexto.',
  },
  {
    id: 'imagen',
    etiqueta: 'Una foto o un vídeo',
    canal: 'whatsapp',
    motivo: 'Si la imagen te ha llegado por mensajería, reenviarla tal cual conserva el archivo como lo recibiste.',
  },
  {
    id: 'dato',
    etiqueta: 'Un dato o una cifra',
    canal: 'formulario',
    motivo: 'Una cifra se comprueba mejor si sabemos de dónde sale, y en el formulario puedes añadir el enlace y el contexto.',
  },
];

export const NIVELES_DANO = [
  { id: 'inmediato', etiqueta: 'Sí, hay un riesgo inmediato para una persona' },
  { id: 'pronto', etiqueta: 'Sí, puede causar daño en horas o en pocos días' },
  { id: 'no', etiqueta: 'No, o no lo sé' },
];

export const DESPUES = [
  {
    titulo: 'Registro',
    texto: 'Tu contenido queda registrado con la fecha y el canal por el que llegó.',
  },
  {
    titulo: 'Evaluación por dos personas',
    texto: 'Dos personas valoran si es verificable y si entra por alguna de las tres vías de la metodología: influenciabilidad, viralidad o peligrosidad.',
  },
  {
    titulo: 'Investigación, si se admite',
    texto: 'Si se admite, sigue las nueve fases de la metodología hasta que se publica la verificación.',
  },
  {
    titulo: 'Respuesta, en todos los casos',
    texto: 'Si nos dejas un medio de contacto, te respondemos siempre, también cuando el contenido se descarta, y te explicamos el motivo.',
  },
];

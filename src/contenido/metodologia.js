/**
 * Contenido de la sección Metodología. Borrador pendiente de revisión por
 * el equipo de ODESOCAN. Los roles se nombran por su función, nunca con
 * nombres del equipo.
 *
 * Cada fase tiene: qué se hace, qué garantía del Código EFCSN cumple y qué
 * queda registrado en el expediente ficticio OV-2026-0000.
 */
export const EXPEDIENTE = 'OV-2026-0000';

export const FASES = [
  {
    id: 'monitorizacion',
    titulo: 'Monitorización y escucha activa',
    corto: 'Monitorización',
    hace: [
      'El servicio vigila de forma continua lo que se afirma en público sobre derechos sociales en Canarias. Combina canales automatizados (la información de transparencia del Gobierno y del Parlamento de Canarias, un observatorio de medios y las redes sociales de Meta), los canales por los que la ciudadanía envía contenidos (formulario, correo, WhatsApp, Telegram y teléfono) y la vigilancia manual de medios y redes.',
      'Ninguna detección avanza sola: una persona revisa cada una antes de que pase a la fase siguiente.',
    ],
    garantia: 'Artículo 2.D: un canal público para que cualquier persona envíe afirmaciones.',
    registro: 'Detección registrada. Canal: formulario web. Revisión humana: hecha.',
  },
  {
    id: 'seleccion',
    titulo: 'Selección y priorización',
    corto: 'Selección',
    hace: [
      'Un contenido entra por una de tres vías. La influenciabilidad mide el poder o el alcance de quien afirma; la viralidad, su difusión, con umbrales orientativos de 1.000 «me gusta», 500 comentarios o compartidos o 10.000 reproducciones, pensados para una población de 2,2 millones de personas; y la peligrosidad, el riesgo de que cause daño, que prevalece sobre las otras dos.',
      'Después se aplica el filtro de verificabilidad: se verifican datos, fuentes, normas y hechos, y no principios, valores, promesas ni predicciones, porque otra persona que repita el proceso tiene que poder llegar a un resultado muy parecido. Una segunda persona revisa cada decisión, y todo descarte queda registrado con su motivo.',
    ],
    garantia: 'Artículos 2.B y 3.1.D: el mismo estándar para cualquier emisora y ninguna concentración indebida en un partido o en un lado del espectro político.',
    registro: 'Vía de entrada: viralidad. Verificable: sí. Segunda persona: conforme.',
  },
  {
    id: 'investigacion',
    titulo: 'Investigación y verificación',
    corto: 'Investigación',
    hace: [
      'La regla de oro es contar con al menos dos fuentes para la afirmación central, primarias siempre que sea posible, y reunir la evidencia a favor y en contra antes de calificar.',
      'El equipo consulta a las partes, que disponen de un plazo de réplica de 48 horas; recurre a personas expertas con credenciales acreditadas y conflictos de interés declarados; aplica técnicas audiovisuales (búsqueda inversa, geolocalización, análisis de metadatos y detección de manipulación) y hace el análisis cuantitativo con código, para que cualquier persona pueda repetir el cálculo.',
    ],
    garantia: 'Artículos 2.B y 2.E: la evidencia se valora con el mismo estándar y se ofrece completa para poder replicar la verificación. Artículo 3.2: protección de las personas implicadas y derecho de réplica.',
    registro: 'Dos fuentes primarias. Réplica solicitada con 48 horas de plazo. Código del análisis guardado.',
  },
  {
    id: 'redaccion',
    titulo: 'Redacción',
    corto: 'Redacción',
    hace: [
      'La pieza se escribe con un lenguaje preciso y no emotivo, empieza por la conclusión y no supera las 1.500 palabras.',
      'Tiene siempre las mismas secciones: calificación y resumen, afirmación literal, por qué se verifica, evidencia, fuentes, método, conflictos de interés, réplica, protección de personas y correcciones.',
    ],
    garantia: 'Artículo 2.K: lenguaje preciso, factual y no emotivo.',
    registro: 'Borrador completo: 1.180 palabras y todas las secciones de la ficha.',
  },
  {
    id: 'revision',
    titulo: 'Revisión editorial',
    corto: 'Revisión',
    hace: [
      'Una persona revisora no vinculada a la investigación ni a la selección emite un dictamen motivado con tres salidas posibles: publicable, devolución para subsanar o no publicable.',
      'Existen además una segunda revisión, a la que se puede acudir si se discrepa del dictamen, y un estado de suspensión, que nunca se usa por falta de calidad. Los plazos de cada paso figuran al final de esta página.',
    ],
    garantia: 'Artículo 4.1.A: quién ejerce el control editorial y cómo, explicado en público.',
    registro: 'Dictamen: publicable. Emitido por una persona revisora no vinculada.',
  },
  {
    id: 'calificacion',
    titulo: 'Calificación',
    corto: 'Calificación',
    hace: [
      'La persona revisora asigna la calificación con la escala de cuatro categorías, las cuatro preguntas de decisión y los casos frontera que se explican más abajo.',
      'El juicio recae siempre sobre la afirmación y nunca sobre la persona que la hizo.',
    ],
    garantia: 'Artículo 2.A: la escala de calificación y su definición son públicas.',
    registro: 'Calificación: Contexto. Decidida en la pregunta 3.',
  },
  {
    id: 'publicacion',
    titulo: 'Publicación y distribución',
    corto: 'Publicación',
    hace: [
      'La pieza se publica en la web con el marcado ClaimReview, que permite a buscadores y plataformas reconocerla como verificación, y se distribuye por redes sociales, boletines, WhatsApp y Telegram.',
      'Quien reportó el contenido recibe la respuesta por el mismo canal por el que lo envió.',
    ],
    garantia: 'Artículo 2.E: cada publicación da acceso a la evidencia que la sostiene.',
    registro: 'Publicada con ClaimReview. Respuesta enviada a quien la reportó.',
  },
  {
    id: 'correccion',
    titulo: 'Corrección de errores',
    corto: 'Corrección',
    hace: [
      'Si se detecta un error, la pieza lleva una nota visible que explica qué ha cambiado, y nunca se borra nada en silencio. La versión original se conserva en PDF en la misma página.',
      'Cualquier persona puede pedir una corrección por un canal público, y todas quedan en el registro de correcciones del portal.',
    ],
    garantia: 'Artículos 3.3.E a 3.3.G: política de correcciones, registro público y canal directo para pedirlas.',
    registro: 'Sin correcciones. Canal de solicitudes abierto.',
  },
  {
    id: 'archivo',
    titulo: 'Archivo y trazabilidad',
    corto: 'Archivo',
    hace: [
      'El original y cada prueba se capturan en el momento en que se usan, con una copia local y otra en un archivo público (Wayback Machine).',
      'Cada archivo lleva su huella SHA-256, una especie de huella digital que cambia si el archivo cambia, y no se modifica nunca.',
    ],
    garantia: 'Artículo 2.O, buena práctica: archivar la afirmación original y todo el contenido usado como evidencia.',
    registro: 'Seis capturas archivadas, cada una con su huella SHA-256.',
  },
];

/**
 * Casos frontera de «Pon a prueba la escala». `respuesta` es el valor de la
 * escala (1 a 4) o 0 cuando el contenido no se califica.
 */
export const CASOS_FRONTERA = [
  {
    caso: 'Una publicación presenta como actual una cifra real de paro, pero la cifra es de otro año y de otra comunidad autónoma.',
    respuesta: 2,
    explicacion:
      'La cifra existe, pero al presentarla como actual y propia de Canarias cambia de sentido: mezcla un dato correcto con elementos falsos.',
  },
  {
    caso: 'Una declaración da una cifra exacta de solicitudes resueltas, pero no dice que el procedimiento sigue abierto y que la mayoría está todavía pendiente.',
    respuesta: 3,
    explicacion:
      'El dato es correcto, pero sin saber que el procedimiento sigue abierto no se puede entender lo que significa.',
  },
  {
    caso: 'Un cargo público dice que una tasa es de «casi un 15 %» y el dato oficial es del 14,6 %.',
    respuesta: 4,
    explicacion: 'El redondeo es razonable y no cambia el sentido del dato, así que la afirmación es exacta.',
  },
  {
    caso: 'Circula una fotografía real como si mostrara un hecho de ayer, pero se tomó en otro lugar y en otra fecha.',
    respuesta: 1,
    explicacion:
      'La imagen no muestra lo que se dice que muestra. Las imágenes atribuidas a hechos ajenos se califican como falsas.',
  },
  {
    caso: 'Una afirmación combina un dato central falso, el número de plazas de un servicio, con un dato secundario correcto, la fecha de un decreto.',
    respuesta: 1,
    explicacion:
      'Cuando una afirmación tiene partes ciertas y partes falsas, se califica según su parte central. Aquí la parte central no se corresponde con los datos.',
  },
  {
    caso: 'Un cargo público asegura que el año que viene habrá pleno empleo en su isla.',
    respuesta: 0,
    explicacion:
      'Es una predicción: no existe todavía un dato con el que contrastarla, así que no se califica y se descarta en la fase de selección.',
  },
];

export const GARANTIAS_EMERGENCIA = [
  'Revisión por una persona distinta de la autora.',
  'Al menos dos fuentes para la afirmación central.',
  'Evidencia a favor y en contra antes de calificar.',
  'Protección de las personas que aparecen en el contenido.',
  'Réplica a las partes, con un margen más corto.',
  'Archivo de todas las pruebas.',
];

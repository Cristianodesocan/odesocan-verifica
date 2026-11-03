/**
 * Metodología completa de Odesocan Verifica: versión pública.
 *
 * Adaptada del documento interno «Metodología de verificación» (versión 1.0
 * revisada, octubre de 2026). Para publicarla:
 *   - los nombres del equipo se sustituyen por funciones;
 *   - no se reproducen los ejemplos de la escala del documento interno,
 *     porque uno repite un bulo estigmatizante y otros citan a personas e
 *     instituciones reales; los ejemplos están en «Pon a prueba la escala»;
 *   - se omiten las referencias a anexos y plantillas internas.
 * Las diferencias con el encargo están en docs/decisiones.md.
 *
 * Borrador pendiente de revisión por el equipo de ODESOCAN.
 */

export const VERSION = { numero: '1.0 revisada', periodo: 'octubre de 2026' };

export const PRESENTACION = [
  'ODESOCAN reorienta parte de su trabajo, centrado hasta ahora en la investigación aplicada y en los informes de perfil institucional, hacia un servicio que verifica a diario la acción política: comprueba el cumplimiento de compromisos e indicadores y contrasta la desinformación en el discurso político y en la narrativa electoral de Canarias.',
  'La fundación no abandona la incidencia política basada en el enfoque de derechos sociales ni sus plataformas de datos abiertos. Odesocan Verifica es una rama de acción metodológicamente separada de la incidencia, dedicada a fiscalizar la acción del gobierno, de la oposición y del discurso político en Canarias.',
  'La metodología adapta el Código Europeo de Normas para Organizaciones Independientes de Verificación de la EFCSN y toma como referencia las de Newtral y Maldita. El equipo reúne perfiles de investigación aplicada, análisis y ciencia de datos, comunicación, periodismo, derecho y análisis del lenguaje.',
];

export const CIFRAS = [
  { valor: '9', texto: 'fases de trabajo' },
  { valor: '5', texto: 'personas en el equipo' },
  { valor: '4', texto: 'categorías de calificación' },
  { valor: '2', texto: 'fuentes mínimas por afirmación central' },
];

/**
 * Cada fase: párrafos (cadenas o bloques { titulo, parrafos } y { lista }),
 * objetivo, quién interviene (por función) y artículos del Código.
 */
export const FASES_COMPLETAS = [
  {
    id: 'fase-1',
    titulo: 'Monitorización y escucha activa',
    cuerpo: [
      'Consiste en la vigilancia continuada de las redes sociales de uso mayoritario (Instagram, Facebook, X y TikTok), de la mensajería (WhatsApp y Telegram), de los canales internos de llamadas y correo, y de los medios de comunicación escritos, la televisión y la radio.',
      {
        titulo: 'Canales internos',
        parrafos: [
          'Para que la ciudadanía use estos canales, el servicio los da a conocer en redes sociales y en los encuentros que celebra el observatorio. Cada contacto se registra junto con el tratamiento que recibe, y siempre tiene respuesta, también cuando el contenido se descarta con un motivo justificado, porque es la forma de reconocer cada aportación y de que quien la envía siga participando.',
        ],
      },
      {
        titulo: 'Canales automatizados',
        parrafos: [
          'La información de transparencia del Gobierno de Canarias y del Parlamento de Canarias se sigue en tiempo real, con una base de datos de todas sus publicaciones desde mayo de 2023. Es una fuente primaria, porque la información aparece en los canales oficiales antes que en otros medios.',
          'Están en desarrollo un observatorio de medios, que recoge a diario entre 60 y 80 noticias de 14 medios escritos de Canarias, y una herramienta para detectar publicaciones relacionadas con la política autonómica en las redes sociales de Meta.',
        ],
      },
      {
        titulo: 'Canales manuales',
        parrafos: [
          'El equipo detecta además, con comprobación humana, declaraciones y contenidos verificables en medios escritos, radio, televisión y redes sociales. Ninguna detección automática pasa a la fase siguiente sin que una persona la revise.',
        ],
      },
    ],
    objetivo: 'Ordenar las vías de entrada de los contenidos detectados por los distintos canales para su posterior selección.',
    intervienen: [
      'Investigación: revisión diaria del funcionamiento de los canales automatizados.',
      'Comunicación: canales internos (llamadas, WhatsApp, Telegram y correo).',
      'Todo el equipo: canales manuales y seguimiento de la actualidad informativa.',
    ],
    articulos: 'Código EFCSN, artículo 2.D: canal público para enviar afirmaciones.',
  },
  {
    id: 'fase-2',
    titulo: 'Selección y priorización',
    cuerpo: [
      'Los recursos son limitados y hay que decidir qué merece verificarse. Un contenido entra por alguna de tres vías, que pueden darse a la vez, aunque basta una para pasar a la evaluación de la verificabilidad.',
      {
        titulo: 'Influenciabilidad',
        parrafos: [
          'Hay organizaciones y personas que, por su cargo o por su posición mediática, pueden influir en la agenda y en el enfoque de la actualidad, como cargos públicos municipales, insulares y autonómicos, representantes empresariales, profesionales de la comunicación o personas con gran audiencia en redes. A ese poder le corresponde la responsabilidad de que se verifique lo que difunden.',
        ],
      },
      {
        titulo: 'Viralidad',
        parrafos: [
          'Cuanto más circula un contenido, más urgente es investigarlo. Como referencia, para una población de 2,2 millones de personas, un contenido político se considera viral o potencialmente viral a partir de 1.000 «me gusta», 500 comentarios o compartidos o 10.000 reproducciones.',
        ],
      },
      {
        titulo: 'Peligrosidad',
        parrafos: [
          'Ante la desinformación en contextos de emergencia o de riesgo para las personas, como crisis sanitarias, catástrofes, atentados, emergencias sociales (desahucios o despidos masivos), delitos de odio o la llegada de personas migrantes en situación administrativa irregular, el servicio actúa antes de que el contenido se viralice, con el protocolo de emergencia. Además, publica un aviso que alerta del riesgo y recomienda acudir a fuentes verificadas y evitar la información sin fuente reconocible.',
          'La peligrosidad prevalece sobre las otras dos vías: si hay que elegir entre un contenido que entra por influenciabilidad o viralidad y otro que presenta peligrosidad, se elige el segundo.',
        ],
      },
      {
        titulo: 'Verificabilidad',
        parrafos: [
          'Antes de investigar se comprueba que el contenido es verificable, es decir, que invoca un dato, una fuente, una norma o un hecho sobre el que existe evidencia contrastada. Las declaraciones sobre principios, valores o juicios no se pueden verificar, aunque admitan un análisis político, jurídico, económico o sociológico, porque la verificación exige que otra persona u otra organización que repita el proceso llegue a un resultado muy parecido.',
          'Por ejemplo, si un cargo público afirma que las prestaciones de dependencia de Canarias son las más altas del Estado y da una cifra, la afirmación se puede contrastar con los datos del IMSERSO. Si dice que el modelo canario de dependencia es puntero sin aportar cifras, normas ni hechos, no es verificable, porque contrastarlo exigiría un análisis jurídico, económico y social que la verificación no puede resolver con la agilidad necesaria.',
        ],
      },
      {
        titulo: 'Quién decide',
        parrafos: [
          'La persona que detectó el contenido hace la evaluación, y otra persona del equipo la revisa. Si no coinciden sobre la verificabilidad, el contenido se descarta; si no coinciden sobre la vía de entrada, esta se reajusta y el proceso continúa, siempre que la revisión reconozca alguna. Antes de admitir un contenido se consulta el inventario de iniciativas de incidencia de ODESOCAN, para aplicar las reglas de independencia, y todo descarte queda registrado con su motivo.',
        ],
      },
    ],
    objetivo:
      'Que la carga de trabajo sea sostenible para todo el equipo y que cada contenido que pasa a verificación se complete con las garantías del método.',
    intervienen: [
      'Investigación y comunicación: evaluación de la selección.',
      'Una segunda persona del equipo: revisión de cada decisión.',
    ],
    articulos: 'Código EFCSN, artículos 2.B, 2.C y 3.1.D: el mismo estándar para cualquier emisora y ninguna concentración indebida en un partido.',
  },
  {
    id: 'fase-3',
    titulo: 'Investigación y verificación',
    cuerpo: [
      'En esta fase se despliegan las técnicas de verificación, que siguen un patrón común:',
      {
        lista: [
          'Consultar los datos oficiales y las fuentes primarias sobre el tema.',
          'Contactar con las partes implicadas (gabinetes de comunicación, protagonistas e instituciones) para pedir su versión o una aclaración, con un plazo de réplica de 48 horas.',
          'Recabar la opinión de personas expertas, con sus credenciales acreditadas y cualquier conflicto de interés declarado.',
          'Cuando el contenido es audiovisual, aplicar técnicas como la búsqueda inversa de imágenes, la geolocalización, el análisis de metadatos o la detección de manipulación con inteligencia artificial.',
        ],
      },
      {
        titulo: 'La regla de oro',
        parrafos: [
          'La IFCN, la EFCSN, Maldita y Newtral comparten la misma regla: un mínimo de dos fuentes para cualquier afirmación central, con preferencia por las fuentes primarias sobre las secundarias, y una presentación equilibrada de la evidencia a favor y en contra antes de calificar.',
        ],
      },
      'Los análisis cuantitativos se hacen con código, para que se puedan replicar, y todos los documentos citados se enlazan para que se puedan comprobar en el momento. La persona que investiga y redacta una verificación no puede ser la misma que después hace su revisión editorial o su calificación.',
    ],
    objetivo:
      'Evaluar el contenido contrastándolo con fuentes primarias siempre que sea posible, hacer con código los análisis cuantitativos para que se puedan replicar y enlazar todos los documentos citados.',
    intervienen: [
      'Investigación social aplicada y datos: investigación y análisis cuantitativo.',
      'Dirección, jurista: investigación y análisis jurídico, cuando se le asigna.',
      'Investigación en género: investigación con perspectiva de género.',
    ],
    articulos: 'Código EFCSN, artículos 2.B, 2.E, 2.F a 2.I y 3.2.E: evidencia, fuentes, replicabilidad y réplica.',
  },
  {
    id: 'fase-4',
    titulo: 'Redacción',
    cuerpo: [
      'La persona que investigó redacta la pieza con los criterios de lenguaje del servicio: lenguaje preciso y no emotivo, explicación del método seguido y enlaces a cada fuente citada, para que quien lea pueda reproducir el proceso.',
      'El Código no fija una extensión. Organizaciones como UYCheck, Africa Check, PolitiFact o Full Fact publican piezas de entre 354 y 1.148 palabras de media, y Odesocan Verifica fija un máximo orientativo de 1.500 palabras para los casos más complejos, aunque la mayoría debería resolverse con menos.',
    ],
    tablaSecciones: true,
    objetivo: null,
    intervienen: ['La persona que investigó la pieza.'],
    articulos: 'Código EFCSN, artículo 2.K: lenguaje preciso, factual y no emotivo.',
  },
  {
    id: 'fase-5',
    titulo: 'Revisión editorial',
    cuerpo: [
      'La revisión editorial es el filtro que distingue una verificación de una pieza de opinión. Las organizaciones de referencia la resuelven con varias aprobaciones internas: Maldita.es publica con cuatro en el caso estándar y Newtral aplica tres filtros antes de publicar. Con cinco personas sin dedicación exclusiva, Odesocan Verifica adopta un procedimiento propio que cumple el mínimo del Código y añade una segunda revisión.',
    ],
    pasosRevision: true,
    objetivo: null,
    intervienen: [
      'Una persona del equipo designada como revisora habitual.',
      'Si la pieza es de esa persona o no está disponible, otra persona no vinculada a la pieza.',
    ],
    articulos: 'Código EFCSN, artículos 2.J y 4.1.A: edición por una persona distinta de la autora y control editorial explicado en público.',
  },
  {
    id: 'fase-6',
    titulo: 'Calificación',
    cuerpo: [
      'El resultado se resume en una etiqueta reproducible. No hay un estándar único, y las escalas varían según el tipo de contenido que verifica cada organización.',
    ],
    escalas: true,
    objetivo: 'Resumir la verificación en una etiqueta sencilla que, a su vez, sea replicable.',
    intervienen: ['Las mismas personas que en la revisión editorial.'],
    articulos: 'Código EFCSN, artículo 2.A: escala de calificación con sus categorías definidas y accesibles en la web.',
  },
  {
    id: 'fase-7',
    titulo: 'Publicación y distribución',
    cuerpo: [
      'La pieza se publica en la web con el marcado ClaimReview (schema.org), un vocabulario estándar que permite a buscadores y agregadores, como Google Fact Check Explorer, la API de Google Fact Check Tools o Data Commons, identificar qué afirmación se verificó, quién lo hizo y con qué resultado. Según el documento de metodología, Google dejó de mostrar la etiqueta de verificación en sus resultados de búsqueda en junio de 2025, pero esas bases de datos se siguen usando para localizar y registrar verificaciones.',
      'La distribución se completa con las redes sociales de ODESOCAN, los boletines y los canales de WhatsApp y Telegram, y quien reportó el contenido recibe el resultado. Cada pieza incluye el proceso metodológico seguido, para que cualquier persona pueda replicar la verificación.',
    ],
    objetivo: 'Difundir la verificación como herramienta para una fiscalización colectiva, crítica y basada en evidencia contrastada.',
    intervienen: [
      'Comunicación: divulgación en redes y medios, y respuesta en los canales internos.',
      'Investigación: publicación en la web y marcado ClaimReview.',
    ],
    articulos: 'Código EFCSN, artículo 2.E: acceso a la evidencia en cada publicación.',
  },
  {
    id: 'fase-8',
    titulo: 'Corrección de errores',
    cuerpo: [
      'Las organizaciones evaluadas por la IFCN o por la EFCSN mantienen una política pública de correcciones, con un canal visible para que cualquier persona señale un error y una nota de corrección explícita en la pieza original, nunca un borrado silencioso. Las solicitudes se valoran con el mismo sistema que la revisión editorial.',
      'El teléfono de ODESOCAN y sus redes sociales están a disposición del público para pedir correcciones. Cuando una pieza se edita, la versión original se conserva en PDF en la misma página que la versión actualizada.',
    ],
    objetivo: 'Cumplir el artículo 3.3.B del Código mediante la trazabilidad de las ediciones.',
    intervienen: [
      'Comunicación: recepción de las solicitudes.',
      'Una persona revisora: valoración de cada solicitud.',
      'Investigación: aplicación de la corrección y actualización en la web.',
    ],
    articulos: 'Código EFCSN, artículos 3.3.A a 3.3.G: correcciones, registro público y canal directo.',
  },
  {
    id: 'fase-9',
    titulo: 'Archivo y trazabilidad',
    cuerpo: [
      'Se conserva un histórico consultable de todas las piezas, capturas y versiones, originales y corregidas, por transparencia y por necesidad práctica: los mismos bulos reaparecen periódicamente, y reconocer un patrón ya verificado acelera mucho la investigación en el siguiente ciclo.',
      'Cada prueba se captura en el momento en que se usa, con una copia local y otra en un archivo público (Wayback Machine), y lleva su huella SHA-256 para que se pueda comprobar que no se ha modificado.',
    ],
    objetivo: null,
    intervienen: ['Comunicación: archivo y administración del espacio documental de cada verificación.'],
    articulos: 'Código EFCSN, artículo 2.O, buena práctica: archivar la afirmación original y la evidencia.',
  },
];

/** Tabla de secciones mínimas de la pieza (fase 4). */
export const SECCIONES_PIEZA = [
  ['Calificación y resumen', 'Conclusión en lenguaje preciso, factual y no emotivo, sin sobredimensionar los hallazgos, con una calificación de la escala pública.', '2.K y 2.A', 'Obligatorio'],
  ['La afirmación o el contenido', 'Cita literal, quién la formula, cuándo y dónde, con enlace y copia archivada del original y de las pruebas.', '2.O', 'Buena práctica'],
  ['Por qué y qué se verifica', 'Motivo de interés público y delimitación de la parte verificable, distinta de las opiniones.', '2.C y 2.D', 'Propuesta de ODESOCAN'],
  ['Evidencia a favor y en contra', 'Prueba de cada afirmación factual relevante, con fuentes primarias siempre que sea posible.', '2.F', 'Obligatorio'],
  ['Fuentes', 'Al menos dos para la afirmación central, primarias y nombradas; las anónimas, solo si las corrobora una fuente nombrada o una prueba material; credenciales de las personas expertas.', '2.G, 2.H y 2.I', 'Obligatorio'],
  ['Método y replicabilidad', 'Indicador, definición, serie, fecha de consulta y código utilizado.', '2.E', 'Obligatorio'],
  ['Conflictos de interés y sesgo de las fuentes', 'Mención de cualquier conflicto de interés o sesgo político razonable, también de las personas expertas y de las organizaciones citadas.', '3.1.F', 'Obligatorio'],
  ['Réplica', 'Ofrecimiento de réplica a quien formula la afirmación o es objeto de críticas, con un plazo de 48 horas que fija el servicio, porque el Código no lo fija.', '3.2.E', 'Obligatorio'],
  ['Protección de personas', 'Ocultación de la identidad o la imagen cuando hay riesgo, protección del origen de los contenidos de personas usuarias, trato respetuoso de las personas menores y anonimización de los datos que permitan el acoso.', '3.2.A a 3.2.D', 'Obligatorio'],
  ['Actualizaciones y correcciones', 'Nota de corrección o de actualización en la propia pieza, con enlace a la política de correcciones y a un canal directo para pedirlas.', '3.3.A a 3.3.G', 'Obligatorio'],
  ['Registro de edición, en el expediente', 'Constancia de al menos una ronda de edición por una persona distinta de la autora antes de publicar.', '2.J', 'Obligatorio'],
];

/** Escalas de organizaciones de referencia (fase 6). */
export const ESCALAS_REFERENCIA = [
  ['Maldita.es', 'Falso o bulo, Alerta, Contexto, Verdadero', 'Contenido viral y bulos en redes y mensajería'],
  ['Newtral', 'Verdadero, Verdad a medias, Engañoso, Falso', 'Declaraciones de cargos políticos e instituciones'],
  ['Full Fact', 'Verificación narrativa, sin una escala fija publicada de forma centralizada', 'Declaraciones políticas y datos públicos en el Reino Unido'],
];

export const EQUIPO = [
  ['Dirección', 'Jurista especializada en incidencia política'],
  ['Investigación', 'Especialista en investigación social aplicada y datos'],
  ['Investigación', 'Especialista en género e investigación aplicada'],
  ['Comunicación', 'Periodista especializada en gestión de comunidades digitales'],
  ['Comunicación', 'Especialista en investigación aplicada y comunicación'],
];

export const FLUJO = [
  ['Detección', 'Una persona del equipo detecta el contenido por un canal automatizado, interno o manual, lo captura y lo anota en el registro.'],
  ['Selección', 'La misma persona evalúa la vía de entrada y la verificabilidad, consulta el inventario de iniciativas de incidencia, y otra persona del equipo revisa la decisión. Si el contenido se descarta, queda anotado el motivo.'],
  ['Investigación', 'La persona investigadora contrasta la afirmación con al menos dos fuentes, primarias siempre que sea posible, y solicita la réplica con un plazo de 48 horas.'],
  ['Redacción', 'La persona investigadora redacta la pieza con las secciones mínimas.'],
  ['Revisión editorial y calificación', 'Una persona no vinculada revisa la pieza, emite su dictamen motivado y asigna la calificación.'],
  ['Publicación', 'La pieza se publica en la web con su marcado ClaimReview, se difunde en redes y se comunica el resultado a quien la reportó.'],
  ['Corrección y archivo', 'Las correcciones se aplican con una nota visible y se conserva la versión original. El expediente completo queda archivado.'],
];

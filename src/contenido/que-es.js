/**
 * Contenido de «Qué es verificar». Borrador pendiente de revisión.
 * El Código EFCSN se resume con palabras propias y se enlaza; no se
 * reproduce su texto.
 */

/** Documentos del servicio que desarrollan el Código, con su destino en la web. */
export const DOCUMENTOS = {
  metodologia: { nombre: 'Metodología', ruta: '/metodologia' },
  escala: { nombre: 'Escala de calificación', ruta: '/metodologia/escala' },
  criterios: { nombre: 'Criterios de lenguaje', ruta: null, pendiente: 'Documento pendiente de publicar' },
  captura: { nombre: 'Protocolo de captura y archivo', ruta: '/metodologia/recorrido' },
  emergencia: { nombre: 'Protocolo de emergencia', ruta: '/metodologia/emergencia', nota: 'propio de ODESOCAN' },
  independencia: { nombre: 'Directrices de independencia', ruta: '/transparencia/independencia' },
  correcciones: { nombre: 'Política de correcciones', ruta: '/transparencia/correcciones' },
  datos: { nombre: 'Política de protección de datos', ruta: '/transparencia/datos' },
  transparencia: { nombre: 'Titularidad, gobernanza y financiación', ruta: '/transparencia' },
  registro: { nombre: 'Datos de registro de la fundación', ruta: '/transparencia/titularidad' },
  queja: { nombre: 'Aviso de queja ante la EFCSN', ruta: null, nota: 'preparado para cuando ODESOCAN sea miembro' },
};

export const CAPITULOS = [
  {
    id: 'metodologia',
    articulo: 2,
    nombre: 'Metodología',
    resumen:
      'Cómo se eligen los temas, cómo se investigan y cómo se califican, con el mismo estándar para cualquier emisora y con acceso a la evidencia.',
    documentos: ['metodologia', 'escala', 'criterios', 'captura', 'emergencia'],
  },
  {
    id: 'etica',
    articulo: 3,
    nombre: 'Estándares éticos',
    resumen:
      'Independencia de partidos y gobiernos, protección de las personas que aparecen en una verificación y corrección honesta de los errores.',
    documentos: ['independencia', 'criterios', 'datos', 'correcciones'],
  },
  {
    id: 'transparencia',
    articulo: 4,
    nombre: 'Transparencia',
    resumen:
      'Quién es titular de la organización, quién toma las decisiones editoriales, cómo se financia y qué conflictos de interés podría tener.',
    documentos: ['transparencia', 'independencia'],
  },
  {
    id: 'acceso',
    articulo: 5,
    nombre: 'Acceso y renovación',
    resumen:
      'Los requisitos para entrar en la red y renovar la condición de miembro, como estar registrada legalmente y que esos datos sean fáciles de encontrar.',
    documentos: ['registro'],
  },
  {
    id: 'cumplimiento',
    articulo: 6,
    nombre: 'Cumplimiento',
    resumen: 'Cómo atiende la red las quejas del público y qué ocurre cuando una organización miembro deja de cumplir el Código.',
    documentos: ['queja'],
  },
];

export const QUE_ES = [
  'Califica afirmaciones concretas, nunca a las personas que las hacen.',
  'Contrasta datos, fuentes, normas y hechos que otra persona podría comprobar siguiendo el mismo método.',
  'Muestra la evidencia a favor y en contra y enlaza las fuentes, para que cualquiera pueda repetir la comprobación.',
];

export const QUE_NO_ES = [
  'No es opinión: no dice si una política es buena o mala.',
  'No es análisis de políticas públicas, que ODESOCAN hace por otra vía.',
  'No califica principios, valores, promesas ni predicciones, porque no hay un dato con el que contrastarlos.',
];

/**
 * «Dos caminos»: supuestos del anexo I de las directrices de independencia.
 * tipo: 'verifica' (recorre el camino de la verificación), 'no-verifica'
 * (se detiene a la entrada) o 'no-procede' (la incidencia intenta cruzar).
 */
export const SUPUESTOS = [
  {
    id: 'coincide',
    texto: 'La afirmación coincide con un hecho que sostiene una iniciativa de incidencia de ODESOCAN.',
    tipo: 'no-verifica',
    resultado: 'No se verifica',
    marcas: [],
    explicacion:
      'Si el hecho ya sostiene una iniciativa de ODESOCAN, la fundación tendría interés en el resultado. Para que la verificación no se convierta en un apoyo a la incidencia, ese hecho no pasa a verificación.',
  },
  {
    id: 'materia',
    texto: 'Trata la misma materia que una iniciativa de incidencia en curso, pero con hechos distintos.',
    tipo: 'verifica',
    resultado: 'Se verifica y se declara la relación',
    marcas: ['Se declara la relación'],
    explicacion:
      'Compartir materia no crea un conflicto cuando los hechos son distintos. Aun así, quien lea la pieza tiene que saberlo, así que la relación se declara en el apartado de conflictos de interés.',
  },
  {
    id: 'contraparte',
    texto: 'La emisora es contraparte en una acción de ODESOCAN.',
    tipo: 'verifica',
    resultado: 'Se verifica, con revisión y calificación por personas no vinculadas a esa acción',
    marcas: ['Revisión no vinculada', 'Calificación no vinculada'],
    explicacion:
      'La afirmación se trata con el mismo estándar que cualquier otra, y las personas que participan en esa acción no intervienen en su revisión ni en su calificación.',
  },
  {
    id: 'datos',
    texto: 'La afirmación cita datos de ODESOCAN.',
    tipo: 'verifica',
    resultado: 'Se verifica, pero las fuentes propias no pueden ser centrales',
    marcas: ['Fuentes independientes'],
    explicacion:
      'La verificación se apoya en fuentes independientes de la fundación, para que el resultado no dependa de que ODESOCAN confirme sus propios datos.',
  },
  {
    id: 'vinculo',
    texto: 'La afirmación afecta a la entidad fundadora (ACUFADE) o al Patronato, o la emisora financia a ODESOCAN.',
    tipo: 'verifica',
    resultado: 'Se verifica y se declara el vínculo',
    marcas: ['Se declara el vínculo'],
    explicacion: 'El vínculo se declara en la propia pieza, para que cada persona pueda valorar la verificación sabiéndolo.',
  },
  {
    id: 'apoyo',
    texto: 'Una iniciativa de incidencia quiere apoyarse en una verificación publicada.',
    tipo: 'no-procede',
    resultado: 'No procede',
    marcas: [],
    explicacion:
      'La separación funciona en los dos sentidos: igual que los hechos de la incidencia no pasan a verificación, una iniciativa de incidencia no puede apoyarse en una verificación publicada.',
  },
];

/** Declaración de no partidismo, adaptada del modelo del anexo 3 del Código EFCSN. */
export const NO_PARTIDISMO = [
  'Odesocan Verifica no está bajo el control editorial de ningún Estado, gobierno, partido ni cargo político.',
  'No concentra sus verificaciones de forma indebida en un partido ni en un lado del espectro político.',
  'No recomienda el voto a ningún partido ni candidatura.',
  'No firma acuerdos ni alianzas con partidos políticos.',
  'No incorpora a su equipo a personas con cargos retribuidos o relevantes en partidos o gobiernos.',
  'Declara en cada pieza los conflictos de interés y tiene en cuenta los posibles sesgos de las personas expertas y de las organizaciones que cita.',
  'Pide a su equipo que no haga declaraciones políticas en nombre del servicio y que no acepte regalos ni favores más allá de las cortesías habituales.',
];

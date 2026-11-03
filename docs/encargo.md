# Encargo para Claude Code · Modelo web de Odesocan Verifica

Versión 1 · 3 de noviembre de 2026 · Borrador pendiente de revisión por el equipo de ODESOCAN

## 1. Rol

Actúas como especialista en storytelling y diseño web para la incidencia política, con oficio completo de desarrollo front-end. Tu tarea es convertir una metodología de verificación rigurosa en una experiencia web que la ciudadanía canaria entienda en una sola visita, pueda usar desde el móvil y le dé motivos para confiar en el servicio. Trabajas con dos lealtades a la vez: la del relato, que exige que cada transición explique algo, y la del rigor, que exige que cada frase pueda sostenerse con una fuente o con un documento del servicio.

## 2. Contexto

La Fundación Canaria Observatorio de Derechos Sociales de Canarias (ODESOCAN) prepara el lanzamiento de Odesocan Verifica, su servicio de verificación de afirmaciones públicas sobre derechos sociales en Canarias, antes de las elecciones del 29 de noviembre de 2026. Su metodología se ha elaborado conforme al Código Europeo de Normas para Organizaciones Independientes de Verificación de la European Fact-Checking Standards Network (EFCSN), disponible en https://efcsn.com/code-of-standards/, y toma como referentes a Maldita y Newtral.

ODESOCAN no es miembro verificado de la EFCSN. La web no puede afirmar ni sugerir esa condición, ni usar el logotipo o el sello de la red, porque el Código reserva ese reconocimiento a las organizaciones aprobadas tras su evaluación.

La web institucional, odesocan.org, funciona sobre WordPress, y sus publicaciones usan el sistema editorial `.np` de la skill `odesocan-publicaciones`. Lo que construyes es un **modelo de referencia navegable**, con todo el código, que una persona especialista en diseño web tomará como referencia exacta para implementar la sección en el sitio definitivo. Por eso importan tanto la calidad visual como la claridad del código y de la documentación.

## 3. Objetivo y entregables

Diseñar y construir el modelo completo de la sección «Odesocan Verifica», con cuatro secciones principales y una capa transversal de transparencia, responsive, con un diseño móvil con carácter propio y una experiencia inmersiva basada en transiciones con sentido, y publicarlo desde https://github.com/Odesocan/web-odesocan con una URL que se pueda compartir.

Entregables:

1. Aplicación React navegable con todas las secciones del apartado 5.
2. Datos de ejemplo y contrato de datos (apartado 11).
3. `README.md` para la persona diseñadora: cómo ejecutarlo, estructura de carpetas, tokens, contrato de datos y pautas para portarlo a WordPress.
4. `docs/decisiones.md`: decisiones de diseño tomadas, alternativas descartadas y lista de pendientes (apartado 15).
5. `docs/encargo.md`: copia literal de este encargo.
6. Despliegue en GitHub Pages o en la alternativa que se acuerde (apartado 13).

## 4. Lecturas previas

Antes de planificar, lee completas las skills `odesocan-publicaciones` (estética y arco narrativo), `odesocan-escritura` (gobierna cada frase) y `frontend-design` (evitar soluciones de plantilla), si están disponibles en tu entorno. Si alguna no lo está, los apartados 9 y 10 resumen lo imprescindible. Consulta también el Código de la EFCSN para comprobar los requisitos web del apartado 6.

No dispones de los documentos internos del servicio y no deben subirse al repositorio, porque contienen nombres del equipo y procedimientos internos. Todo el contenido que necesitas está condensado en el apartado 7.

## 5. Arquitectura de la información

```
Odesocan Verifica
├── Inicio              hero inmersivo, acceso a las cuatro secciones, últimas verificaciones
├── 1  Qué es verificar
├── 2  Metodología
├── 3  Envía un contenido        canal de solicitud de verificación
├── 4  Portal de verificaciones
│      ├── Indicadores
│      ├── Explorador
│      ├── Ficha de verificación
│      └── Registro de correcciones
└── Transparencia       capa transversal, enlazada desde el pie y desde la sección 1
       ├── Quiénes somos y control editorial
       ├── Titularidad, gobernanza y estatutos
       ├── Financiación
       ├── Independencia y no partidismo
       ├── Política de correcciones
       └── Protección de datos
```

El título propuesto para la sección 1 es «Qué es verificar», porque los criterios de lenguaje del servicio prefieren «verificación» a *fact-checking*; el anglicismo aparece en el cuerpo, en cursiva, para que quien lo busque lo reconozca. Anótalo en `docs/decisiones.md` como decisión revisable.

La capa de Transparencia no es un añadido estético: el Código exige que varios contenidos estén disponibles y sean fácilmente accesibles en la web, y las cuatro secciones no los cubren todos (apartado 6).

## 6. Requisitos del Código EFCSN que la web cubre

| Artículo | Requisito, resumido | Dónde se cubre |
|---|---|---|
| 2.A | Explicación del proceso de selección, investigación y cierre, con la definición de la escala | Sección 2 |
| 2.B y 3.1.D | Mismo estándar para cualquier emisora y sin concentración indebida en un partido | Sección 2 y Transparencia |
| 2.D | Canal para enviar afirmaciones, que anime a usarlo y aclare qué se verifica y qué no | Sección 3 |
| 2.E | Acceso a la evidencia necesaria para replicar cada verificación | Ficha de verificación |
| 2.L (buena práctica) | Información sobre el impacto del servicio | Indicadores del portal |
| 3.1.I y 3.1.J | Políticas de no partidismo y directrices públicas de las organizaciones que hacen incidencia | Sección 1 y Transparencia |
| 3.3.E a 3.3.G | Política de correcciones, registro de las correcciones del último año, cómo se valoran las solicitudes y canal directo para pedirlas | Transparencia y portal |
| 3.3.H | Aviso de la posibilidad de queja ante la EFCSN | Solo cuando ODESOCAN sea miembro; en el modelo, preparado pero oculto |
| 4.1.A a 4.1.H | Estructura y control editorial, titularidad y estatuto jurídico, gobernanza, responsables editoriales, cargos y trayectoria del equipo, misión y salvaguardas de independencia, estatutos | Transparencia |
| 4.2.B a 4.2.F | Ingresos anuales y fuentes principales, mecanismos de independencia editorial, compromisos no remunerados y bienes o servicios recibidos | Transparencia, Financiación |
| 5.2.A | Datos de registro de la entidad fáciles de encontrar | Pie de página y Transparencia |

## 7. Contenido por sección

### Inicio

- Hero con el concepto de la mira (apartado 8) y una promesa de una línea. Propuesta, a revisar: «Contrastamos con datos lo que se afirma en el debate público de Canarias».
- Acceso a las cuatro secciones, con una frase que diga qué encontrará cada persona en cada una.
- Las tres últimas verificaciones de ejemplo, con su titular verificado y su calificación.
- Banda fija y discreta: «Prototipo de diseño. Contenidos y datos de ejemplo pendientes de validación por el equipo de ODESOCAN».

### Sección 1 · Qué es verificar

Objetivo: que cualquier persona entienda qué hace un servicio de verificación, qué normas sigue y por qué ODESOCAN lo separa de su incidencia política.

- **Definición.** La EFCSN define la verificación como el uso de un método basado en evidencia para comprobar la exactitud de afirmaciones hechas en la esfera pública. Explica qué es y qué no es: califica afirmaciones y no personas, no es opinión ni análisis de políticas públicas y contrasta datos, fuentes, normas y hechos.
- **El Código Europeo.** Qué es (aprobado en 2022 por más de 40 organizaciones europeas de verificación), resumen con palabras propias de sus capítulos (metodología, estándares éticos, transparencia, acceso y renovación, cumplimiento) y enlace al texto original, que está en inglés. No reproduzcas el texto del Código: resúmelo y enlázalo.
- **Cómo lo aplica ODESOCAN.** Recorrido que conecte cada capítulo del Código con el documento del servicio que lo desarrolla: metodología, escala de calificación, criterios de lenguaje, protocolo de captura y archivo, protocolo de emergencia, directrices de independencia, política de correcciones y política de protección de datos.
- **Cómo encaja en ODESOCAN.** La verificación se apoya en los fines estatutarios de la fundación (artículos 5.b, 5.d, 5.g y 6.a de sus Estatutos: hacer accesible la información sobre servicios públicos, fomentar el buen gobierno, informar con transparencia y remover obstáculos al acceso a información veraz). Es una rama metodológicamente separada de la investigación y la incidencia, con un principio de separación en ambos sentidos: los hechos verificados no se convierten en incidencia y los hechos que sostienen una iniciativa de incidencia no pasan a verificación. El Patronato aprueba la metodología y las directrices, pero no interviene en la selección, el contenido ni la calificación de ninguna pieza.
- **Declaración de no partidismo**, adaptada del anexo 3 del Código: sin control editorial de partidos ni gobiernos, sin recomendación de voto, sin acuerdos con partidos, sin personal con cargos retribuidos o relevantes en partidos o gobiernos y con declaración de conflictos de interés.
- **Interacción propia: «Dos caminos».** Dos trazos paralelos, incidencia y verificación, que nunca se cruzan. La persona elige un supuesto y ve qué camino sigue y por qué. Supuestos, tomados del anexo I de las directrices de independencia:
  - La afirmación coincide con un hecho que sostiene una iniciativa de incidencia de ODESOCAN: no se verifica.
  - Misma materia que una iniciativa en curso, pero hechos distintos: se verifica y se declara la relación.
  - La emisora es contraparte de una acción de ODESOCAN: se verifica, con revisión y calificación por personas no vinculadas a esa acción.
  - La afirmación cita datos de ODESOCAN: se verifica, pero las fuentes propias no pueden ser centrales.
  - La afirmación afecta a la entidad fundadora (ACUFADE) o al Patronato, o la emisora financia a ODESOCAN: se verifica y se declara.
  - Una iniciativa de incidencia quiere apoyarse en una verificación publicada: no procede.

### Sección 2 · Metodología

Objetivo: explicar el método punto por punto, de forma que quien lea pueda entender y reproducir el proceso. En la web pública los roles se nombran por su función («persona revisora no vinculada»), nunca con nombres del equipo.

Recurso narrativo: **el recorrido de una pieza**. Un expediente ficticio, OV-2026-0000, atraviesa las nueve fases, y en cada una la persona ve qué se hace, qué garantía del Código se cumple y qué queda registrado.

Contenido mínimo de las nueve fases:

1. **Monitorización y escucha activa.** Canales automatizados (transparencia del Gobierno y del Parlamento de Canarias, observatorio de medios y redes sociales de Meta), canales internos (formulario, correo, WhatsApp, Telegram y teléfono) y vigilancia manual de medios y redes. Cada detección pasa por revisión humana.
2. **Selección y priorización.** Tres vías de entrada: influenciabilidad (poder o alcance de quien afirma), viralidad (orientativamente, desde 1.000 «me gusta», 500 comentarios o compartidos o 10.000 reproducciones, para una población de 2,2 millones de personas) y peligrosidad (riesgo de daño, que prevalece sobre las otras dos). Después, el filtro de verificabilidad: se verifican datos, fuentes, normas y hechos, y no principios, valores, promesas ni predicciones, porque otra persona que repita el proceso debe llegar a un resultado muy parecido. Una segunda persona revisa cada decisión y todo descarte queda registrado con su motivo.
3. **Investigación y verificación.** Regla de oro: al menos dos fuentes para la afirmación central, primarias siempre que sea posible, y evidencia a favor y en contra antes de calificar. Consulta a las partes con un plazo de réplica de 48 horas, personas expertas con credenciales acreditadas y conflictos declarados, técnicas audiovisuales (búsqueda inversa, geolocalización, metadatos y detección de manipulación) y análisis cuantitativo con código para garantizar la replicabilidad.
4. **Redacción.** Lenguaje preciso y no emotivo, conclusión al principio, un máximo de 1.500 palabras y las secciones mínimas de la ficha: calificación y resumen, afirmación literal, por qué se verifica, evidencia, fuentes, método, conflictos de interés, réplica, protección de personas y correcciones.
5. **Revisión editorial.** Una persona no vinculada a la investigación ni a la selección emite un dictamen motivado: publicable, devolución para subsanar o no publicable. Existen una segunda revisión y un estado de suspensión, que nunca se usa por falta de calidad. Los plazos se leen de la configuración (apartado 11) porque están pendientes de validar.
6. **Calificación.** La asigna la persona revisora con la escala de cuatro categorías, las cuatro preguntas de decisión y los casos frontera.
7. **Publicación y distribución.** Web, marcado ClaimReview, redes, boletines, WhatsApp y Telegram, y respuesta a quien reportó el contenido.
8. **Corrección de errores.** Nota visible en la propia pieza y nunca borrado silencioso; la versión original se conserva en PDF en la misma página, y hay un canal público para pedir correcciones.
9. **Archivo y trazabilidad.** Captura del original y de cada prueba en el momento de uso, copia local y archivo público (Wayback Machine), huella SHA-256 y archivos que no se modifican nunca.

Escala de calificación, en la que el juicio recae siempre sobre la afirmación y nunca sobre la persona:

| Valor | Categoría | Definición |
|---|---|---|
| 1 | Falso | La afirmación o el contenido no se corresponden con los datos disponibles; incluye imágenes generadas con IA o atribuidas a hechos ajenos |
| 2 | Engañoso | Mezcla datos correctos con elementos falsos que cambian su sentido |
| 3 | Contexto | Los datos pueden ser correctos, pero falta información necesaria para entender la afirmación o el asunto sigue abierto |
| 4 | Verdadero | La afirmación es rigurosa y completa, sin que le falten datos ni contexto |

Preguntas de decisión, en orden, de modo que la primera respuesta afirmativa decide la categoría:

1. ¿La evidencia contradice la afirmación central, o la imagen o el vídeo son falsos o están fuera de contexto? Falso.
2. ¿La afirmación mezcla datos correctos con elementos falsos que cambian su sentido? Engañoso.
3. ¿Los datos son correctos, pero falta información necesaria o el asunto sigue abierto? Contexto.
4. ¿La afirmación es exacta y completa? Verdadero.

Bloques adicionales:

- **Protocolo de emergencia.** Test de activación (contenido verificable y posible daño en horas o pocos días), recorrido máximo de unas 20 horas sin devoluciones y el principio de que, si vence un plazo, la pieza sale de la vía urgente y nunca se publica con garantías reducidas. Lista de garantías que se mantienen: revisión por persona distinta de la autora, dos fuentes, evidencia a favor y en contra, protección de personas, réplica con margen corto y archivo de pruebas.
- **Independencia en la selección.** Las prioridades de incidencia no son criterio de selección y nadie de la fundación puede encargar una verificación fuera del cauce ordinario.
- **Descarga de la metodología completa** en PDF [pendiente].
- **Interacción propia: «Pon a prueba la escala».** Seis casos frontera; la persona elige la calificación y recibe la explicación:
  - Cifra real, pero de otro año o territorio, presentada como actual: Engañoso.
  - Cifra exacta que omite que el procedimiento sigue abierto: Contexto.
  - «Casi un 15 %» para un dato oficial del 14,6 %: Verdadero, porque el redondeo es razonable.
  - Fotografía real de otro lugar o de otra fecha: Falso.
  - Afirmación con partes ciertas y partes falsas: se califica según la parte central.
  - Promesa, predicción u opinión: no se califica, porque se descarta en la selección.

### Sección 3 · Envía un contenido

Objetivo: que enviar un contenido sea fácil desde cualquier dispositivo, que cada persona sepa qué puede esperar y que el contenido llegue por el canal más adecuado.

- **Invitación y expectativas.** Qué se verifica (datos, cifras, normas, hechos, imágenes y vídeos) y qué no (opiniones, valores, promesas y predicciones), con el compromiso de responder siempre, también cuando un contenido se descarta, explicando el motivo.
- **Interacción propia: «¿Esto se puede verificar?».** Seis enunciados genéricos, sin personas reales y sin temas que refuercen estigmas, que la persona clasifica como verificables o no. En móvil se desliza la tarjeta hacia un lado u otro; en escritorio se usan botones, y con teclado, las flechas. Ejemplos: «La lista de espera se ha reducido un 20 % este año» (verificable), «Nuestro modelo es el mejor de Europa» (valoración), «El año que viene construiremos 5.000 viviendas» (promesa), «La ley obliga a resolver en seis meses» (verificable) y «Esta foto muestra la inundación de ayer en [municipio]» (verificable).
- **Triaje guiado en tres pasos.** Primero, qué quiere revisar la persona (mensaje reenviado o audio, publicación en redes, declaración de un cargo público, foto o vídeo, dato o cifra); segundo, si puede causar daño a alguien en horas o pocos días; tercero, el canal recomendado con su motivo y el resto de canales como alternativa:
  - WhatsApp, para cadenas, audios e imágenes que circulan por mensajería, que se reenvían tal cual. La respuesta automática muestra la información básica y pide aceptación escribiendo «ACEPTO».
  - Formulario web, para enlaces con contexto.
  - Teléfono, para quien prefiere explicarlo de viva voz o no usa canales digitales; se lee la información básica al inicio de la llamada.
  - Telegram y correo electrónico.
  - Instagram, Facebook y TikTok, mediante mención o mensaje directo. Diséñalos completos, pero márcalos en la configuración como `activo: false` y en la interfaz como «Canal pendiente de activación», porque la política de protección de datos y el registro de actividades de tratamiento todavía no los incluyen.
- **Riesgo inmediato para una persona.** Si en el segundo paso la persona indica un riesgo inmediato, el primer mensaje es llamar al 112. Después se explica que el servicio prioriza esos contenidos con un protocolo de emergencia, sin sustituir a los servicios de emergencia.
- **Qué pasa después.** Línea de tiempo: registro, evaluación por dos personas, investigación si se admite y respuesta en todos los casos.
- **Formulario de demostración.** Campos: contenido (texto, enlace o archivo), contexto opcional, nombre o alias opcional y medio de contacto opcional, que solo se usa para responder. Antes del envío, primera capa de información visible (responsable: ODESOCAN; finalidad: valorar y, en su caso, verificar el contenido y responder; base jurídica: consentimiento; conservación: [90 días] si no se verifica y datos de contacto [6 meses] desde la respuesta; derechos ante info@odesocan.org; enlace a la política completa) y casilla obligatoria con este texto: «He leído esta información, acepto el tratamiento de mis datos para esta finalidad y tengo 14 años o más». Casilla separada y opcional para recibir el boletín. Avisos: no incluir datos de salud, ideología u otras categorías especiales que no sean imprescindibles, y este canal no es un sistema de información de la Ley 2/2023 de protección de las personas informantes. **El formulario no envía nada**: intercepta el envío y muestra una confirmación simulada, marcada como demostración, y ningún dato sale del navegador.
- **Pedir una corrección.** Acceso directo al canal de correcciones (artículo 3.3.G del Código).

### Sección 4 · Portal de verificaciones

Objetivo: mostrar la actividad del servicio de forma honesta y permitir explorar todas las verificaciones publicadas.

- **Aviso permanente** mientras no haya verificaciones reales: «Datos de ejemplo. El servicio aún no ha publicado verificaciones».
- **Indicadores principales:**
  - Total de verificaciones publicadas.
  - Distribución por calificación: barras horizontales con los colores de la escala, cada una con su cifra absoluta y su porcentaje.
  - Temáticas más analizadas: barras horizontales en un único tono neutro, para no asociar colores a temas.
  - Opcionales, si encajan en el diseño: evolución mensual, porcentaje de piezas con réplica ofrecida y respondida, distribución por isla y embudo de contenidos recibidos, admitidos y publicados.
  - Al pulsar una barra se aplica ese filtro en el explorador, y cada gráfico tiene una alternativa en tabla accesible.
  - No se muestra la adscripción política de las emisoras, porque ese análisis corresponde al informe de balance anual, con su contexto y sus cautelas. Anótalo en `docs/decisiones.md` como decisión revisable.
- **Explorador.** Filtros por fecha (atajos de último mes, últimos tres meses, último año y todo, más un rango personalizado), calificación (selección múltiple), temática (selección múltiple) y búsqueda libre. El estado de los filtros se refleja en la URL para poder compartir una vista; el número de resultados se anuncia con `aria-live`, y el estado vacío ofrece limpiar los filtros.
- **Tarjeta.** Titular con el dato verificado, nunca la afirmación falsa; calificación; fecha; temática; isla; tipo de emisora e identificador en mono (OV-AAAA-NNNN).
- **Ficha de verificación**, en este orden: calificación y resumen; nota de corrección o actualización, si existe, visible arriba; afirmación literal con tipo de emisora, fecha, canal y enlace archivado; por qué se verifica y qué parte es verificable; evidencia a favor y en contra; fuentes con su tipo (primaria o secundaria) y fecha de consulta; método y replicabilidad (indicador, definición, serie y enlace al código); conflictos de interés; réplica ofrecida y respuesta; historial de versiones con enlace a la versión original en PDF; enlaces a la escala y a la política de correcciones; y opción de compartir.
- **Registro de correcciones.** Tabla filtrable que lee una URL de CSV configurable (`CORRECCIONES_CSV_URL`, correspondiente a la hoja de Google publicada) y usa datos de ejemplo mientras tanto. Si se te facilita el archivo `odesocan_verifica_registro_correcciones.html`, reutiliza su lógica de lectura y filtrado.
- **Informes de balance**: enlace [pendiente].

### Transparencia

Usa texto real donde exista y marcadores [entre corchetes] donde falte el dato, sin inventar nunca un dato:

- **Quiénes somos y control editorial.** Estructura del servicio; quién ejerce el control editorial y cómo (revisión por persona no vinculada y papel de la dirección limitado a la consulta por riesgo jurídico, a funciones organizativas y, cuando se le asigne, a la investigación jurídica, sin capacidad de modificar contenidos ni calificaciones); equipo con cargos y trayectoria [pendiente].
- **Titularidad y estatuto jurídico**, según el modelo del anexo 4 del Código: Fundación Canaria Observatorio de Derechos Sociales de Canarias, CIF G75744482, domicilio en calle Pérez Díaz, 56, 38380 La Victoria de Acentejo (Santa Cruz de Tenerife), entidad fundadora ACUFADE y número de registro [pendiente].
- **Gobernanza**, según el modelo del anexo 5: Patronato y sus funciones [nombres pendientes] y estatutos en PDF [pendiente].
- **Financiación**, según el modelo del anexo 8: ingresos del último ejercicio cerrado y fuentes principales [pendiente], mecanismos de independencia editorial, compromisos no remunerados y bienes o servicios recibidos que superen el 5 % de los ingresos netos.
- **Independencia y no partidismo.** Resumen de las directrices de independencia y enlace al documento [pendiente].
- **Política de correcciones.** Cómo se piden, cómo se valoran y cómo se publican, con enlace al registro.
- **Protección de datos.** Enlace a la política.

### Pie de página

Datos de registro de la entidad y enlaces a Transparencia, política de correcciones, protección de datos, contacto (info@odesocan.org) y redes de ODESOCAN (X @ODESOCAN, Instagram @odesocan, Facebook OdesocanDerechosSociales y TikTok [pendiente]).

## 8. Concepto visual y experiencia inmersiva

### La idea: la mira

El logotipo de ODESOCAN es un círculo con un punto central y cuatro marcas cardinales, es decir, una mira. Úsala como hilo conductor de toda la experiencia: la mira es el gesto de verificar, el de enfocar lo que circula hasta que se vuelve legible y se puede contrastar, y acompaña a la persona de sección en sección.

Regla de fondo, que conecta el diseño con los criterios de lenguaje del servicio: **el ruido nunca se lee completo; lo que se lee nítido es el dato verificado.** En el hero, el ruido son fragmentos desenfocados e ilegibles (líneas y bloques que sugieren texto, sin ningún bulo legible), y dentro de la mira aparecen nítidas las referencias que sostienen una verificación: fuentes, fechas de consulta e identificadores de series. Así el diseño no amplifica la desinformación que pretende contrastar.

La mira se transforma entre secciones mediante transiciones de elemento compartido (`layoutId` de Motion o View Transitions API, con alternativa sin animación):

- En Inicio, enfoca el ruido.
- En Qué es verificar, se abre y contiene la definición.
- En Metodología, recorre la línea de las nueve fases y se detiene en cada una.
- En Envía un contenido, se convierte en el foco del triaje.
- En el portal, se convierte en el control que filtra los datos.

### Principios de movimiento

- Concentra la audacia en un solo elemento, la mira, y mantén el resto sobrio: nada de entradas con fundido y desplazamiento en cada bloque ni efectos en cada tarjeta.
- Como máximo, un momento orquestado por sección; el resto del movimiento responde a acciones de la persona (abrir, filtrar, confirmar) y muestra qué ha cambiado.
- Sin secuestro del desplazamiento: las animaciones vinculadas al scroll siguen el desplazamiento nativo.
- Con `prefers-reduced-motion`, cada animación tiene una versión estática equivalente que conserva toda la información, y ningún movimiento automático dura más de cinco segundos sin un control para pausarlo.

### Escritorio y móvil, cada uno con su carácter

| Elemento | Escritorio | Móvil |
|---|---|---|
| Hero | La mira sigue el puntero y enfoca lo que toca | La mira queda fija y el ruido la atraviesa al desplazarse; un toque enfoca |
| Navegación | Barra superior con las cuatro secciones e índice de lectura | Barra inferior de cuatro pestañas al alcance del pulgar |
| Metodología | Scrollytelling con el gráfico del recorrido fijo y los pasos desplazándose | Historias horizontales a pantalla completa, con barras de progreso arriba, deslizamiento y toque |
| Envía un contenido | Triaje en paneles | Pasos a pantalla completa, botones grandes y enlaces directos a las aplicaciones (`wa.me`, `tel:`, `t.me`, `ig.me`, `m.me`) |
| Portal | Filtros visibles en una columna lateral | Filtros en una hoja inferior y tarjetas a pantalla completa |
| Compartir | Copiar enlace | Menú nativo con `navigator.share` |

El móvil no es una versión comprimida del escritorio: diséñalo primero y como experiencia propia, porque buena parte de la desinformación circula por WhatsApp y redes sociales y se consulta desde el teléfono.

## 9. Sistema visual

La base es el sistema `.np` de `odesocan-publicaciones`, para que la sección se reconozca como parte de odesocan.org.

```css
--ov-tinta:      #1a1a24;  /* titulares, sumarios, strong */
--ov-cuerpo:     #2b2b38;  /* texto corrido */
--ov-muted:      #7a8898;  /* metadatos */
--ov-teal:       #00c8b4;  /* único acento editorial */
--ov-teal-hover: #00b0a0;
--ov-navy:       #0d1b2a;  /* momentos inmersivos y caja de la afirmación */
--ov-claro:      #f8f9fb;  /* texto sobre navy */
--ov-linea:      rgba(0,0,0,.08);

/* Escala de calificación: solo en insignias, gráficos y filtros */
--ov-falso:      #FF4757;
--ov-enganoso:   #F97316;
--ov-contexto:   #D4940A;
--ov-verdadero:  #00C8B4;
```

- Los colores de la escala solo aparecen donde hay una calificación (insignias, gráficos y filtros); el texto editorial mantiene el teal como único acento, como pide el sistema `.np`. Comprueba el contraste de cada insignia y usa texto oscuro cuando el blanco no alcance el nivel AA. Cada categoría lleva además un icono o una forma propia, porque el color nunca puede ser el único portador del significado.
- Temáticas e islas en un único tono neutro.
- Tipografía: IBM Plex Sans (300, 600 y 700), IBM Plex Mono y DM Serif Display en cursiva, alojadas en el propio proyecto con `@fontsource` en lugar de cargarlas desde Google Fonts, para no transferir a terceros datos de quien visita la web.
- Correspondencia semántica: el **dato verificado** se compone como el sumario de `.np` (IBM Plex Sans 700, el elemento más grande, con borde teal); la **afirmación literal** va en DM Serif Display cursiva sobre caja navy, como la voz citada del sistema; identificadores, fechas, fuentes y metadatos van en IBM Plex Mono.
- Todas las clases llevan el prefijo `.ov-` y todas las variables `--ov-`, sin selectores globales fuera de un reset acotado a la raíz de la aplicación, para que el código pueda portarse a WordPress sin chocar con el tema.

## 10. Reglas de redacción

- Todo el texto va en castellano y conforme a `odesocan-escritura`: nunca raya como puntuación dentro de la prosa, subtítulos separados del párrafo que los desarrolla, oraciones que integran dato, fuente y razonamiento, ninguna sentencia corta de juicio de valor y una fuente para cada afirmación sustantiva.
- Criterios de lenguaje del servicio:
  - Se califica la afirmación y nunca a la persona, sin atribuir intenciones y con verbos de atribución neutros (afirmó, dijo, publicó).
  - Los titulares contienen el dato verificado y no repiten la afirmación falsa, ni siquiera entre comillas o en forma de pregunta.
  - Las cifras llevan coma decimal y espacio antes del símbolo de porcentaje (14,6 %), los valores absolutos acompañan a los relativos y el periodo de referencia es explícito.
  - Lenguaje inclusivo por colectivización (la ciudadanía, la persona revisora, quienes envían un contenido), sin desdoblamientos ni arrobas.
  - «Verificación» en lugar de *fact-checking*; si aparece el anglicismo, va en cursiva.
  - Lenguaje no estigmatizante, por ejemplo «personas migrantes en situación administrativa irregular».
- Los microtextos van en voz activa y con verbos que digan qué ocurre: «Enviar contenido», «Ver la ficha», «Limpiar filtros».
- Todo el texto es un borrador pendiente de revisión por el equipo de ODESOCAN. Señala en `docs/decisiones.md` los textos que requieren una comprobación más cuidadosa.

## 11. Datos de ejemplo, contrato de datos y configuración

Crea datos de ejemplo en `public/data/verificaciones.json`, entre 24 y 36 verificaciones con calificaciones, temáticas, islas y fechas variadas, para que los gráficos y los filtros se puedan probar. Reglas:

- Todas son ficticias y se marcan como ejemplo. Ninguna menciona a personas, partidos ni cuentas reales: la emisora se describe solo por su tipo («cargo público autonómico», «cuenta en redes sin relevancia pública»).
- Las temáticas iniciales se definen en `src/config/materias.js`, para sustituirlas después por la lista definitiva del registro maestro: vivienda, dependencia, sanidad, educación, empleo, pobreza y exclusión, igualdad, servicios sociales, migraciones y medio ambiente.
- Islas: El Hierro, La Palma, La Gomera, Tenerife, Gran Canaria, Fuerteventura, Lanzarote, La Graciosa y «Canarias» para el ámbito autonómico.

Contrato de datos de cada verificación:

```json
{
  "id": "OV-2026-0001",
  "ejemplo": true,
  "titular": "Dato verificado, nunca la afirmación falsa",
  "resumen": "Una o dos oraciones con el dato verificado y su fuente",
  "calificacion": { "valor": 1, "etiqueta": "Falso" },
  "afirmacion": {
    "texto": "Cita literal",
    "tipo_emisora": "Cargo público autonómico",
    "fecha": "2026-10-12",
    "canal": "X",
    "enlace_archivado": "https://web.archive.org/..."
  },
  "materia": "Vivienda",
  "isla": "Canarias",
  "ambito": "Autonómico",
  "fecha_publicacion": "2026-10-15",
  "via_entrada": ["influenciabilidad"],
  "por_que": "Interés público y parte verificable",
  "evidencia": { "a_favor": ["..."], "en_contra": ["..."] },
  "fuentes": [
    { "organismo": "INE", "titulo": "...", "url": "...", "tipo": "primaria", "fecha_consulta": "2026-10-13" }
  ],
  "metodo": { "indicador": "...", "definicion": "...", "serie": "...", "codigo_url": "..." },
  "conflictos": "Sin conflictos de interés que declarar",
  "replica": { "ofrecida": true, "fecha_solicitud": "2026-10-13", "respuesta": "Sin respuesta en el plazo de 48 horas" },
  "correcciones": [
    { "fecha": "2026-10-20", "tipo": "correccion", "nota": "...", "cambia_calificacion": false, "version_original_pdf": "..." }
  ],
  "emergencia": false
}
```

- Los datos públicos nunca incluyen campos internos: nombres del equipo, personas revisoras, datos de quien reporta, candidatas descartadas ni adscripción política.
- Toda la lectura de datos pasa por un adaptador (`src/data/fuente.js`), de modo que el JSON pueda sustituirse por un CSV publicado de Google Sheets o por una consulta a Supabase sin tocar los componentes.
- El marcado ClaimReview (schema.org) se genera desde el contrato de datos, con `reviewRating` de 1 a 4 (`worstRating: 1`, `bestRating: 4`) y la etiqueta en `alternateName`. En el prototipo no se inyecta en la página, porque los datos son ficticios: se muestra en la ficha como bloque de código plegable y se activa con una variable de entorno (`VITE_CLAIMREVIEW=on`).

Configuración centralizada en `src/config/`:

- `URL_BASE`, pendiente de decidir entre subdirectorio (odesocan.org/verifica) y subdominio (verifica.odesocan.org).
- Contactos y canales, cada uno con su estado `activo`: teléfono del canal [pendiente; el teléfono general de ODESOCAN es 621 267 948, confirmar si es el mismo], número de WhatsApp [pendiente], usuario de Telegram [pendiente], correo info@odesocan.org, Instagram @odesocan, Facebook OdesocanDerechosSociales y TikTok [pendiente].
- Plazos de la metodología con un indicador `pendiente: true` que la interfaz muestre como «[plazo pendiente de validar]»: dictamen de revisión [24 h laborables], subsanación [24 h] más nuevo dictamen [24 h], solicitud de segunda revisión [24 h] más dictamen definitivo [24 h], suspensión máxima [5 días laborables] y revisión urgente [pendiente, porque la metodología fija 4 horas y el protocolo de emergencia 12]. El plazo de réplica es de 48 horas.
- Plazos de conservación de la primera capa: [90 días] y [6 meses].
- `CORRECCIONES_CSV_URL`, `POLITICA_CORRECCIONES_URL`, `POLITICA_DATOS_URL` y `METODOLOGIA_PDF_URL`.

## 12. Stack técnico y calidad

- Vite y React 18, con React Router en modo `HashRouter` para que todas las rutas funcionen en GitHub Pages, y `base` de Vite igual a `/web-odesocan/`.
- Motion (framer-motion) para transiciones y elementos compartidos, y View Transitions API donde esté disponible, con alternativa.
- D3 para los gráficos, con transiciones propias y alternativa en tabla.
- CSS propio con variables y prefijo `.ov-`, sin Tailwind ni kits de interfaz, para que el código sea legible y portable.
- Versiones exactas en `package.json`, dependencias mínimas y carga diferida del portal y de D3.
- Sin analítica, sin cookies y sin incrustaciones de terceros (las redes se enlazan, no se incrustan). Incluye `<meta name="robots" content="noindex, nofollow">` y un `robots.txt` que bloquee la indexación, porque el prototipo contiene verificaciones ficticias que no deben aparecer en buscadores.
- Accesibilidad WCAG 2.2 AA: navegación completa por teclado, foco visible, enlace para saltar al contenido, landmarks, encabezados sin saltos, `lang="es"`, objetivos táctiles de al menos 44 px, contraste comprobado y textos alternativos.
- Objetivos: Lighthouse en móvil con rendimiento de 90 o más y accesibilidad de 95 o más, y ninguna infracción grave o crítica en axe-core.
- Comprobación visual con Playwright a 360, 390, 768, 1024 y 1440 px de ancho, con capturas de cada sección en modo normal y con movimiento reducido. Revisa tú las capturas, critica el resultado contra este encargo y corrige antes de entregar.

## 13. Repositorio y publicación

Trabaja por fases y detente en los puntos de control.

**Fase 0 · Reconocimiento y plan (punto de control).**

1. Comprueba la autenticación (`gh auth status`), la visibilidad y la rama por defecto del repositorio (`gh repo view Odesocan/web-odesocan --json visibility,defaultBranchRef`) y, si tienes permisos, el plan de la organización.
2. Clona el repositorio y resume su contenido: estructura, últimos commits, tecnologías y cualquier archivo sensible (`.env`, claves, tokens o datos personales). Si está disponible, ejecuta `gitleaks` sobre el historial.
3. Redacta el plan de diseño: tokens, concepto, wireframes en ASCII de cada sección en escritorio y en móvil, y principios. Revísalo contra este encargo y corrige cualquier parte que suene a plantilla genérica, explicando qué has cambiado y por qué.
4. Presenta el resumen del repositorio y el plan, y **espera confirmación** antes de borrar nada.

**Fase 1 · Copia de seguridad y limpieza.**

1. Crea y sube una rama de archivo con el estado actual (`archivo/web-anterior`) y una etiqueta anotada (`archivo-pre-verifica-AAAAMMDD`). El historial no se reescribe.
2. Crea la rama de trabajo `propuesta/odesocan-verifica` y elimina en ella todo el contenido anterior con `git rm -r`, conservando solo lo que se acuerde, por ejemplo la licencia.

**Fase 2 · Construcción.** Por secciones, con commits pequeños y mensajes descriptivos en castellano. Orden sugerido: tokens y estructura, navegación, Inicio, portal y datos, metodología, canal, Qué es verificar y Transparencia.

**Fase 3 · Revisión.** Capturas, axe-core, Lighthouse, autocrítica y correcciones.

**Fase 4 · Publicación (punto de control).**

- Configura GitHub Pages con un flujo de GitHub Actions (`actions/upload-pages-artifact` y `actions/deploy-pages`) que construya y despliegue la aplicación.
- En organizaciones con el plan gratuito, GitHub Pages solo funciona con repositorios públicos. Si el repositorio es privado y el plan no lo permite, **no cambies la visibilidad**: presenta las opciones y espera una decisión. La primera es hacerlo público tras revisar que el historial no contiene nada sensible, sabiendo que el historial anterior también quedará a la vista. La segunda es crear un repositorio público nuevo solo con el trabajo nuevo, sin historial anterior. La tercera es mantenerlo privado, invitar a la persona diseñadora como colaboradora y ejecutar el modelo en local.
- Abre una pull request de `propuesta/odesocan-verifica` hacia la rama por defecto, con un resumen del trabajo, capturas y la lista de pendientes.

**Fase 5 · Entrega.** `README.md`, `docs/decisiones.md` y `docs/encargo.md` completos, con la URL publicada en el README.

## 14. Criterios de aceptación

- [ ] Las cuatro secciones, la capa de Transparencia y la ficha de verificación están completas y son navegables en escritorio y en móvil.
- [ ] Cada requisito del apartado 6 tiene su sitio en la web.
- [ ] La mira funciona como hilo conductor y todas las animaciones tienen versión reducida.
- [ ] El móvil tiene navegación, metodología, canal y portal con interacciones propias.
- [ ] Ningún texto legible reproduce un bulo y ningún titular repite una afirmación falsa.
- [ ] Ninguna persona, partido o cuenta real aparece en los datos de ejemplo, y el portal avisa de que son de ejemplo.
- [ ] El formulario no envía datos fuera del navegador y los canales no activos están marcados.
- [ ] Ningún dato pendiente se ha inventado: todos figuran como [pendiente] y en `docs/decisiones.md`.
- [ ] La web no afirma ser miembro de la EFCSN ni usa su logotipo.
- [ ] No hay raya como puntuación en ningún texto de la interfaz.
- [ ] Todas las clases y variables llevan el prefijo `.ov-` o `--ov-`, sin selectores globales.
- [ ] La web incluye `noindex`, no tiene analítica ni cookies y aloja sus tipografías.
- [ ] Lighthouse y axe-core cumplen los objetivos y las capturas se han revisado.

## 15. Pendientes que el modelo debe dejar visibles

Registra en `docs/decisiones.md`, con su ubicación en el código, al menos estos pendientes del equipo:

- Teléfono y WhatsApp del canal, usuario de Telegram y cuenta de TikTok.
- Incorporación de Instagram, Facebook y TikTok como canales de recepción a la política de protección de datos y al registro de actividades de tratamiento antes de activarlos.
- Dirección definitiva de la sección; la política de protección de datos cita una dirección que habrá que corregir cuando se decida.
- Nombres, cargos y trayectoria del equipo, composición del Patronato, número de registro de la fundación, estatutos en PDF, ingresos y fuentes de financiación, versión pública de la metodología en PDF y política de correcciones.
- Plazos entre corchetes y la discrepancia de 4 o 12 horas en la revisión urgente.
- Redacción exacta de la relación con la EFCSN.
- Lista definitiva de temáticas.
- Decisiones revisables: el título «Qué es verificar», la ausencia de adscripción política en el portal y los indicadores opcionales elegidos.

# Decisiones de diseño, alternativas descartadas y pendientes

Modelo web de Odesocan Verifica. Borrador del 3 de noviembre de 2026, pendiente de revisión por el equipo de ODESOCAN. Todo el texto de la interfaz es un borrador de trabajo, y ninguna cifra de los datos de ejemplo es real.

El plan de diseño que se aprobó en el punto de control de la fase 0 está en [`plan-fase-0.md`](plan-fase-0.md). Este documento recoge lo que se decidió después, lo que se descartó y lo que falta.

## 1. Cambios respecto al encargo

| Encargo | Qué se hizo | Motivo |
|---|---|---|
| Publicar desde `Odesocan/web-odesocan` (privado) | El modelo vive en el repositorio público nuevo `Cristianodesocan/odesocan-verifica` | Decisión del equipo en el punto de control de la fase 0: el repositorio original es privado y GitHub Pages no se pudo garantizar con el plan de la organización |
| Rama `archivo/web-anterior`, etiqueta `archivo-pre-verifica-AAAAMMDD` y `git rm -r` del contenido anterior | No se hicieron | El repositorio nuevo nació vacío y `web-odesocan` queda intacto, así que no hay nada que archivar ni borrar. En `web-odesocan` solo se añadió el plan de la fase 0 en la rama `claude/fervent-allen-wvrc8h` |
| `base` de Vite igual a `/web-odesocan/` | `/odesocan-verifica/`, configurable con `VITE_BASE` | Es la ruta en la que GitHub Pages sirve el repositorio nuevo (`vite.config.js`) |
| `HashRouter` | `createHashRouter` de React Router 7 | Es el mismo modo de enrutado por hash, en la versión que admite transiciones de vista (`src/rutas.jsx`) |
| Registro de correcciones con la lógica de `odesocan_verifica_registro_correcciones.html` | Lector de CSV propio (`src/data/csv.js` y `src/data/correcciones.js`) | El archivo no llegó a esta sesión, que se ejecuta en la nube y no tiene acceso al ordenador del equipo. Si se facilita, conviene contrastar los nombres de columna con `COLUMNAS` en `src/data/correcciones.js` |

## 2. Decisiones de diseño

### Concepto

- **La mira como instrumento y la página como documento anotado.** Además de la mira, el segundo rasgo propio son las notas al margen (`src/componentes/NotaMargen.jsx`), que dicen de dónde sale cada afirmación de la interfaz: un artículo del Código, un documento del servicio o un artículo de los Estatutos. En escritorio se leen en la columna derecha; en móvil, con el botón «Ver la fuente».
- **Iconografía de la escala como estados de la mira** (`src/componentes/GlifoEscala.jsx`): Verdadero es la mira completa, Contexto el anillo abierto, Engañoso el punto desplazado y Falso la mira tachada. Así el color nunca es el único portador del significado.
- **Regla del ruido.** El ruido del hero son formas sin un solo carácter (`src/secciones/inicio/ruido.js`); dentro de la mira solo se leen tipos de evidencia (fuente primaria, fecha de consulta, huella SHA-256), nunca afirmaciones.

### La mira en cada sección

| Sección | Qué hace | Dónde está |
|---|---|---|
| Inicio | Sigue el puntero en escritorio (un clic la amplía, un botón la mueve con el teclado); en móvil queda fija y el ruido la atraviesa con el desplazamiento nativo, y un toque la amplía | `src/secciones/inicio/HeroMira.jsx` |
| Qué es verificar | Llega cerrada y se abre en dos arcos que enmarcan la definición | `src/secciones/que-es/DefinicionAbierta.jsx` |
| Metodología | Se desliza por la línea de las nueve fases (`layoutId` de Motion) | `src/secciones/metodologia/Recorrido.jsx` |
| Envía un contenido | Es el foco del triaje: se cierra sobre la opción elegida y pasa de un paso a otro | `src/secciones/envia/Triaje.jsx` |
| Portal | Es el control de filtros: el número de resultados en el centro y una marca cardinal encendida por cada dimensión filtrada (norte, fecha; este, calificación; sur, temática; oeste, búsqueda) | `src/secciones/portal/MiraControl.jsx` |

Las transiciones entre secciones usan View Transitions API mediante la propiedad `viewTransition` de los enlaces (`src/componentes/Enlace.jsx`): cada página tiene un único elemento con `view-transition-name: ov-mira`. En navegadores sin soporte la navegación es inmediata, y con `prefers-reduced-motion` las transiciones se anulan (`src/estilos/raiz.css`). Dentro de cada página, Motion se carga de forma diferida (`src/componentes/Movimiento.jsx`) con `MotionConfig reducedMotion="user"`, de modo que con movimiento reducido todos los elementos aparecen directamente en su estado final.

### Movimiento

Hay un único momento orquestado por sección: el enfoque del hero, la apertura de la mira en Qué es verificar, el primer desplazamiento de la mira en la línea de fases, la aparición del foco del triaje y el crecimiento de las barras del portal. El resto del movimiento responde a una acción. No hay ningún movimiento automático que dure más de cinco segundos, así que no hace falta un control de pausa, y las historias de la metodología no avanzan solas.

### Tokens añadidos al sistema `.np`

Los colores del encargo se mantienen. Se añadieron estos tokens por contraste o por necesidad de composición (`src/estilos/tokens.css`):

| Token | Valor | Motivo |
|---|---|---|
| `--ov-muted-texto` | `#64707f` | `--ov-muted` (`#7a8898`) da 3,62:1 sobre blanco y no llega a AA para texto. El nuevo da 5,04:1. `--ov-muted` se usa solo sobre navy (4,81:1) y para líneas |
| `--ov-navy-2` | `#14273b` | Superficies dentro de un bloque navy (el disco de la mira, la fila elegida de un gráfico) |
| `--ov-neutro` | `#94a3b3` | Tono neutro único para temáticas e islas sobre navy (6,75:1) |
| `--ov-linea-fuerte` y `--ov-linea-navy` | `rgba(26,26,36,.22)` y `rgba(248,249,251,.14)` | Filetes y bordes de controles visibles sobre claro y sobre navy |

- Ninguna insignia lleva texto blanco: con blanco, ninguna de las cuatro llega a AA. Todas llevan texto y glifo en tinta (contrastes de 5,17 a 8,15:1).
- Sobre blanco, Engañoso, Contexto y Verdadero no alcanzan el 3:1 que se exige a los elementos gráficos, así que **los gráficos del portal van sobre un panel navy**, donde los cuatro colores superan 5:1.
- El teal nunca es color de texto sobre fondo claro (2,12:1). Los enlaces son tinta con subrayado teal.
- El cuerpo empieza en 16 px y no en 15 px como en `.np`, porque el peso 300 a 15 px pierde legibilidad en móvil.

### Composición y navegación

- Escritorio (≥ 1024 px): barra superior con las cuatro secciones y Transparencia, e índice de lectura a la izquierda en las páginas largas, en el que la mira marca el apartado en curso (`src/componentes/IndiceLectura.jsx`).
- Móvil y tableta (< 1024 px): barra inferior de cuatro pestañas de 64 px de alto con el glifo de cada sección (`src/componentes/BarraPestanas.jsx`). Transparencia queda en la cabecera y en el pie. La cabecera móvil se desplaza con la página para dejar más espacio, y la banda de prototipo queda fija, como pide el encargo.
- Cada apartado tiene ruta propia (`#/transparencia/financiacion`, `#/metodologia/escala`) porque con `HashRouter` no se pueden usar anclas `#`. El gancho `src/hooks/useApartado.js` lleva la vista al apartado y le da el foco.
- Al cambiar de página, el foco pasa al `h1` para que los lectores de pantalla anuncien el cambio (`src/componentes/Marco.jsx`). Esos destinos de foco programático no muestran contorno, porque no son controles.

### Envía un contenido

- **El triaje va antes de «¿Esto se puede verificar?»** y no después, como en el orden del encargo, porque es la tarea principal de la página y porque la mira de la sección anterior se transforma en su foco nada más llegar. La práctica de clasificar queda justo debajo.
- Canales con número pendiente (WhatsApp, teléfono, Telegram): se describen completos, pero no se genera el enlace hasta que haya número (`src/config/canales.js`). Instagram, Facebook y TikTok tienen `activo: false` y la interfaz los muestra como «Canal pendiente de activación».
- Si se indica un riesgo inmediato, la primera pantalla del paso 3 es un aviso con el botón «Llamar al 112».
- El formulario no envía nada: valida en el navegador, no usa `fetch` ni almacenamiento local, y la política de seguridad de contenidos de la build incluye `form-action 'none'` (`vite.config.js`), así que el navegador bloquearía cualquier envío real.

### Portal

- **Indicadores elegidos**: total (como frase, no como cifra destacada), distribución por calificación, temáticas, evolución de los últimos doce meses, réplica ofrecida y respondida, y distribución por isla.
- **Indicador descartado**: el embudo de contenidos recibidos, admitidos y publicados, porque necesita datos que el contrato público no tiene. Inventarlos rompería la regla de no inventar ningún dato. Decisión revisable.
- **No se muestra la adscripción política de las emisoras.** La propia página lo explica: ese análisis corresponde al informe de balance anual, con su contexto y sus cautelas. Decisión revisable.
- Los indicadores describen el conjunto completo y no cambian con los filtros. Al pulsar una barra de calificación o de temática se aplica ese filtro en el explorador (y se quita si se vuelve a pulsar), y la barra queda marcada con `aria-pressed`. Las barras de isla son solo de lectura, porque la isla no es uno de los filtros que pide el encargo.
- Cada gráfico tiene el botón «Ver como tabla», con una tabla accesible con los mismos datos.
- En móvil, el botón flotante de filtros (la mira) solo aparece con el explorador en pantalla, para no tapar los indicadores, y abre una hoja inferior hecha con `<dialog>` nativo.
- **Fecha de referencia de los atajos.** Mientras los datos sean de ejemplo, «último mes», «últimos tres meses» y «último año» se calculan desde el 3 de noviembre de 2026 (`FECHA_REFERENCIA_EJEMPLO` en `src/config/sitio.js`), para que los filtros sigan dando resultados aunque el prototipo se consulte meses después. Con datos reales se usa la fecha del sistema.
- Mientras cargan los datos, la página reserva el espacio y el aviso de datos de ejemplo ya está visible, para que nada se desplace al llegar (sin esta medida, Lighthouse medía un desplazamiento acumulado de 0,74).

### Ficha

- La afirmación literal solo aparece en la ficha, en la caja navy de voz citada y siempre después del dato verificado y de la calificación. Nunca aparece en titulares, tarjetas, metadatos ni en el texto para compartir, que es el titular.
- ClaimReview se genera desde el contrato (`src/data/claimreview.js`). Como las emisoras se describen por su tipo y no por su nombre, se omite `itemReviewed.author`; con datos reales lo decidirá el equipo. El marcado solo se inserta en la página con `VITE_CLAIMREVIEW=on`.
- «Pedir una corrección» abre un correo a info@odesocan.org con el identificador en el asunto. Es una solución provisional mientras no exista el canal definitivo de correcciones.

### Qué es verificar

- **El título «Qué es verificar» es una decisión revisable.** Sigue la preferencia de los criterios de lenguaje por «verificación»; *fact-checking* aparece en cursiva en el primer párrafo.
- El mapa del Código y los documentos conecta los cinco capítulos que cita el encargo (artículos 2 a 6) con los documentos del servicio. El artículo 1 (sistema de cumplimiento) y el 7 (evolución del Código) no se muestran porque no exigen nada en la web de un aspirante.
- En «Dos caminos», la afirmación es una pequeña mira que recorre su trazo; en móvil los trazos son verticales y la escena se lleva a la vista antes de empezar la animación.

### Datos de ejemplo

- Treinta verificaciones ficticias (`public/data/verificaciones.json`), validadas por `npm run validar:datos` (`pruebas/validar-datos.mjs`), que comprueba el contrato y los criterios de lenguaje: titulares con cifra y sin comillas, coma decimal, espacio de no separación antes de %, ausencia de rayas, de partidos y de cuentas.
- **Riesgo que vigilar:** las fuentes citan organismos reales (INE, ISTAC, SEPE, IMSERSO, Servicio Canario de la Salud…) con cifras inventadas, para que la ficha sea realista. Todas las URL apuntan a `example.org`, cada tarjeta y cada ficha llevan la marca de ejemplo, y la ficha avisa de que todo es inventado aunque los organismos existan. Aun así, conviene no difundir capturas fuera del equipo.
- Los municipios no se nombran («un municipio de Gran Canaria») para no atribuir datos inventados a ayuntamientos reales.
- Las afirmaciones literales son mundanas y numéricas, y las dos de Migraciones son administrativas (plazos de autorizaciones y presupuesto de un programa de inclusión), para no reproducir estereotipos.

### Privacidad y terceros

- Sin analítica, sin cookies y sin incrustaciones; las redes se enlazan. Las tipografías se alojan con `@fontsource` (solo el subconjunto latino).
- La build incluye una política de seguridad de contenidos que solo permite recursos del propio sitio (`vite.config.js`). Si se configura `VITE_CORRECCIONES_CSV_URL`, su origen se añade a `connect-src`.
- **Aviso:** leer la hoja de Google del registro de correcciones desde el navegador hace que cada visita contacte con Google. En producción conviene copiar el CSV al propio dominio, por ejemplo con una tarea programada en WordPress o en GitHub Actions.
- `noindex, nofollow` en `index.html` y `robots.txt` con `Disallow: /`.

## 3. Alternativas descartadas

| Alternativa | Por qué se descartó |
|---|---|
| Cuatro tarjetas iguales con icono para las secciones de Inicio | Kit de tarjetas genérico. Se usaron filas a todo el ancho con el glifo del estado de la mira |
| Iconos genéricos para la escala (✓, ✗, !, ?) | No dicen nada propio y el «?» sugiere duda, no contexto |
| Cifra grande de verificaciones con etiqueta pequeña | Es la solución por defecto de cualquier panel. El total va en una frase y dentro de la mira que filtra |
| Historias de la metodología con avance automático | Obligaría a un control de pausa y no deja leer a cada ritmo |
| `layoutId` de Motion para la transición entre rutas | Exige montar a la vez la página de origen y la de destino. View Transitions lo resuelve con menos código y deja una alternativa limpia |
| Gráficos sobre fondo blanco | Tres colores de la escala no llegan a 3:1 sobre blanco |
| Embudo de contenidos recibidos, admitidos y publicados | Necesita datos que no están en el contrato público |
| Modo oscuro | No lo pide el encargo y el sistema `.np` es claro. Los momentos navy ya cumplen esa función |
| Inventar un canal de correcciones o un procedimiento de valoración | Los documentos no estaban disponibles. Se marcó como pendiente |

## 4. Pendientes del equipo, con su ubicación

| Pendiente | Dónde se configura | Dónde se ve |
|---|---|---|
| Número de WhatsApp del canal | `src/config/canales.js`, canal `whatsapp` (`valor: null`) | Triaje del paso 3 |
| Teléfono del canal (confirmar si es el general, 621 267 948) | `src/config/canales.js`, canal `telefono` | Triaje del paso 3 |
| Usuario de Telegram | `src/config/canales.js`, canal `telegram` | Triaje del paso 3 |
| Cuenta de TikTok | `src/config/canales.js`, canal `tiktok` y `REDES` | Triaje y pie |
| Incluir Instagram, Facebook y TikTok en la política de protección de datos y en el registro de actividades de tratamiento antes de activarlos | `src/config/canales.js` (`activo: false`) | Triaje y Transparencia, Protección de datos |
| Dirección definitiva de la sección (subdirectorio o subdominio); la política de protección de datos cita una dirección que habrá que corregir | `src/config/sitio.js`, `SITIO.URL_BASE` (o `VITE_URL_BASE`) | URL de la ficha y de ClaimReview |
| Nombres, cargos y trayectoria del equipo | `src/secciones/transparencia/Transparencia.jsx`, apartado «Quiénes somos» | Transparencia |
| Composición del Patronato | `src/secciones/transparencia/Transparencia.jsx`, apartado «Gobernanza» | Transparencia |
| Nombre del registro y número de registro de la fundación | `src/config/sitio.js`, `ENTIDAD.registro` y `ENTIDAD.numero_registro` | Pie y Transparencia |
| Estatutos en PDF | `src/config/sitio.js`, `URLS.ESTATUTOS_PDF_URL` | Transparencia y nota de Qué es verificar |
| Ingresos del último ejercicio, fuentes de más del 5 %, otras fuentes relevantes, compromisos no remunerados y bienes o servicios recibidos | `src/secciones/transparencia/Transparencia.jsx`, apartado «Financiación» | Transparencia |
| Naturaleza del trabajo financiado por plataformas o fuentes públicas | Mismo archivo, apartado «Financiación» | Transparencia |
| Declaración de misión y valores | Mismo archivo, apartado «Independencia» | Transparencia |
| Directrices de independencia completas | `src/config/sitio.js`, `URLS.DIRECTRICES_INDEPENDENCIA_URL` | Transparencia |
| Versión pública de la metodología en PDF | `src/config/sitio.js`, `URLS.METODOLOGIA_PDF_URL` | Metodología |
| Criterios de lenguaje publicados | `src/config/sitio.js`, `URLS.CRITERIOS_LENGUAJE_URL` y `src/contenido/que-es.js` | Mapa del Código |
| Política de correcciones: canal definitivo, procedimiento de valoración y plazo de respuesta | `src/secciones/transparencia/Transparencia.jsx`, apartado «Correcciones», y `URLS.POLITICA_CORRECCIONES_URL` | Transparencia, ficha y Envía |
| Política de protección de datos completa | `src/config/sitio.js`, `URLS.POLITICA_DATOS_URL` | Formulario y Transparencia |
| Hoja publicada del registro de correcciones | `VITE_CORRECCIONES_CSV_URL` (o `URLS.CORRECCIONES_CSV_URL`) y `COLUMNAS` en `src/data/correcciones.js` | Registro de correcciones |
| Informes de balance | `src/config/sitio.js`, `URLS.INFORMES_BALANCE_URL` | Portal |
| Plazos entre corchetes (dictamen, subsanación, segunda revisión y suspensión) | `src/config/plazos.js` (`pendiente: true`) | Metodología |
| Plazo de la revisión urgente: la metodología fija 4 horas y el protocolo de emergencia, 12 | `src/config/plazos.js`, `revision_urgente` | Metodología, Protocolo de emergencia |
| Plazos de conservación de la primera capa ([90 días] y [6 meses]) | `src/config/plazos.js`, `CONSERVACION` | Formulario y Transparencia |
| Redacción exacta de la relación con la EFCSN | `src/secciones/que-es/QueEsVerificar.jsx`, apartado «El Código Europeo» | Qué es verificar |
| Aprobación por el Patronato de la declaración de no partidismo | `src/secciones/que-es/QueEsVerificar.jsx`, apartado «No partidismo» | Qué es verificar |
| Enlace al formulario de quejas de la EFCSN y activación del aviso cuando ODESOCAN sea miembro | `src/config/sitio.js`, `URLS.EFCSN_QUEJAS_URL` y `BANDERAS.EFCSN_MIEMBRO` | Transparencia, Correcciones (oculto) |
| Lista definitiva de temáticas | `src/config/materias.js` | Portal y datos |
| Confirmar que una fundación no tiene titulares de más del 5 % del capital | `src/secciones/transparencia/Transparencia.jsx`, apartado «Titularidad» | Transparencia |

Todos los huecos se pintan con el componente `src/componentes/Pendiente.jsx` (entre corchetes, en mono y con fondo rayado), y los plazos con `src/componentes/Plazo.jsx`, que añade «[plazo pendiente de validar]».

## 5. Decisiones revisables

1. El título «Qué es verificar».
2. La ausencia de la adscripción política de las emisoras en el portal.
3. Los indicadores opcionales elegidos (evolución mensual, réplica e isla) y el descarte del embudo.
4. El orden de Envía un contenido, con el triaje antes de «¿Esto se puede verificar?».
5. La promesa del hero: «Contrastamos con datos lo que se afirma en el debate público de Canarias.»
6. «Pedir una corrección» como correo a info@odesocan.org mientras no haya canal definitivo.

## 6. Textos que requieren una comprobación más cuidadosa

- **Relación con la EFCSN** (Qué es verificar): «ODESOCAN no es miembro verificado de la EFCSN: ese reconocimiento solo lo concede la propia red, después de evaluar a cada organización que lo solicita.»
- **Resumen de los capítulos del Código** (`src/contenido/que-es.js`): está escrito con palabras propias a partir de la web de la EFCSN y conviene contrastarlo con el texto original.
- **Asignación de artículos del Código a cada fase** (`src/contenido/metodologia.js`): 2.D, 2.B y 3.1.D, 2.B, 2.E y 3.2, 2.K, 4.1.A, 2.A, 2.E, 3.3.E a 3.3.G y 2.O.
- **Población de referencia de 2,2 millones** para los umbrales de viralidad: viene del encargo y conviene citar la fuente (INE o ISTAC) en la metodología pública.
- **Funciones del Patronato** («órgano de gobierno de la fundación») y el «No procede» sobre titulares de más del 5 % del capital.
- **Caso frontera 5** de «Pon a prueba la escala»: se resolvió como Falso porque la parte central es falsa. Si la parte falsa cambiara el sentido de una parte central correcta, sería Engañoso; conviene revisar que el enunciado no admita las dos lecturas.
- **Enunciado «Nuestro modelo es el mejor de Europa»**: se presenta como no verificable por ser una valoración, con la matización de que sí se podrían verificar las cifras en las que se apoye.
- **Datos de ejemplo**: la prestación canaria de inserción aparece como solicitable todo el año y el plazo máximo de las autorizaciones por arraigo como de 90 días. Son datos ficticios del ejemplo y no se deben tomar como información real.
- **Primera capa de protección de datos** (formulario): finalidad, base jurídica y plazos copian el encargo y deben coincidir con la política definitiva.

## 7. Resultado de la revisión (fase 3)

- **axe-core** (WCAG 2.0, 2.1 y 2.2 A y AA, y buenas prácticas), en las ocho rutas a 390 y 1440 px, con movimiento normal y reducido: ninguna infracción. Antes de corregir había infracciones graves (contraste de las fases inactivas de la metodología, atenuadas con `opacity`, y una historia desplazable que no se podía enfocar) y varias moderadas (notas al margen como `<aside>` anidados y la banda fuera de una región), ya resueltas.
- **Lighthouse en móvil** (rendimiento): Inicio 93, Qué es verificar 90, Metodología 98, Envía un contenido 92, Portal 94, Ficha 93 y Transparencia 94; 100 de accesibilidad y de buenas prácticas en todas. Se reproducen con `npm run pruebas:lighthouse`. Antes de reservar el espacio de carga, el portal se quedaba en 70 por el desplazamiento acumulado de diseño.
- **Capturas** a 360, 390, 768, 1024 y 1440 px, con movimiento normal y reducido (`npm run pruebas:capturas`). Tras revisarlas se corrigieron, entre otras cosas: el tamaño del anillo del hero, las referencias que no cabían en la mira, el corte brusco del ruido junto al titular, la columna de la mira en móvil, la alineación de las barras, el espacio de no separación antes de %, las etiquetas superpuestas en «Dos caminos», el contorno de foco en los títulos y el botón de filtros que tapaba los indicadores.

## 8. Pautas para portarlo a WordPress

Están en el [README](../README.md#portarlo-a-wordpress).

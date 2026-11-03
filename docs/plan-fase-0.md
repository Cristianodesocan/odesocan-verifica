# Odesocan Verifica · Fase 0: reconocimiento y plan de diseño

Plan presentado y aprobado en el punto de control del 3 de noviembre de 2026. Se conserva tal como se aprobó. Lo que cambió después está en [`decisiones.md`](decisiones.md), por ejemplo que el modelo se publica desde el repositorio nuevo `Cristianodesocan/odesocan-verifica` y no desde `Odesocan/web-odesocan`.

## 1. Estado del repositorio `Odesocan/web-odesocan`

| Aspecto | Resultado |
|---|---|
| Visibilidad | **Privado** |
| Rama por defecto | `main` |
| Permisos de la sesión | Administración, escritura y lectura |
| Historial | Un único commit, `57bc7f5` del 28 de julio de 2026, «Prototipo rediseño web ODESOCAN» |
| Ramas remotas | `main` y `claude/fervent-allen-wvrc8h`, las dos en el mismo commit |
| Contenido | `index.html` (50 KB, prototipo estático del rediseño de odesocan.org con Space Grotesk e Inter cargadas desde Google Fonts, es decir, el sistema `odesocan-formato`) y `.gitignore` (solo `.DS_Store`) |
| Licencia | No hay archivo de licencia |
| GitHub Pages, Actions y pull requests | Ninguno configurado |

**Datos sensibles.** He ejecutado `gitleaks` 8.21.2 sobre todo el historial y no encuentra secretos. No hay `.env`, claves ni tokens. Los únicos datos de contacto son los institucionales del pie del prototipo (teléfono 621 267 948 e info@odesocan.org) y el correo de autoría del commit (investigacion@odesocan.org), que quedaría visible si el repositorio se hiciera público.

**Comprobaciones que no he podido hacer.** En este contenedor `gh` no tiene una sesión válida y las operaciones con GitHub pasan por las herramientas MCP y por el proxy de git. El proxy bloquea la consulta del plan de la organización, así que no puedo confirmar si Odesocan tiene un plan de pago. Lo que sí sé es que el repositorio es privado y que, en el plan gratuito, GitHub Pages solo funciona con repositorios públicos; por eso adelanto la decisión del apartado 11.

**Referencia útil.** `Odesocan/canarias-datos` es público y ya publica en Pages con un flujo de Actions (`configure-pages@v5`, `upload-pages-artifact@v3` y `deploy-pages@v4`). Reutilizaré ese patrón.

## 2. Comprobaciones sobre el Código EFCSN

He leído https://efcsn.com/code-of-standards/ para contrastar el apartado 6 del encargo. Matices que afectan al diseño:

- El Código tiene siete artículos: sistema de cumplimiento, metodología, estándares éticos, transparencia, acceso y renovación, cumplimiento y aplicación, y evolución del Código. El grupo amplio de más de 40 organizaciones lo aprobó en verano de 2022 por mayoría cualificada de tres cuartos. La página no da una fecha exacta, así que la web dirá «en 2022».
- El artículo 2.E pide dar acceso a la evidencia «en las publicaciones, cuando sea posible»: lo cubre la ficha, no una página general.
- El artículo 2.K exige un lenguaje «preciso, factual y no emotivo» (criterios de lenguaje) y el 2.O, como buena práctica, archivar la afirmación original y toda la evidencia (protocolo de captura y archivo).
- El artículo 3.2, privacidad y seguridad, cubre la protección de las personas implicadas y la réplica: lo enlazo con los criterios de lenguaje y con la política de protección de datos.
- El Código no regula procedimientos de urgencia. El protocolo de emergencia es una aportación propia de ODESOCAN y la web lo presentará así, subrayando que mantiene las mismas garantías.
- Los artículos 3.1.J (directrices de las organizaciones que hacen incidencia) y 3.3.H (queja ante la EFCSN) piden información pública, pero no dicen que tenga que estar en la web. Aun así, las directrices van a Transparencia y el aviso de queja queda preparado y oculto tras un indicador de configuración.
- Los artículos 4.1.D y 4.2.A y los anexos 6 y 7 son confidenciales y no aparecen en la web.
- El Código no regula el uso del logotipo por quien no es miembro; la regla del encargo se mantiene igual: ni logotipo, ni sello, ni frases que sugieran que ODESOCAN es miembro.

## 3. Concepto

**La mira como instrumento y la página como documento anotado.**

La mira del logotipo es el gesto de verificar, y hace un trabajo distinto en cada sección. Alrededor de ella, la web se comporta como un documento verificado: cada afirmación de la interfaz que se apoya en una norma lleva una nota al margen que dice de dónde sale (un artículo del Código, un documento del servicio, un estatuto). Esa nota al margen es el segundo rasgo de identidad y sale del propio oficio: un servicio de verificación que pide fuentes muestra las suyas. En móvil, las notas se convierten en llamadas que se despliegan dentro del texto.

La regla del ruido se aplica de forma estricta: el ruido son formas (barras con la proporción de una línea de texto, rectángulos con la de una captura, círculos con la de un avatar) desenfocadas con un filtro, y nunca contiene caracteres. Lo nítido, dentro de la mira, son los elementos que sostienen una verificación: tipo de fuente, organismo, fecha de consulta, identificador de serie y huella del archivo. Ningún bulo, ni real ni inventado, aparece en el hero.

### Estados de la mira

| Sección | Qué hace la mira | Qué significa |
|---|---|---|
| Inicio | Sigue el puntero (escritorio) o queda fija mientras el ruido la atraviesa (móvil) y muestra nítidas las referencias | Verificar es enfocar |
| Qué es verificar | El anillo se abre en dos arcos que enmarcan la definición | La mira se abre para explicar |
| Metodología | Se desliza por la línea de las nueve fases y se detiene en la activa | El expediente avanza |
| Envía un contenido | Se cierra sobre la opción elegida en el triaje | Foco en lo que la persona quiere revisar |
| Portal | Se convierte en el control de filtros: el número de resultados va en el centro y cada una de las cuatro marcas cardinales se enciende cuando hay un filtro activo en su dimensión (fecha, calificación, temática y búsqueda) | La mira acota los datos |

**Técnica.** Transiciones de elemento compartido entre rutas con View Transitions API (`view-transition-name: ov-mira`, a través de la propiedad `viewTransition` de React Router con `createHashRouter`). Dentro de cada página, Motion con `layoutId` para los desplazamientos de la mira (fases, triaje, supuestos). Sin soporte o con `prefers-reduced-motion`, la mira aparece directamente en su estado final y la información es la misma.

### Iconografía de la escala

Cada categoría es un estado de la mira, para que la forma explique la categoría y no dependa del color:

| Valor | Categoría | Forma | Lectura |
|---|---|---|---|
| 4 | Verdadero | Anillo completo con el punto centrado | Todo encaja |
| 3 | Contexto | Anillo abierto en un cuarto, punto centrado | Falta una parte |
| 2 | Engañoso | Anillo completo, punto desplazado fuera del centro | Los datos se han movido de sitio |
| 1 | Falso | Anillo atravesado por un aspa | No se corresponde |

## 4. Tokens

### Color

Se mantienen los del encargo. He comprobado el contraste de cada combinación (WCAG 2.2) y propongo dos ajustes de uso, no de color:

| Token | Hex | Uso | Contraste comprobado |
|---|---|---|---|
| `--ov-tinta` | `#1a1a24` | Titulares, dato verificado, texto de insignias | 17,25 sobre blanco |
| `--ov-cuerpo` | `#2b2b38` | Texto corrido | 13,95 sobre blanco |
| `--ov-muted` | `#7a8898` | Líneas, iconos y metadatos **sobre navy** | 3,62 sobre blanco (no llega a AA para texto), 4,81 sobre navy |
| `--ov-muted-texto` *(nuevo)* | `#64707f` | Metadatos **sobre fondo claro** | 5,04 sobre blanco |
| `--ov-teal` | `#00c8b4` | Bordes, subrayados, botón, texto **solo sobre navy** | 2,12 sobre blanco (no sirve para texto), 8,22 sobre navy |
| `--ov-navy` | `#0d1b2a` | Hero, caja de la afirmación, panel de indicadores | |
| `--ov-claro` | `#f8f9fb` | Texto sobre navy y paneles claros | |
| `--ov-falso` | `#FF4757` | Escala | Texto tinta: 5,17 |
| `--ov-enganoso` | `#F97316` | Escala | Texto tinta: 6,16 |
| `--ov-contexto` | `#D4940A` | Escala | Texto tinta: 6,61 |
| `--ov-verdadero` | `#00C8B4` | Escala | Texto tinta: 8,15 |

Consecuencias:

- Ninguna insignia lleva texto blanco: con blanco, solo Falso se acercaría (3,34) y ninguna llega a AA. Todas llevan texto y forma en tinta sobre el color.
- Sobre blanco, tres de los cuatro colores de la escala no alcanzan el 3:1 que se exige a los elementos gráficos. Por eso los gráficos del portal van sobre el panel navy, donde los cuatro superan 5:1, y las temáticas usan un gris neutro (`#94a3b3`, 6,75 sobre navy).
- El teal nunca es color de texto sobre fondo claro; los enlaces son tinta con subrayado teal.

### Tipografía

IBM Plex Sans 300, 600 y 700; IBM Plex Mono 400 y 600; DM Serif Display cursiva. Alojadas con `@fontsource`, solo el subconjunto latino.

| Papel | Composición |
|---|---|
| Dato verificado (sumario `.np`) | Plex Sans 700, `clamp(26px, 4.5vw, 38px)`, interlineado 1,25, borde izquierdo teal de 4 px. Es siempre el elemento más grande de la página |
| Título de sección | Plex Sans 600, `clamp(24px, 4vw, 34px)` |
| Subtítulos | Plex Sans 600, 20 y 17 px |
| Cuerpo | Plex Sans 300, `clamp(16px, 2vw, 17px)`, interlineado 1,8, máximo 66 caracteres por línea |
| Afirmación literal | DM Serif Display cursiva sobre caja navy, texto claro, borde teal |
| Identificadores, fechas, fuentes, notas al margen | Plex Mono 400, 12 a 13 px |

Desviación respecto a `.np`: el cuerpo empieza en 16 px y no en 15 px, porque en móvil un peso 300 a 15 px pierde legibilidad. Mayúsculas espaciadas solo en los identificadores (OV-2026-0001) y en la línea de fecha de la ficha, que es donde las usa `.np`; ningún encabezado lleva etiqueta en mayúsculas encima.

### Composición

- Texto alineado a la izquierda, sin justificar.
- Escritorio (≥ 1024 px): tres columnas en las páginas de lectura, con el índice de lectura a la izquierda (la mira marca el apartado en curso sobre un eje vertical), el texto en el centro (máximo 66 caracteres) y las notas al margen a la derecha.
- Tableta (768 a 1023 px): índice plegado arriba, notas al margen dentro del texto.
- Móvil (< 768 px): una columna con 16 px de margen lateral y barra inferior de cuatro pestañas con zona segura (`env(safe-area-inset-bottom)`).
- Radio de 4 px solo en controles (botones, insignias, campos). Sin sombras, salvo la hoja inferior de filtros, que flota sobre el contenido.
- Escala de espaciado de 4 px: 4, 8, 12, 16, 24, 32, 48, 72 y 112.

## 5. Wireframes

### Inicio

Escritorio:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Prototipo de diseño. Contenidos y datos de ejemplo pendientes de validación… │ banda fija
├──────────────────────────────────────────────────────────────────────────────┤
│ (◎) Odesocan Verifica   1 Qué es verificar  2 Metodología  3 Envía  4 Portal │
├──────────────────────────────────────────────────────────────────────────────┤
│▓ navy ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ ░░░▒▒▒▒▒ ░░  ▒▒▒▒░░░  ░░▒▒▒   ▒▒▒░░  ░░▒▒  ░░░ ▒▒▒▒  ░░▒▒▒▒▒ ░░  ░▒▒▒      │ ruido: barras y
│ ▒▒░░ ┌───┐ ░░▒▒▒  ░░▒▒         │          ░░░▒▒▒  ┌────┐ ░░▒▒   ░░▒        │ bloques borrosos,
│ ░░▒▒ └───┘ ▒▒░░  ░░▒▒▒   ╭─────┴─────╮  ░░▒▒     └────┘ ▒▒░░              │ sin caracteres
│ ░░░▒▒▒ ░░░ ▒▒▒░░  ░░▒  ──┤ Fuente     ├──  ░░▒▒▒░░  ░░▒▒▒   ▒▒░░          │
│ ▒▒░░░  ░░▒▒▒░░ ▒▒░░      │ primaria   │  ▒▒░░   ░░░▒▒▒                    │ dentro de la mira,
│ ░░▒▒▒▒░░  ▒▒░░░  ▒▒▒░░   │ consulta   │   ░░▒▒▒  ░░▒▒   ░░▒▒▒             │ nítido: tipo de
│ ▒░░▒▒▒  ░░▒▒   ░░▒▒▒     ╰─────┬─────╯  ▒▒░░  ░░░▒▒▒   ▒▒░░               │ fuente, fecha,
│                                │                                             │ serie, huella
│  Contrastamos con datos lo que se afirma                                     │
│  en el debate público de Canarias.          [Enviar un contenido]            │
│                                              Ver las verificaciones          │
└──────────────────────────────────────────────────────────────────────────────┘

   Por dónde empezar
   ────────────────────────────────────────────────────────────────────────
   ( )    1  Qué es verificar      Qué hace un servicio de verificación, qué
                                   normas sigue y por qué va separado de la
                                   incidencia de ODESOCAN
   ────────────────────────────────────────────────────────────────────────
   ─◎─    2  Metodología           Las nueve fases de cada pieza y la escala
                                   con la que se califica
   ────────────────────────────────────────────────────────────────────────
   [◎]    3  Envía un contenido    Qué se puede verificar y por qué canal
                                   llega antes
   ────────────────────────────────────────────────────────────────────────
   ◎▾     4  Portal                Todas las verificaciones, sus fuentes y
                                   las correcciones publicadas
   ────────────────────────────────────────────────────────────────────────
   (el glifo de cada fila es el estado de la mira en esa sección; al pasar
    el puntero o el foco, el glifo adopta ese estado)

   Últimas verificaciones                         Ver todas en el portal
   ┌──────────────────────┬──────────────────────┬──────────────────────┐
   │ ⊗ Falso              │ ◉ Engañoso           │ ◔ Contexto           │
   │ Titular con el dato  │ Titular con el dato  │ Titular con el dato  │
   │ verificado           │ verificado           │ verificado           │
   │ OV-2026-0030 15 oct  │ OV-2026-0029 9 oct   │ OV-2026-0028 2 oct   │
   └──────────────────────┴──────────────────────┴──────────────────────┘

   Quién está detrás, cómo se financia y cómo se corrigen los errores
   → Transparencia
```

Móvil:

```
┌────────────────────────┐
│Prototipo de diseño…    │ banda fija, una línea
│(◎) Verifica   Transpar.│
│░░▒▒ ░░▒▒▒ ░░ ▒▒░░ ░░▒  │
│ ▒░░  ╭──┴──╮ ░▒▒  ░░   │ la mira queda fija (sticky)
│░▒▒ ──┤BOC  ├── ░░ ▒▒   │ y el ruido sube al desplazar;
│  ░░  ╰──┬──╯ ▒░░ ░▒    │ un toque enfoca la referencia
│ ░▒▒▒ ░░ ▒▒░ ░░▒ ░░▒▒   │
│Contrastamos con datos  │
│lo que se afirma en el  │
│debate público de       │
│Canarias.               │
│[ Enviar un contenido  ]│ botón a todo el ancho
├────────────────────────┤
│ ( )   ─◎─   [◎]   ◎▾   │ barra inferior, 4 pestañas
│Qué es Método Enviar Portal│ de 56 px de alto
└────────────────────────┘
```

### 1 · Qué es verificar

Escritorio:

```
┌───────────┬────────────────────────────────────────────────┬────────────────┐
│ ◎ Defini- │ Qué es verificar                               │                │
│ │ ción    │                                                │                │
│ │ Qué es  │ ⎛  Verificar es usar un método basado en     ⎞ │ ◦ Definición   │
│ │ y qué no│ ⎜  evidencia para comprobar la exactitud de  ⎟ │ de la EFCSN en │
│ │ El      │ ⎝  lo que se afirma en la esfera pública.    ⎠ │ su Código, 2022│
│ │ Código  │                                                │                │
│ │ Cómo lo │ Qué hace                │ Qué no hace          │                │
│ │ aplica  │ Califica afirmaciones   │ No califica personas │                │
│ │ Encaje  │ Contrasta datos,        │ No es opinión ni     │                │
│ │ Dos     │ fuentes, normas, hechos │ análisis de políticas│                │
│ │ caminos │                                                │                │
│ │ No par- │ El Código Europeo                              │ ◦ Texto        │
│ │ tidismo │ texto + enlace al original en inglés           │ original, en   │
│           │                                                │ inglés         │
│           │ Capítulo del Código        Documento del servicio               │
│           │ Metodología ─────────┬──── Metodología                          │
│           │                      ├──── Escala de calificación               │
│           │                      ├──── Criterios de lenguaje                │
│           │                      ├──── Protocolo de captura y archivo       │
│           │                      └──── Protocolo de emergencia (propio)     │
│           │ Estándares éticos ───┬──── Directrices de independencia         │
│           │                      ├──── Política de correcciones             │
│           │                      └──── Política de protección de datos      │
│           │ Transparencia ─────────── Capa de Transparencia                 │
│           │ Acceso y renovación ───── Datos de registro (pie)               │
│           │ Cumplimiento ──────────── Aviso de queja (cuando sea miembro)   │
│           │ (al enfocar un capítulo se iluminan sus líneas y documentos)    │
│           │                                                │                │
│           │ Dos caminos                                    │                │
│           │ [La afirmación coincide con…] [Misma materia…] │                │
│           │ [La emisora es contraparte…]  [Cita datos…]    │                │
│           │ [Afecta a ACUFADE…]           [La incidencia…] │                │
│           │                                                │                │
│           │ Incidencia   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │                │
│           │              (los trazos no se cruzan nunca)   │                │
│           │ Verificación ━━━━━◎━━━━━ declara ━━ revisa ━━✓ │                │
│           │ Se verifica y se declara la relación: …        │                │
│           │                                                │                │
│           │ Declaración de no partidismo                   │                │
└───────────┴────────────────────────────────────────────────┴────────────────┘
```

Móvil: una columna; los arcos de la definición se estrechan al margen; las notas al margen se abren con un toque sobre su marca; el mapa Código y documentos se convierte en un acordeón por capítulo; en «Dos caminos» los trazos son verticales, los supuestos se eligen en una lista desplegable a pantalla completa y la ficha del resultado queda debajo de los trazos.

### 2 · Metodología

Escritorio, scrollytelling con desplazamiento nativo:

```
┌──────────────────────────────────┬────────────────────────────────────────┐
│ (columna fija)                   │                                        │
│  1 ○ Monitorización              │  3  Investigación y verificación       │
│  2 ○ Selección y priorización    │  Qué se hace                           │
│  3 ◎ Investigación  ◄ la mira    │  Al menos dos fuentes para la          │
│  4 ○ Redacción                   │  afirmación central…                   │
│  5 ○ Revisión editorial          │  Garantía del Código                   │
│  6 ○ Calificación                │  Art. 2.B y 2.E                        │
│  7 ○ Publicación                 │  Qué queda registrado                  │
│  8 ○ Corrección                  │  Fuentes consultadas, réplica…         │
│  9 ○ Archivo                     │                                        │
│ ┌ Expediente OV-2026-0000 ─────┐ │  (cada fase ocupa una altura de        │
│ │ Detección registrada  ✓      │ │   pantalla y se activa al cruzar la    │
│ │ Selección revisada    ✓      │ │   mitad del viewport)                  │
│ │ Fuentes: 2 primarias  …      │ │                                        │
│ └──────────────────────────────┘ │                                        │
└──────────────────────────────────┴────────────────────────────────────────┘
  El expediente se llena línea a línea según se avanza: es el registro de
  cada fase, y lo que queda escrito es lo que el Código exige conservar.

  Escala de calificación      ⊗ 1 Falso  ◉ 2 Engañoso  ◔ 3 Contexto  ◎ 4 Verdadero
  Preguntas de decisión       1 ¿La evidencia contradice…?  sí → Falso
                              ↓ no
                              2 ¿Mezcla datos correctos…?   sí → Engañoso
                              ↓ no  …
  Pon a prueba la escala      caso 1 de 6  [Falso][Engañoso][Contexto][Verdadero][No se califica]
  Protocolo de emergencia     test de activación, recorrido de unas 20 horas, garantías
  Independencia en la selección
  Plazos (leídos de la configuración, con [plazo pendiente de validar])
  Descargar la metodología completa (PDF) [pendiente]
```

Móvil, historias a pantalla completa:

```
┌────────────────────────┐
│▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│ nueve barras de progreso (posición,
│OV-2026-0000      3 de 9│ no temporizador: no avanza sola)
│                        │
│  ○─○─◎─○─○─○─○─○─○     │ la mira sobre la fase activa
│                        │
│Investigación y         │
│verificación            │
│Al menos dos fuentes    │
│para la afirmación      │
│central…                │
│Garantía: art. 2.B, 2.E │
│Registro: fuentes, …    │
│ ◄ toque   │   toque ►  │ deslizamiento con scroll-snap
│[Anterior]   [Siguiente]│ y botones para teclado y lectores
└────────────────────────┘
```

### 3 · Envía un contenido

Escritorio:

```
  Envía un contenido
  [sumario] Si algo que circula sobre derechos sociales en Canarias te genera
  dudas, envíalo y te responderemos siempre, también cuando no se pueda verificar.

  Qué verificamos            │ Qué no verificamos
  Datos, cifras, normas,     │ Opiniones, valores, promesas
  hechos, imágenes y vídeos  │ y predicciones

  ¿Esto se puede verificar?
        ┌──────────────────────────────┐
        │ La ley obliga a resolver     │   [No se puede]  [Se puede]
        │ en seis meses                │   ← y → con el teclado
        └──────────────────────────────┘   2 de 6

  ┌ 1 Qué quieres revisar ─┐ ┌ 2 ¿Puede causar daño? ┐ ┌ 3 Canal recomendado ─┐
  │ ◎ Mensaje o audio      │ │ ○ Hay riesgo inmediato│ │ WhatsApp             │
  │ ○ Publicación en redes │ │   para una persona    │ │ Reenvíalo tal cual…  │
  │ ○ Declaración de un    │ │ ○ Puede causar daño en│ │ [Abrir WhatsApp]     │
  │   cargo público        │ │   horas o pocos días  │ │ Otros canales        │
  │ ○ Foto o vídeo         │ │ ○ No, o no lo sé      │ │ Formulario, teléfono,│
  │ ○ Dato o cifra         │ │                       │ │ Telegram, correo…    │
  └────────────────────────┘ └───────────────────────┘ └──────────────────────┘
   (la mira se cierra sobre la opción elegida y pasa al panel siguiente)

  Qué pasa después   Registro ── Evaluación por dos personas ── Investigación ── Respuesta
  Formulario de demostración (no envía nada)
  Pedir una corrección
```

Móvil: cada paso del triaje ocupa la pantalla, con botones de 56 px y enlaces directos (`wa.me`, `tel:`, `t.me`, `ig.me`, `m.me`). Si se elige riesgo inmediato, la pantalla siguiente empieza con un botón grande «Llamar al 112». Las tarjetas de «¿Esto se puede verificar?» se deslizan con el dedo.

### 4 · Portal

Escritorio:

```
  Datos de ejemplo. El servicio aún no ha publicado verificaciones.     (aviso fijo)
  ┌ panel navy ─────────────────────────────────────────────────────────────┐
  │ 30 verificaciones publicadas            Por calificación                │
  │ entre noviembre de 2025 y octubre       ⊗ Falso      ████████   8 26,7 %│
  │ de 2026                                 ◉ Engañoso   █████████  9 30,0 %│
  │                                         ◔ Contexto   ████████   8 26,7 %│
  │ Por mes  ▁▂▃▂▅▃▄▆▃▅▄▆                   ◎ Verdadero  █████      5 16,7 %│
  │ Réplica  ofrecida 27 · respondida 11    Por temática (gris neutro)      │
  │ Por isla (gris neutro)                  Vivienda     ██████     6 …     │
  │                         [Ver como tabla en cada gráfico]                │
  └─────────────────────────────────────────────────────────────────────────┘
  ┌ filtros ─────────┬ resultados ───────────────────────────────────────────┐
  │   ╷              │ 12 verificaciones (anunciado con aria-live)           │
  │ ─(12)─  de 30    │ ┌──────────────────────────┬────────────────────────┐ │
  │   ╵              │ │ ⊗  Titular con el dato   │ ◔  Titular con el dato │ │
  │ marcas encendidas│ │ Falso verificado         │ Contexto verificado    │ │
  │ = filtros activos│ │ 15 oct 2026  Vivienda    │ …                      │ │
  │ Fecha            │ │ Canarias  Cargo público  │                        │ │
  │ Calificación     │ │ OV-2026-0030             │                        │ │
  │ Temática         │ └──────────────────────────┴────────────────────────┘ │
  │ Buscar           │                                                       │
  │ Limpiar filtros  │                                                       │
  └──────────────────┴───────────────────────────────────────────────────────┘
  Registro de correcciones (tabla filtrable, CSV configurable)
  Informes de balance [pendiente]
```

Móvil: indicadores apilados en el panel navy; tarjetas a todo el ancho; la mira flota sobre la barra inferior como botón de filtros, con el número de resultados en el centro y las marcas encendidas, y al pulsarla se abre la hoja inferior de filtros (diálogo con foco atrapado, cierre con Escape, con el botón o deslizando hacia abajo).

### Ficha de verificación

```
  Escritorio                                         │ Móvil
  ┌───────────────────────────────────┬─────────────┐│ ┌────────────────────────┐
  │ ⊗ Falso   OV-2026-0030  EJEMPLO   │ Escala de   ││ │⊗ Falso    OV-2026-0030 │
  │▌Titular con el dato verificado    │ calificación││ │▌Titular con el dato    │
  │▌(sumario .np, lo más grande)      │ Política de ││ │▌verificado             │
  │ Resumen con su fuente             │ correcciones││ │Resumen                 │
  │ [Nota de corrección, si existe]   │ Compartir   ││ │[Nota de corrección]    │
  │ ┌ navy ─────────────────────────┐ │ [Copiar     ││ │┌ navy ────────────────┐│
  │ │ «Afirmación literal» (DM Serif│ │  enlace]    ││ ││«Afirmación literal»  ││
  │ │ Cargo público autonómico,     │ │             ││ │└──────────────────────┘│
  │ │ 12 oct 2026, X, archivo       │ │             ││ │Por qué se verifica     │
  │ └───────────────────────────────┘ │             ││ │Evidencia ▸ a favor     │
  │ Por qué se verifica               │             ││ │          ▸ en contra   │
  │ Evidencia a favor │ en contra     │             ││ │Fuentes ▸               │
  │ Fuentes (tipo, fecha de consulta) │             ││ │Método ▸ …              │
  │ Método y replicabilidad           │             ││ │[Compartir] navigator.  │
  │ Conflictos de interés · Réplica   │             ││ │share                   │
  │ Historial de versiones (PDF)      │             ││ └────────────────────────┘
  │ ▸ Marcado ClaimReview (plegado)   │             ││
  └───────────────────────────────────┴─────────────┘│
```

La afirmación literal aparece solo aquí, enmarcada como voz citada y siempre después del dato verificado y de la calificación; nunca en titulares, tarjetas, texto para compartir ni metadatos.

### Transparencia

Una página con índice de lectura y seis apartados con ruta propia (`#/transparencia/financiacion`), para poder enlazar cada uno desde el pie y desde la sección 1. Los apartados que siguen los anexos 4, 5 y 8 del Código se componen como fichas de datos (campo y valor), con los valores pendientes como `[pendiente]` en mono y con fondo rayado, para que se vean de lejos.

## 6. Principios

1. **La mira es lo único audaz.** Todo lo demás es sobrio: blanco, tinta, una línea teal y mucho aire.
2. **Un momento orquestado por sección, como máximo**: el enfoque inicial del hero, la apertura del anillo, el primer desplazamiento de la mira a la fase 1, el cierre sobre el paso 1 del triaje y el crecimiento de las barras del portal. El resto del movimiento responde a una acción.
3. **Cada borde, número y etiqueta codifica algo.** Los números solo aparecen donde hay secuencia (nueve fases, tres pasos del triaje, cuatro preguntas de decisión, cuatro pasos de respuesta y el orden de lectura de las cuatro secciones que propone el encargo).
4. **Lo pendiente se ve.** Un único componente `Pendiente` pinta todos los `[pendiente]` igual, para que nadie confunda un hueco con un dato.
5. **El color de la escala solo vive donde hay una calificación.**
6. **El móvil se diseña primero**: pestañas al pulgar, historias, pasos a pantalla completa, hoja inferior y enlaces directos a las aplicaciones.

## 7. Revisión del plan contra las soluciones de plantilla

Repasé el primer borrador preguntándome qué haría con cualquier encargo parecido. Cambié lo siguiente:

| Primer borrador | Por qué sonaba a plantilla | Cambio |
|---|---|---|
| Cuatro tarjetas iguales con icono para las secciones | Es el kit de tarjetas de cualquier página de producto | Índice en filas a todo el ancho, con una frase de qué se encuentra y el glifo del estado de la mira en esa sección, que anticipa la transformación |
| Iconos genéricos para la escala (✓, ✗, !, ?) | No dicen nada propio y el «?» sugiere duda, no contexto | Cuatro estados de la mira (completa, abierta, desplazada y tachada) |
| Número grande de verificaciones con etiqueta pequeña y degradado | Es la cifra destacada por defecto | El total vive dentro de la mira que filtra, con las marcas cardinales como indicador de filtros activos |
| Línea de tiempo vertical con entradas que aparecen al desplazarse | Fundido y desplazamiento en cada bloque | Expediente que se rellena línea a línea en la columna fija; los pasos no se animan |
| Etiqueta en mayúsculas espaciadas sobre cada encabezado | Es la marca más reconocible de una página generada | Sin etiquetas sobre encabezados; el mono queda para identificadores, fechas, fuentes y notas |
| Tarjetas del portal con esquinas redondeadas y sombra | Kit de tarjetas | Entradas con filete superior, glifo grande de la calificación y metadatos en rejilla, sin sombra |
| Hero centrado con titular y dos botones | Composición de página de aterrizaje | Promesa abajo a la izquierda, la mira como protagonista y un solo botón principal |
| Flecha «→» añadida a todos los enlaces | Tic de plantilla | Verbos de acción sin flecha; la flecha solo en el enlace del pie a Transparencia, que sí lleva a otra capa |

## 8. Stack y estructura

Vite con React 18, `createHashRouter` de React Router (necesario para las transiciones de vista), Motion, módulos de D3 (`d3-scale`, `d3-selection`, `d3-transition`, `d3-array`, `d3-shape`) cargados solo en el portal, `@fontsource` para las tres familias y CSS propio con prefijo `.ov-`. Sin Tailwind, sin kits de interfaz, sin analítica, sin cookies. Versiones exactas en `package.json`.

```
web-odesocan/
├── index.html                 lang="es", noindex, body sin márgenes en línea
├── public/
│   ├── robots.txt             Disallow: /
│   └── data/                  verificaciones.json y correcciones-ejemplo.csv
├── src/
│   ├── config/                URL_BASE, canales, plazos, materias, islas, escala, URL
│   ├── data/                  fuente.js (adaptador JSON, CSV o Supabase), csv.js, claimreview.js
│   ├── estilos/               tokens.css y raiz.css (reset acotado a .ov-app)
│   ├── componentes/           Mira, Insignia, Pendiente, NotaMargen, IndiceLectura, navegación…
│   └── secciones/             inicio, que-es, metodologia, envia, portal (diferido), transparencia
├── pruebas/                   Playwright (capturas a 360, 390, 768, 1024 y 1440 px) y axe-core
├── docs/                      encargo.md, decisiones.md
└── .github/workflows/pages.yml
```

## 9. Datos de ejemplo

Treinta verificaciones ficticias entre noviembre de 2025 y octubre de 2026 (para que los atajos de fecha den resultados distintos), con las diez temáticas, las nueve opciones de isla, ocho de calificación Falso, nueve Engañoso, ocho Contexto y cinco Verdadero, cuatro con corrección o actualización, dos por vía de emergencia y distintas situaciones de réplica.

Para que la ficha sea realista, las fuentes citan organismos reales (INE, ISTAC, BOC, IMSERSO…), pero todas las cifras son inventadas, todos los enlaces apuntan a `example.org` y cada tarjeta y cada ficha llevan la marca de ejemplo. Las afirmaciones literales evitan temas que puedan reforzar estigmas (nada sobre personas migrantes ni sobre colectivos concretos) y no imitan bulos que circulen de verdad. Lo dejo anotado en `docs/decisiones.md` como riesgo a vigilar si alguien hace capturas.

## 10. Orden de trabajo tras la confirmación

1. Fase 1: rama `archivo/web-anterior`, etiqueta anotada `archivo-pre-verifica-20261103` y rama de trabajo con `git rm -r` del contenido anterior (se conserva `.gitignore`, ampliado; no hay licencia que conservar).
2. Fase 2, con commits pequeños en castellano: tokens y estructura, navegación, Inicio, portal y datos, metodología, canal, Qué es verificar y Transparencia.
3. Fase 3: capturas, axe-core, Lighthouse, autocrítica y correcciones.
4. Fase 4: flujo de Pages y pull request (punto de control).
5. Fase 5: README, decisiones y encargo.

## 11. Decisiones que necesito en este punto de control

1. **Ramas.** El encargo pide `archivo/web-anterior`, la etiqueta `archivo-pre-verifica-20261103` y `propuesta/odesocan-verifica`, pero esta sesión tiene asignada la rama `claude/fervent-allen-wvrc8h` y su configuración me impide empujar a otras ramas sin permiso explícito. Propongo seguir los nombres del encargo y no usar `claude/fervent-allen-wvrc8h`. La otra opción es trabajar en `claude/fervent-allen-wvrc8h` como rama de propuesta y crear solo la rama y la etiqueta de archivo.
2. **Publicación.** El repositorio es privado y no puedo comprobar el plan de la organización. Si el plan es gratuito, Pages no funcionará y habrá que elegir entre: (a) hacer público este repositorio, con su único commit anterior a la vista; (b) crear un repositorio público nuevo solo con el trabajo nuevo, que tendríais que crear vosotros porque esta sesión no puede crear repositorios; o (c) mantenerlo privado, invitar a la persona diseñadora y ejecutarlo en local. Si sabéis que el plan es de pago, intentaré activar Pages sobre el repositorio privado en la fase 4.
3. **Registro de correcciones.** El encargo menciona `odesocan_verifica_registro_correcciones.html`, que no tengo. Si lo adjuntáis, reutilizo su lógica; si no, escribo un lector de CSV propio.
4. **Visto bueno al plan**, o cambios en el concepto, la composición o los tokens.

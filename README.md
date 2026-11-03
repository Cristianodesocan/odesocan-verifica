# Odesocan Verifica · modelo web de referencia

Modelo navegable de la sección «Odesocan Verifica», el servicio de verificación de afirmaciones públicas sobre derechos sociales en Canarias de la Fundación Canaria Observatorio de Derechos Sociales de Canarias (ODESOCAN). Está pensado para que la persona especialista en diseño web lo tome como referencia exacta al implementar la sección en odesocan.org.

> **Prototipo de diseño.** Todos los contenidos son un borrador pendiente de revisión por el equipo de ODESOCAN, y las treinta verificaciones son ficticias: cifras, fuentes y afirmaciones son inventadas, aunque los organismos citados existan. La web no está indexada (`noindex` y `robots.txt`).

- **URL publicada:** https://cristianodesocan.github.io/odesocan-verifica/ (disponible cuando se active GitHub Pages; ver [Publicación](#publicación)).
- **Encargo:** [`docs/encargo.md`](docs/encargo.md).
- **Plan aprobado en la fase 0:** [`docs/plan-fase-0.md`](docs/plan-fase-0.md).
- **Decisiones, alternativas descartadas y pendientes:** [`docs/decisiones.md`](docs/decisiones.md).

## Contenido

1. [Cómo ejecutarlo](#cómo-ejecutarlo)
2. [Estructura de carpetas](#estructura-de-carpetas)
3. [Rutas](#rutas)
4. [Sistema visual y tokens](#sistema-visual-y-tokens)
5. [La mira](#la-mira)
6. [Contrato de datos y adaptador](#contrato-de-datos-y-adaptador)
7. [Configuración](#configuración)
8. [Accesibilidad, rendimiento y pruebas](#accesibilidad-rendimiento-y-pruebas)
9. [Portarlo a WordPress](#portarlo-a-wordpress)
10. [Publicación](#publicación)

## Cómo ejecutarlo

Requisitos: Node.js 20.19 o posterior (probado con Node 22) y npm.

```bash
npm ci
```

```bash
npm run dev
```

El servidor de desarrollo queda en http://localhost:5173/odesocan-verifica/. Para la versión de producción:

```bash
npm run build
```

```bash
npm run preview
```

La build queda en `dist/` y la vista previa en http://localhost:4173/odesocan-verifica/.

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga |
| `npm run build` | Build de producción en `dist/`, con la política de seguridad de contenidos |
| `npm run preview` | Sirve la build en el puerto 4173 |
| `npm run validar:datos` | Valida `public/data/verificaciones.json` contra el contrato y los criterios de lenguaje |
| `npm run pruebas:capturas` | Capturas a 360, 390, 768, 1024 y 1440 px, con movimiento normal y reducido |
| `npm run pruebas:axe` | Auditoría con axe-core; falla si hay infracciones graves o críticas |
| `npm run pruebas:lighthouse` | Lighthouse en móvil; falla si el rendimiento baja de 90 o la accesibilidad de 95 |

Las tres pruebas necesitan la vista previa en marcha y Playwright con Chromium. Playwright no está entre las dependencias del proyecto para no pesar en la instalación:

```bash
npm install --no-save playwright && npx playwright install chromium
```

Lighthouse se descarga con `npx` en la versión 12.8.2. Si Chrome no está en la ruta habitual, indica su ruta en `CHROME_PATH`. `node pruebas/generar-correcciones.mjs` regenera el CSV de ejemplo del registro de correcciones a partir de las verificaciones.

## Estructura de carpetas

```
odesocan-verifica/
├── index.html                  noindex, lang="es"; el body es de la página anfitriona
├── vite.config.js              base /odesocan-verifica/ y política de seguridad de contenidos
├── public/
│   ├── robots.txt              Disallow: /
│   ├── favicon.svg             la mira
│   └── data/
│       ├── verificaciones.json         30 verificaciones de ejemplo (contrato de datos)
│       └── correcciones-ejemplo.csv    registro de correcciones de ejemplo
├── src/
│   ├── main.jsx                tipografías (@fontsource), tokens y arranque
│   ├── rutas.jsx               rutas con createHashRouter; secciones con carga diferida
│   ├── config/                 todo lo configurable, con los pendientes marcados
│   │   ├── sitio.js            URL_BASE, entidad, URL de documentos, banderas
│   │   ├── canales.js          canales de recepción con su estado activo y redes
│   │   ├── plazos.js           plazos de la metodología y de conservación
│   │   ├── escala.js           escala de calificación y preguntas de decisión
│   │   ├── materias.js         temáticas iniciales
│   │   ├── islas.js            islas y ámbitos
│   │   └── secciones.js        arquitectura de la información
│   ├── contenido/              textos largos de cada sección, separados del código
│   ├── data/
│   │   ├── fuente.js           adaptador de datos (JSON, CSV o Supabase)
│   │   ├── csv.js              lector de CSV sin dependencias
│   │   ├── correcciones.js     lectura del registro de correcciones
│   │   ├── claimreview.js      marcado ClaimReview desde el contrato
│   │   └── formato.js          fechas y cifras con los criterios de lenguaje
│   ├── estilos/
│   │   ├── tokens.css          variables --ov- sobre .ov-app
│   │   ├── raiz.css            reset acotado a .ov-app con :where()
│   │   ├── marco.css           banda, cabecera, pestañas, pie
│   │   ├── componentes.css     tipografía editorial, botones, insignias, notas…
│   │   └── tarjeta.css         tarjeta de verificación
│   ├── componentes/            Mira, GlifoEscala, Insignia, Pendiente, NotaMargen,
│   │                           IndiceLectura, Cabecera, BarraPestanas, Pie…
│   ├── hooks/                  useMediaQuery, useMovimientoReducido, useApartado…
│   └── secciones/
│       ├── inicio/             hero de la mira y ruido
│       ├── que-es/             definición, mapa del Código, «Dos caminos»
│       ├── metodologia/        recorrido de las nueve fases, casos frontera
│       ├── envia/              triaje, clasificación, formulario de demostración
│       ├── portal/             indicadores (D3), explorador, ficha, correcciones
│       └── transparencia/
├── pruebas/                    validador de datos, capturas, axe-core, Lighthouse
├── docs/                       encargo, plan de la fase 0 y decisiones
└── .github/workflows/          comprobar.yml y pages.yml
```

Cada componente importa su propia hoja de estilos, así que cada carpeta de `secciones/` se puede portar de forma independiente.

## Rutas

El enrutado es por hash para que funcione en GitHub Pages sin configurar el servidor. Cada apartado tiene ruta propia, porque con hash no se pueden usar anclas.

| Ruta | Página |
|---|---|
| `#/` | Inicio |
| `#/que-es-verificar` y `#/que-es-verificar/:apartado` | Qué es verificar (`definicion`, `que-es`, `codigo`, `aplica`, `encaje`, `dos-caminos`, `no-partidismo`) |
| `#/metodologia` y `#/metodologia/:apartado` | Metodología (`recorrido`, `escala`, `preguntas`, `prueba`, `emergencia`, `independencia`, `plazos`, `descarga`) |
| `#/envia` y `#/envia/:apartado` | Envía un contenido (`triaje`, `se-puede`, `despues`, `formulario`, `correccion`) |
| `#/portal?periodo=…&cal=…&tema=…&q=…` | Portal; los filtros viven en la URL |
| `#/portal/OV-2026-0014` | Ficha de verificación |
| `#/portal/correcciones` | Registro de correcciones |
| `#/transparencia` y `#/transparencia/:apartado` | Transparencia (`quienes-somos`, `titularidad`, `gobernanza`, `financiacion`, `independencia`, `correcciones`, `datos`) |

## Sistema visual y tokens

La base es el sistema `.np` de las publicaciones de odesocan.org. Todos los tokens se declaran sobre `.ov-app`, no sobre `:root` (`src/estilos/tokens.css`).

| Token | Valor | Uso |
|---|---|---|
| `--ov-tinta` | `#1a1a24` | Titulares, dato verificado, texto de las insignias |
| `--ov-cuerpo` | `#2b2b38` | Texto corrido |
| `--ov-muted` | `#7a8898` | Líneas e iconos; texto solo sobre navy |
| `--ov-muted-texto` | `#64707f` | Metadatos sobre fondo claro (añadido por contraste) |
| `--ov-teal` | `#00c8b4` | Único acento: bordes, subrayados, botón; texto solo sobre navy |
| `--ov-teal-hover` | `#00b0a0` | Botón al pasar el puntero |
| `--ov-navy` | `#0d1b2a` | Hero, caja de la afirmación, panel de indicadores, pie |
| `--ov-navy-2` | `#14273b` | Superficies dentro del navy |
| `--ov-claro` | `#f8f9fb` | Texto sobre navy y paneles claros |
| `--ov-falso`, `--ov-enganoso`, `--ov-contexto`, `--ov-verdadero` | `#ff4757`, `#f97316`, `#d4940a`, `#00c8b4` | Solo en insignias, gráficos y filtros |
| `--ov-neutro` | `#94a3b3` | Temáticas e islas en los gráficos |

**Tipografía**, alojada con `@fontsource` (solo el subconjunto latino):

| Papel | Familia |
|---|---|
| Dato verificado y entradilla (sumario `.np`) | IBM Plex Sans 700, `clamp(26px, 4.5vw, 38px)`, borde izquierdo teal: siempre lo más grande de la página |
| Títulos y subtítulos | IBM Plex Sans 600 |
| Cuerpo | IBM Plex Sans 300, `clamp(16px, 2vw, 17px)`, interlineado 1,8, máximo 66 caracteres |
| Afirmación literal | DM Serif Display cursiva sobre caja navy |
| Identificadores, fechas, fuentes, notas | IBM Plex Mono 400 |
| Botón principal | IBM Plex Mono 600 en mayúsculas, como `.np-boton` |

**Reglas que conviene mantener al portar:**

- Ninguna insignia lleva texto blanco: el texto y el glifo van en tinta sobre el color de la escala.
- Los gráficos van sobre navy, porque sobre blanco tres colores de la escala no llegan a 3:1.
- Cada categoría tiene su glifo (`GlifoEscala`), de modo que el color nunca va solo.
- Espacio de no separación entre la cifra y el símbolo de porcentaje (`14,6 %`), para que no queden en líneas distintas.
- Radio de 4 px solo en controles; sin sombras, salvo la hoja inferior y el botón flotante de filtros en móvil.

## La mira

La mira es el hilo conductor y lo único audaz de la página. En cada sección hace un trabajo distinto (ver la tabla en [`docs/decisiones.md`](docs/decisiones.md#la-mira-en-cada-sección)). Entre secciones se transforma con View Transitions API: cada página tiene un único elemento con `view-transition-name: ov-mira`, y los enlaces internos llevan la propiedad `viewTransition` (`src/componentes/Enlace.jsx`). Dentro de cada página, Motion anima sus desplazamientos con `layoutId`. Con `prefers-reduced-motion` todo aparece en su estado final y la información es la misma.

## Contrato de datos y adaptador

Cada verificación sigue el contrato del apartado 11 del encargo. Un ejemplo completo es cualquier elemento de `public/data/verificaciones.json`; los campos son `id`, `ejemplo`, `titular`, `resumen`, `calificacion`, `afirmacion`, `materia`, `isla`, `ambito`, `fecha_publicacion`, `via_entrada`, `por_que`, `evidencia`, `fuentes`, `metodo`, `conflictos`, `replica`, `correcciones` y `emergencia`. Cuando una corrección cambia la calificación, lleva además `calificacion_anterior`.

- **Adaptador** (`src/data/fuente.js`): los componentes solo llaman a `cargarVerificaciones()` y a `cargarVerificacion(id)`. Con `VITE_FUENTE` se elige el origen sin tocar la interfaz:
  - `json` (por defecto): `public/data/verificaciones.json`.
  - `csv`: `VITE_VERIFICACIONES_CSV_URL`, con columnas con punto (`afirmacion.texto`) y listas en JSON.
  - `supabase`: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, sobre una vista pública `verificaciones_publicas` protegida con RLS.
- **Campos internos:** el adaptador conserva solo los campos públicos del contrato, de modo que aunque una fuente traiga por error nombres del equipo, personas revisoras, datos de quien reporta o adscripción política, no llegan a la interfaz.
- **Validación:** `npm run validar:datos` comprueba el contrato y los criterios de lenguaje, y se ejecuta en cada pull request.
- **ClaimReview** (`src/data/claimreview.js`): `reviewRating` de 1 a 4, con `worstRating: 1`, `bestRating: 4` y la etiqueta en `alternateName`. La ficha lo muestra plegado y solo lo inserta en `<head>` con `VITE_CLAIMREVIEW=on`.
- **Registro de correcciones** (`src/data/correcciones.js`): lee el CSV de `VITE_CORRECCIONES_CSV_URL` o, mientras no exista, `public/data/correcciones-ejemplo.csv`. Los nombres de las columnas están en `COLUMNAS`.

## Configuración

Todo lo configurable está en `src/config/`. Los valores `null` son datos pendientes, y la interfaz los muestra con el componente `Pendiente`, nunca con un valor inventado. La lista completa, con su ubicación, está en [`docs/decisiones.md`](docs/decisiones.md#4-pendientes-del-equipo-con-su-ubicación).

Variables de entorno (archivo `.env.local` o en el flujo de Actions):

| Variable | Valor por defecto | Para qué |
|---|---|---|
| `VITE_BASE` | `/odesocan-verifica/` | Ruta base de la build |
| `VITE_URL_BASE` | sin valor | Dirección definitiva de la sección, para los enlaces de la ficha y ClaimReview |
| `VITE_FUENTE` | `json` | Origen de los datos: `json`, `csv` o `supabase` |
| `VITE_VERIFICACIONES_CSV_URL` | sin valor | CSV de verificaciones si `VITE_FUENTE=csv` |
| `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` | sin valor | Si `VITE_FUENTE=supabase` |
| `VITE_CORRECCIONES_CSV_URL` | sin valor | Hoja publicada del registro de correcciones |
| `VITE_CLAIMREVIEW` | apagado | `on` para insertar ClaimReview (solo con datos reales) |

Otras banderas en `src/config/sitio.js`: `BANDERAS.EFCSN_MIEMBRO` (muestra el aviso de queja ante la EFCSN cuando ODESOCAN sea miembro) y `FECHA_REFERENCIA_EJEMPLO` (fecha que usan los atajos de fecha mientras los datos sean de ejemplo).

## Accesibilidad, rendimiento y pruebas

Resultados del 3 de noviembre de 2026 sobre la build de producción:

| Prueba | Resultado |
|---|---|
| axe-core (WCAG 2.0, 2.1 y 2.2 A y AA, y buenas prácticas), 8 rutas a 390 y 1440 px, movimiento normal y reducido | Ninguna infracción |
| Lighthouse en móvil, Inicio | Rendimiento 91, accesibilidad 100, buenas prácticas 100 |
| Lighthouse en móvil, Portal | Rendimiento 94, accesibilidad 100, buenas prácticas 100 |
| Lighthouse en móvil, Metodología | Rendimiento 98, accesibilidad 100, buenas prácticas 100 |
| Lighthouse en móvil, Envía un contenido | Rendimiento 92, accesibilidad 100, buenas prácticas 100 |

Lo que cubre el modelo, además de las pruebas automáticas:

- Navegación completa por teclado y foco visible en todos los controles.
- Enlace para saltar al contenido y regiones (`header`, `nav`, `main` y `footer`).
- Encabezados sin saltos y `lang="es"`.
- Objetivos táctiles de al menos 44 px y tablas alternativas para cada gráfico.
- Anuncios con `aria-live`: recuento de resultados, respuestas de las interacciones y cambio de fase en las historias.
- Foco al `h1` al cambiar de página.
- Versión estática de todas las animaciones.

## Portarlo a WordPress

1. **Contenedor.** Todo cuelga de `<div class="ov-app">`. Los tokens se declaran en esa clase y el reset usa `.ov-app :where(…)`, que gana a los selectores de etiqueta del tema (`button`, `p`) y pierde ante cualquier clase `.ov-`, así que no hacen falta `!important`. Las únicas reglas fuera de `.ov-app` son las `@font-face` de las tipografías y los pseudoelementos `::view-transition-*`, que llevan nombres con prefijo (`ov-mira`).
2. **Tipografías.** Copia los `.woff2` de `dist/assets/` (o de `node_modules/@fontsource/`) al tema y encólalos con `wp_enqueue_style`. Nunca desde Google Fonts.
3. **Dos formas de integrarlo:**
   - **Como aplicación incrustada.** Una plantilla de página que pinte `<div id="ov-raiz"></div>` y encole el JS y el CSS de `dist/`, construidos con `VITE_BASE` igual a la ruta del tema. Es lo más rápido y conserva todas las interacciones.
   - **Como bloques.** Los textos (`src/contenido/`) y las partes estáticas (Transparencia, Qué es y qué no es, la escala, las fichas) se pueden pasar a plantillas PHP o bloques de Gutenberg copiando el HTML y el CSS. Las partes interactivas (hero, recorrido de las fases, triaje, «¿Esto se puede verificar?», «Dos caminos», «Pon a prueba la escala», portal) necesitan su JavaScript.
4. **URL limpias.** Si se prefieren direcciones como `odesocan.org/verifica/portal`, cambia `createHashRouter` por `createBrowserRouter` con `basename: '/verifica'` en `src/rutas.jsx`, y añade en WordPress una regla de reescritura que lleve todas las rutas de la sección a la misma página.
5. **Datos.** Mantén el adaptador `src/data/fuente.js` y añade, si hace falta, uno para la API REST de WordPress (por ejemplo, un tipo de contenido `verificacion`) que devuelva el mismo contrato. Nunca expongas campos internos.
6. **ClaimReview.** En producción conviene generarlo en el servidor, en el `<head>` de cada ficha, para que lo lean los buscadores aunque no ejecuten JavaScript. `src/data/claimreview.js` sirve de referencia.
7. **Registro de correcciones.** Copia el CSV de la hoja de Google al propio dominio con una tarea programada, para que las visitas no contacten con Google.
8. **Seguridad.** Traslada la política de seguridad de contenidos de `vite.config.js` a las cabeceras del servidor.
9. **Al publicar con datos reales:**
   - Retira `noindex` de `index.html` y la regla `Disallow` de `robots.txt`.
   - Cambia `ejemplo` a `false` en los datos, para que desaparezcan los avisos de ejemplo.
   - Activa `VITE_CLAIMREVIEW`.

## Publicación

El repositorio tiene dos flujos de GitHub Actions:

- `comprobar.yml`: en cada pull request y en cada push a la rama de propuesta, valida los datos, construye el modelo y comprueba que no hay rayas en los textos.
- `pages.yml`: construye y publica en GitHub Pages con `actions/upload-pages-artifact` y `actions/deploy-pages`, en cada push a `main` y también a mano.

Para activarlo hay que hacer una vez, desde la web de GitHub, **Settings > Pages > Build and deployment > Source: GitHub Actions**. Después, la publicación es automática al fusionar en `main`. Para publicar la rama de propuesta antes de fusionarla, añádela en **Settings > Environments > github-pages > Deployment branches** y lanza el flujo desde **Actions > Publicar en GitHub Pages > Run workflow**.

## Licencia

Pendiente de decidir por el equipo de ODESOCAN.

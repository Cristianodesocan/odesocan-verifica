/**
 * Capturas de cada sección a 360, 390, 768, 1024 y 1440 px de ancho, con
 * movimiento normal y reducido.
 *
 * Uso:
 *   npm run build && npm run preview          (en otra terminal)
 *   npm run pruebas:capturas
 *   npm run pruebas:capturas -- --rutas=inicio,portal --anchos=390,1440 --modos=normal
 *
 * Requiere Playwright con Chromium (npx playwright install chromium).
 * Las capturas se guardan en pruebas/resultados/capturas/ (ignorada por git).
 */
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const BASE = process.env.OV_URL ?? 'http://localhost:4173/odesocan-verifica/';
const SALIDA = new URL('./resultados/capturas/', import.meta.url).pathname;

import { RUTAS } from './capturas.config.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v?.split(',')];
  }),
);

const rutas = args.rutas ?? Object.keys(RUTAS);
const anchos = (args.anchos ?? ['360', '390', '768', '1024', '1440']).map(Number);
const modos = args.modos ?? ['normal', 'reducido'];
const completa = !args.pantalla;
const escala = Number(args.escala?.[0] ?? 1);

mkdirSync(SALIDA, { recursive: true });
const navegador = await chromium.launch();

for (const modo of modos) {
  for (const ancho of anchos) {
    const contexto = await navegador.newContext({
      viewport: { width: ancho, height: ancho < 768 ? 800 : 900 },
      deviceScaleFactor: escala,
      reducedMotion: modo === 'reducido' ? 'reduce' : 'no-preference',
      hasTouch: ancho < 1024,
      isMobile: ancho < 768,
    });
    const pagina = await contexto.newPage();
    const errores = [];
    pagina.on('pageerror', (e) => errores.push(e.message));
    pagina.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    for (const nombre of rutas) {
      await pagina.goto(BASE + RUTAS[nombre], { waitUntil: 'networkidle' });
      await pagina.waitForTimeout(modo === 'normal' ? 1600 : 300);
      const archivo = `${SALIDA}${nombre}-${ancho}-${modo}.png`;
      await pagina.screenshot({ path: archivo, fullPage: completa });
      console.log(`✓ ${nombre} ${ancho}px ${modo}`);
    }
    if (errores.length) console.log(`  errores en ${ancho}px ${modo}:\n   ${[...new Set(errores)].join('\n   ')}`);
    await contexto.close();
  }
}

await navegador.close();

/**
 * Lighthouse en móvil (configuración por defecto: Moto G con 4G lenta
 * simulada) sobre la build servida por `npm run preview`.
 *
 * Uso: npm run pruebas:lighthouse
 * Requiere Chrome o Chromium; la ruta se toma de CHROME_PATH si existe.
 * Objetivos del encargo: rendimiento ≥ 90 y accesibilidad ≥ 95.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { RUTAS } from './capturas.config.mjs';

const BASE = process.env.OV_URL ?? 'http://localhost:4173/odesocan-verifica/';
const salida = new URL('./resultados/lighthouse/', import.meta.url).pathname;
mkdirSync(salida, { recursive: true });
const rutas = process.argv.slice(2).length ? process.argv.slice(2) : ['inicio', 'portal', 'metodologia', 'envia'];
let fallos = 0;

for (const nombre of rutas) {
  const archivo = `${salida}${nombre}.json`;
  execFileSync(
    'npx',
    [
      '--yes',
      'lighthouse@12.8.2',
      BASE + RUTAS[nombre],
      '--quiet',
      '--only-categories=performance,accessibility,best-practices',
      '--output=json',
      `--output-path=${archivo}`,
      '--chrome-flags=--headless=new --no-sandbox',
    ],
    { stdio: ['ignore', 'ignore', 'inherit'], env: process.env },
  );
  const r = JSON.parse(readFileSync(archivo, 'utf8'));
  const p = Math.round(r.categories.performance.score * 100);
  const a = Math.round(r.categories.accessibility.score * 100);
  const b = Math.round(r.categories['best-practices'].score * 100);
  const lcp = r.audits['largest-contentful-paint'].displayValue;
  const tbt = r.audits['total-blocking-time'].displayValue;
  const cls = r.audits['cumulative-layout-shift'].displayValue;
  if (p < 90 || a < 95) fallos++;
  console.log(`${nombre}: rendimiento ${p}, accesibilidad ${a}, buenas prácticas ${b} (LCP ${lcp}, TBT ${tbt}, CLS ${cls})`);
}
process.exit(fallos ? 1 : 0);

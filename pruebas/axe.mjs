/**
 * Auditoría de accesibilidad con axe-core (WCAG 2.0, 2.1 y 2.2, niveles A y
 * AA) en cada sección, a 390 y 1440 px, con movimiento normal y reducido.
 *
 * Uso: npm run build && npm run preview  (en otra terminal)
 *      npm run pruebas:axe
 *
 * Sale con código 1 si hay alguna infracción grave (serious) o crítica.
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { RUTAS } from './capturas.config.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.env.OV_URL ?? 'http://localhost:4173/odesocan-verifica/';

const navegador = await chromium.launch();
const informe = [];
let graves = 0;

for (const ancho of [390, 1440]) {
  for (const modo of ['normal', 'reducido']) {
    const contexto = await navegador.newContext({
      viewport: { width: ancho, height: 900 },
      // La página prohíbe scripts en línea (CSP); axe se inyecta saltándola solo en la prueba.
      bypassCSP: true,
      reducedMotion: modo === 'reducido' ? 'reduce' : 'no-preference',
      isMobile: ancho < 768,
      hasTouch: ancho < 768,
    });
    const pagina = await contexto.newPage();
    for (const [nombre, ruta] of Object.entries(RUTAS)) {
      await pagina.goto(BASE + ruta, { waitUntil: 'networkidle' });
      await pagina.waitForTimeout(1500);
      await pagina.addScriptTag({ content: axe });
      const r = await pagina.evaluate(async () =>
        window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }),
      );
      for (const v of r.violations) {
        if (['serious', 'critical'].includes(v.impact)) graves++;
        informe.push({ ancho, modo, ruta: nombre, id: v.id, impacto: v.impact, ayuda: v.help, nodos: v.nodes.slice(0, 5).map((n) => n.target.join(' ')) });
      }
      const resumen = r.violations.map((v) => `${v.impact}:${v.id}(${v.nodes.length})`).join(', ') || 'sin infracciones';
      console.log(`${ancho}px ${modo} ${nombre}: ${resumen}`);
    }
    await contexto.close();
  }
}
await navegador.close();

mkdirSync(new URL('./resultados/', import.meta.url), { recursive: true });
writeFileSync(new URL('./resultados/axe.json', import.meta.url), JSON.stringify(informe, null, 2));
console.log(`\nInfracciones graves o críticas: ${graves}. Informe en pruebas/resultados/axe.json`);
process.exit(graves ? 1 : 0);

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Política de seguridad de contenidos del prototipo, solo en la build
 * (el servidor de desarrollo necesita scripts en línea para recargar).
 * Garantiza que la página no carga nada de terceros: ni fuentes, ni
 * analítica, ni incrustaciones. Si se configura una URL externa para el
 * registro de correcciones, su origen se añade a connect-src.
 */
function politicaContenidos(env) {
  const conexiones = ["'self'"];
  try {
    if (env.VITE_CORRECCIONES_CSV_URL) conexiones.push(new URL(env.VITE_CORRECCIONES_CSV_URL).origin);
  } catch {
    /* URL no válida: se ignora */
  }
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${conexiones.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ].join('; ');
  return {
    name: 'ov-politica-contenidos',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="utf-8" />',
        `<meta charset="utf-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    // GitHub Pages sirve el repositorio en /odesocan-verifica/.
    // Para otro destino: VITE_BASE=/verifica/ npm run build
    base: env.VITE_BASE || '/odesocan-verifica/',
    plugins: [react(), politicaContenidos(env)],
    build: {
      target: 'es2020',
      sourcemap: false,
    },
  };
});

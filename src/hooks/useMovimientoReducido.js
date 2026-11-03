import useMediaQuery from './useMediaQuery.js';

/**
 * true si la persona ha pedido movimiento reducido en su sistema.
 * Cada animación del prototipo tiene una versión estática equivalente
 * que conserva toda la información.
 */
export default function useMovimientoReducido() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

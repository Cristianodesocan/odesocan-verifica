import { LazyMotion, MotionConfig } from 'motion/react';

/**
 * Proveedor de Motion.
 *
 * Las funciones de animación (domMax, necesario para layoutId) se cargan
 * de forma diferida para no pesar en la primera carga. MotionConfig con
 * reducedMotion="user" desactiva las animaciones de transformación cuando
 * la persona ha pedido movimiento reducido en su sistema.
 */
const cargarFunciones = () => import('./movimiento-funciones.js').then((m) => m.default);

export default function Movimiento({ children }) {
  return (
    <LazyMotion features={cargarFunciones} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';
import * as m from 'motion/react-m';

const LADO = 120;
const curva = [0.2, 0.7, 0.1, 1];

/**
 * La mira se abre y contiene la definición.
 *
 * Al llegar, el anillo (destino de la transición compartida, con
 * view-transition-name: ov-mira) está cerrado en el centro; después se abre
 * en dos arcos que se desplazan hasta los bordes y se estiran hasta
 * enmarcar el texto. Con movimiento reducido, los arcos aparecen ya
 * abiertos (Motion salta al estado final).
 */
export default function DefinicionAbierta({ children }) {
  const bloque = useRef(null);
  const [medida, setMedida] = useState(null);

  useLayoutEffect(() => {
    const el = bloque.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setMedida({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dx = medida ? Math.max(0, medida.w / 2 - LADO / 2 + 2) : 0;
  const escala = medida ? Math.max(1, (medida.h + 24) / LADO) : 1;
  const transicion = { delay: 0.5, duration: 0.95, ease: curva };

  return (
    <div ref={bloque} className="ov-definicion">
      <div className="ov-definicion__nucleo" aria-hidden="true" style={{ viewTransitionName: 'ov-mira' }}>
        <m.svg
          className="ov-definicion__arco ov-definicion__arco--izq"
          viewBox="0 0 60 120"
          initial={{ x: 0, scaleY: 1 }}
          animate={medida ? { x: -dx, scaleY: escala } : undefined}
          transition={transicion}
        >
          <path d="M 58 6 A 54 54 0 0 0 58 114" vectorEffect="non-scaling-stroke" />
        </m.svg>
        <m.svg
          className="ov-definicion__arco ov-definicion__arco--der"
          viewBox="0 0 60 120"
          initial={{ x: 0, scaleY: 1 }}
          animate={medida ? { x: dx, scaleY: escala } : undefined}
          transition={transicion}
        >
          <path d="M 2 6 A 54 54 0 0 1 2 114" vectorEffect="non-scaling-stroke" />
        </m.svg>
        <m.span
          className="ov-definicion__punto"
          initial={{ opacity: 1, scale: 1 }}
          animate={medida ? { opacity: 0, scale: 0.4 } : undefined}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
      </div>
      <p className="ov-definicion__texto">{children}</p>
    </div>
  );
}

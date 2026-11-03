import { useEffect, useState } from 'react';

/** Devuelve true mientras se cumpla la media query. */
export default function useMediaQuery(consulta) {
  const leer = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(consulta).matches : false);
  const [coincide, setCoincide] = useState(leer);
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const alCambiar = () => setCoincide(mq.matches);
    alCambiar();
    mq.addEventListener('change', alCambiar);
    return () => mq.removeEventListener('change', alCambiar);
  }, [consulta]);
  return coincide;
}

export const ESCRITORIO = '(min-width: 1024px)';
export const TABLETA = '(min-width: 768px)';
export const PUNTERO_FINO = '(hover: hover) and (pointer: fine)';

import { useEffect, useState } from 'react';
import * as m from 'motion/react-m';
import { Link, useParams } from 'react-router';
import Mira from './Mira.jsx';

/**
 * Índice de lectura de las páginas largas (escritorio). La mira marca el
 * apartado que se está leyendo y se desliza al siguiente al avanzar: sigue
 * el desplazamiento nativo, sin controlarlo.
 */
export default function IndiceLectura({ apartados, base, etiqueta = 'En esta página' }) {
  const { apartado } = useParams();
  const [activo, setActivo] = useState(apartado ?? apartados[0]?.id);

  useEffect(() => {
    const elementos = apartados
      .map((a) => document.getElementById(`ov-ap-${a.id}`))
      .filter(Boolean);
    if (!elementos.length) return undefined;
    const visibles = new Map();
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => visibles.set(e.target.id, e.isIntersecting));
        const primero = elementos.find((el) => visibles.get(el.id));
        if (primero) setActivo(primero.id.replace('ov-ap-', ''));
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [apartados]);

  return (
    <nav className="ov-indice" aria-label={etiqueta}>
      <p className="ov-indice__titulo">{etiqueta}</p>
      <ol className="ov-indice__lista">
        {apartados.map((a) => (
          <li key={a.id} className="ov-indice__item">
            {activo === a.id && (
              <m.span layoutId="ov-indice-mira" className="ov-indice__mira" transition={{ type: 'spring', stiffness: 420, damping: 36 }}>
                <Mira tamano={16} grosorTrazo={8} />
              </m.span>
            )}
            <Link
              to={`${base}/${a.id}`}
              preventScrollReset
              replace
              className="ov-indice__enlace"
              aria-current={activo === a.id ? 'location' : undefined}
            >
              {a.titulo}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

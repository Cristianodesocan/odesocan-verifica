/**
 * Glifos de la escala de calificación. Cada categoría es un estado de la
 * mira, para que la forma explique la categoría sin depender del color:
 *
 *   completa   (4, Verdadero)  anillo completo, punto centrado
 *   abierta    (3, Contexto)   anillo abierto en un cuarto, punto centrado
 *   desplazada (2, Engañoso)   anillo completo, punto fuera del centro
 *   tachada    (1, Falso)      anillo atravesado por un aspa
 */
const R = 8;
const G = 2.2;

// Arco de 270 grados que deja abierto el cuadrante superior derecho.
const arcoAbierto = `M ${R} 0 A ${R} ${R} 0 1 1 0 ${-R}`;

export default function GlifoEscala({ forma, tamano = 18, className = '', titulo }) {
  const decorativo = !titulo;
  return (
    <svg
      className={`ov-glifo ${className}`}
      width={tamano}
      height={tamano}
      viewBox="-12 -12 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={G}
      strokeLinecap="round"
      role={decorativo ? undefined : 'img'}
      aria-hidden={decorativo ? 'true' : undefined}
      aria-label={titulo}
      focusable="false"
    >
      {forma === 'abierta' ? <path d={arcoAbierto} /> : <circle r={R} />}
      {forma === 'completa' && <circle r={2.7} fill="currentColor" stroke="none" />}
      {forma === 'abierta' && <circle r={2.7} fill="currentColor" stroke="none" />}
      {forma === 'desplazada' && <circle cx={4.4} cy={3.6} r={2.7} fill="currentColor" stroke="none" />}
      {forma === 'tachada' && <path d="M -5.6 -5.6 L 5.6 5.6 M 5.6 -5.6 L -5.6 5.6" />}
    </svg>
  );
}

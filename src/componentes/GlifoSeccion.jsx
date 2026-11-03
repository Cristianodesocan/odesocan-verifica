/**
 * Glifo de cada sección: el estado que adopta la mira en ella.
 * Se usa en la barra de pestañas y en el índice de Inicio.
 *
 *   que-es       la mira abierta en dos arcos
 *   metodologia  la mira sobre la línea de fases
 *   envia        la mira dentro de un visor (el foco del triaje)
 *   portal       la mira con barras de datos en su interior
 */
export default function GlifoSeccion({ seccion, tamano = 28, className = '' }) {
  const comun = {
    className: `ov-glifo-seccion ${className}`,
    width: tamano,
    height: tamano,
    viewBox: '-16 -16 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  };
  switch (seccion) {
    case 'que-es':
      return (
        <svg {...comun}>
          <path d="M -6 -11 A 11 11 0 0 0 -6 11" />
          <path d="M 6 -11 A 11 11 0 0 1 6 11" />
          <circle r={2.4} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'metodologia':
      return (
        <svg {...comun}>
          <path d="M -15 0 H -8 M 8 0 H 15" />
          <circle r={7} />
          <circle r={2.2} fill="currentColor" stroke="none" />
          <circle cx={-14} r={1.6} fill="currentColor" stroke="none" />
          <circle cx={14} r={1.6} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'envia':
      return (
        <svg {...comun}>
          <path d="M -14 -8 V -14 H -8 M 8 -14 H 14 V -8 M 14 8 V 14 H 8 M -8 14 H -14 V 8" />
          <circle r={6.5} />
          <circle r={2.2} fill="currentColor" stroke="none" />
        </svg>
      );
    case 'portal':
      return (
        <svg {...comun}>
          <circle r={11} />
          <path d="M 0 -15 V -11 M 0 11 V 15 M -15 0 H -11 M 11 0 H 15" />
          <path d="M -5 -3.5 H 4 M -5 0 H 1 M -5 3.5 H 6" strokeWidth={2} />
        </svg>
      );
    default:
      return (
        <svg {...comun}>
          <circle r={10} />
          <path d="M 0 -15 V -6 M 0 6 V 15 M -15 0 H -6 M 6 0 H 15" />
          <circle r={2.4} fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

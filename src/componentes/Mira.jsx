/**
 * La mira de ODESOCAN: un anillo, un punto central y cuatro marcas
 * cardinales. Es el hilo conductor de toda la experiencia y cambia de
 * función en cada sección (ver docs/decisiones.md, «La mira»).
 *
 * Geometría en un viewBox de -50 a 50, para que el centro sea (0, 0).
 */
export const MIRA = {
  radio: 30,
  grosor: 5,
  punto: 5.5,
  // Las marcas cruzan el anillo: empiezan dentro y terminan fuera.
  marcaDentro: 21,
  marcaFuera: 46,
};

const { radio, grosor, punto, marcaDentro, marcaFuera } = MIRA;

/** Coordenadas de las cuatro marcas en el orden norte, este, sur, oeste. */
export const MARCAS = [
  [0, -marcaDentro, 0, -marcaFuera],
  [marcaDentro, 0, marcaFuera, 0],
  [0, marcaDentro, 0, marcaFuera],
  [-marcaDentro, 0, -marcaFuera, 0],
];

/**
 * Mira estática en SVG.
 *
 * @param {number} tamano        Lado en píxeles.
 * @param {boolean[]} activas    Cuatro booleanos: marcas encendidas (norte, este, sur, oeste).
 * @param {boolean} conPunto     Dibuja el punto central.
 * @param {string} color         Color del trazo (por defecto, currentColor).
 * @param {string} colorActivo   Color de las marcas encendidas.
 */
export default function Mira({
  tamano = 40,
  activas,
  conPunto = true,
  color = 'currentColor',
  colorActivo = 'var(--ov-teal)',
  grosorTrazo = grosor,
  className = '',
  titulo,
  children,
  style,
}) {
  const decorativa = !titulo;
  return (
    <svg
      className={`ov-mira ${className}`}
      width={tamano}
      height={tamano}
      viewBox="-50 -50 100 100"
      fill="none"
      role={decorativa ? undefined : 'img'}
      aria-hidden={decorativa ? 'true' : undefined}
      aria-label={titulo}
      focusable="false"
      style={style}
    >
      <circle r={radio} stroke={color} strokeWidth={grosorTrazo} />
      {MARCAS.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={activas?.[i] ? colorActivo : color}
          strokeWidth={activas?.[i] ? grosorTrazo + 2 : grosorTrazo}
          strokeLinecap="round"
        />
      ))}
      {conPunto && <circle r={punto} fill={color} />}
      {children}
    </svg>
  );
}

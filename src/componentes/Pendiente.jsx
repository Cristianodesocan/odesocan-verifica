/**
 * Marca visible de un dato pendiente. Todos los huecos del prototipo se
 * pintan igual, entre corchetes y con fondo rayado, para que nadie confunda
 * un hueco con un dato. Nunca se sustituye por un valor inventado.
 */
export default function Pendiente({ children = 'pendiente', detalle }) {
  return (
    <span className="ov-pendiente" title={detalle ?? 'Dato pendiente de confirmar por el equipo de ODESOCAN'}>
      [{children}]
    </span>
  );
}

/** Enlace a un documento cuya URL puede estar pendiente. */
export function EnlaceDocumento({ url, children, detalle }) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <span className="ov-doc-pendiente">
      {children} <Pendiente detalle={detalle}>enlace pendiente</Pendiente>
    </span>
  );
}

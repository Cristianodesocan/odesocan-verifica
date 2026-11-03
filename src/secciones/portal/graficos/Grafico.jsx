import { useId, useState } from 'react';

/**
 * Envoltorio común de cada gráfico: título, alternancia con la tabla
 * accesible y nota de uso. La tabla contiene exactamente los mismos datos.
 */
export default function Grafico({ titulo, nota, tabla, children, className = '' }) {
  const [comoTabla, setComoTabla] = useState(false);
  const id = useId();
  return (
    <figure className={`ov-grafico ${className}`} aria-labelledby={`${id}-t`}>
      <div className="ov-grafico__cabeza">
        <h3 id={`${id}-t`} className="ov-grafico__titulo">
          {titulo}
        </h3>
        <button type="button" className="ov-grafico__alternar" aria-pressed={comoTabla} onClick={() => setComoTabla((t) => !t)}>
          {comoTabla ? 'Ver como gráfico' : 'Ver como tabla'}
        </button>
      </div>
      {comoTabla ? tabla : children}
      {nota && !comoTabla && <figcaption className="ov-grafico__nota">{nota}</figcaption>}
    </figure>
  );
}

/** Tabla accesible estándar para un gráfico de categorías. */
export function TablaCategorias({ titulo, filas, total, columna = 'Categoría' }) {
  return (
    <div className="ov-tabla-marco">
      <table className="ov-tabla">
        <caption className="ov-oculto">{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">{columna}</th>
            <th scope="col" className="ov-num">
              Verificaciones
            </th>
            <th scope="col" className="ov-num">
              Porcentaje
            </th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.clave}>
              <th scope="row">{f.etiqueta}</th>
              <td className="ov-num">{f.valor}</td>
              <td className="ov-num">{f.porcentaje}</td>
            </tr>
          ))}
        </tbody>
        {total != null && (
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td className="ov-num">{total}</td>
              <td className="ov-num">100 %</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

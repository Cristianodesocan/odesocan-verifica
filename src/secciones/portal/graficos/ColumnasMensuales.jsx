import { useEffect, useRef, useState } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';
import useMovimientoReducido from '../../../hooks/useMovimientoReducido.js';
import { mesCorto } from '../../../data/formato.js';

/**
 * Evolución mensual en columnas, dibujada con D3 dentro de un SVG que se
 * adapta al ancho disponible. Es solo de lectura; la misma información está
 * en la tabla alternativa.
 */
export default function ColumnasMensuales({ meses }) {
  const marco = useRef(null);
  const svg = useRef(null);
  const [ancho, setAncho] = useState(0);
  const reducido = useMovimientoReducido();
  const alto = 150;

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setAncho(Math.round(e.contentRect.width)));
    ro.observe(marco.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ancho || !svg.current) return;
    const m = { arriba: 18, abajo: 22 };
    const x = scaleBand()
      .domain(meses.map((d) => d.clave))
      .range([0, ancho])
      .padding(0.28);
    const y = scaleLinear()
      .domain([0, Math.max(1, ...meses.map((d) => d.valor))])
      .range([alto - m.abajo, m.arriba]);
    const raiz = select(svg.current).attr('width', ancho).attr('height', alto).attr('viewBox', `0 0 ${ancho} ${alto}`);

    raiz
      .selectAll('line.ov-columnas__base')
      .data([0])
      .join('line')
      .attr('class', 'ov-columnas__base')
      .attr('x1', 0)
      .attr('x2', ancho)
      .attr('y1', alto - m.abajo + 0.5)
      .attr('y2', alto - m.abajo + 0.5);

    const columnas = raiz
      .selectAll('rect.ov-columnas__col')
      .data(meses, (d) => d.clave)
      .join((entrar) =>
        entrar
          .append('rect')
          .attr('class', 'ov-columnas__col')
          .attr('y', alto - m.abajo)
          .attr('height', 0),
      )
      .attr('x', (d) => x(d.clave))
      .attr('width', x.bandwidth());
    (reducido ? columnas : columnas.transition().duration(700).delay((_, i) => i * 35))
      .attr('y', (d) => y(d.valor))
      .attr('height', (d) => alto - m.abajo - y(d.valor));

    raiz
      .selectAll('text.ov-columnas__valor')
      .data(meses, (d) => d.clave)
      .join('text')
      .attr('class', 'ov-columnas__valor')
      .attr('text-anchor', 'middle')
      .attr('x', (d) => x(d.clave) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.valor) - 5)
      .text((d) => (d.valor ? d.valor : ''));

    const cada = ancho < 420 ? 3 : ancho < 640 ? 2 : 1;
    raiz
      .selectAll('text.ov-columnas__mes')
      .data(meses, (d) => d.clave)
      .join('text')
      .attr('class', 'ov-columnas__mes')
      .attr('text-anchor', 'middle')
      .attr('x', (d) => x(d.clave) + x.bandwidth() / 2)
      .attr('y', alto - 6)
      .text((d, i) => (i % cada === 0 ? mesCorto(d.clave) : ''));
  }, [meses, ancho, reducido]);

  return (
    <div ref={marco} className="ov-columnas">
      <svg ref={svg} className="ov-columnas__svg" role="img" aria-label="Verificaciones publicadas por mes. Los datos están en la tabla alternativa." />
    </div>
  );
}

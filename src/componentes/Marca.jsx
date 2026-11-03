import Mira from './Mira.jsx';

/** Logotipo de la sección: la mira y el nombre del servicio. */
export default function Marca({ claro = false }) {
  return (
    <span className={`ov-marca ${claro ? 'ov-marca--claro' : ''}`}>
      <Mira tamano={30} grosorTrazo={7} className="ov-marca__mira" />
      <span className="ov-marca__texto">
        <span className="ov-marca__odesocan">Odesocan</span> <span className="ov-marca__verifica">Verifica</span>
      </span>
    </span>
  );
}

import { Link, NavLink } from 'react-router';

/**
 * Enlaces internos con View Transitions activadas: la mira de la sección
 * de origen se transforma en la de destino (view-transition-name: ov-mira).
 * Sin soporte en el navegador, la navegación es inmediata.
 */
export function Enlace(props) {
  return <Link viewTransition {...props} />;
}

export function EnlaceNav(props) {
  return <NavLink viewTransition {...props} />;
}

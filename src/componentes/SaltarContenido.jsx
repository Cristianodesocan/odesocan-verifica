/**
 * Enlace para saltar al contenido. Con HashRouter un ancla «#contenido»
 * cambiaría de ruta, así que el enlace mueve el foco a mano.
 */
export default function SaltarContenido() {
  const alPulsar = (e) => {
    e.preventDefault();
    const principal = document.getElementById('ov-contenido');
    if (principal) {
      principal.focus();
      principal.scrollIntoView();
    }
  };
  return (
    <a href="#ov-contenido" className="ov-saltar" onClick={alPulsar}>
      Saltar al contenido
    </a>
  );
}

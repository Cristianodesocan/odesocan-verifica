import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './rutas.jsx';

// Tipografías alojadas en el propio proyecto (subconjunto latino), para no
// transferir a terceros datos de quien visita la web.
import '@fontsource/ibm-plex-sans/latin-300.css';
import '@fontsource/ibm-plex-sans/latin-300-italic.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import '@fontsource/dm-serif-display/latin-400-italic.css';

import './estilos/tokens.css';
import './estilos/raiz.css';

createRoot(document.getElementById('ov-raiz')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

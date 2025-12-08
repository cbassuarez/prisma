import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/index.css';
import { PhaseProvider } from './state/PhaseContext';

// GitHub Pages 404 redirect recovery:
// If the 404.html script stored an original path, restore it here so
// BrowserRouter sees the intended URL instead of just "/".
const storedRedirectPath = (() => {
  try {
    return window.sessionStorage.getItem('prisma_redirect_path');
  } catch {
    return null;
  }
})();

if (storedRedirectPath) {
  try {
    window.sessionStorage.removeItem('prisma_redirect_path');
  } catch {
    // ignore
  }
  if (window.location.pathname === '/prisma/' || window.location.pathname === '/prisma/index.html') {
    window.history.replaceState(null, '', storedRedirectPath);
  }
}

// NEW: base name from Vite
const basename = import.meta.env.BASE_URL ?? '/';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PhaseProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </PhaseProvider>
  </React.StrictMode>,
);

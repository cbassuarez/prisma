import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/index.css';

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
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', storedRedirectPath);
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

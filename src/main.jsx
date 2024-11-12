import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from "react-helmet-async";
import 'react-chatbot-kit/build/main.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Service-worker.js').then((registration) => {
      console.log('Service Worker registrado: ', registration);
    }).catch((registrationError) => {
      console.log('Error en el registro del Service Worker: ', registrationError);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);

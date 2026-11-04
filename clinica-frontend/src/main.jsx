import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ClinicaProvider } from './context/ClinicaContext'; // <-- IMPORTA EL PROVEEDOR
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClinicaProvider>  {/* <-- ENVOLVER AQUÍ */}
      <App />
    </ClinicaProvider>
  </React.StrictMode>,
);

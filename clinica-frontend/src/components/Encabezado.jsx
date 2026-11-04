import React from 'react';
import './Encabezado.css';

export default function Encabezado() {
  const fechaActual = new Date().toLocaleDateString();
  return (
    <header className="clinica-header">
      <div className="logo-container">
        <h2>Clínica San Gabriel</h2>
      </div>
      <div className="fecha-container">
        <span>Fecha de Trabajo: {fechaActual}</span>
      </div>
    </header>
  );
}

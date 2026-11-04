import React from 'react';

export default function TarjetaMedico({ nombres, cmp, especialidad_nombre, foto }) {
  const imagenDefecto = "https://placeholder.com";
  return (
    <div className="tarjeta-medico">
      <img src={foto || imagenDefecto} alt={nombres} />
      <h4>{nombres}</h4>
      <p><strong>CMP:</strong> {cmp}</p>
      <p><strong>Especialidad:</strong> {especialidad_nombre || "General"}</p>
    </div>
  );
}

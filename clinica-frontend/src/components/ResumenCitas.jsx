import React from 'react';

export default function ResumenCitas({ citas }) {
  // Cálculo de totales dinámicos a partir de las props heredadas
  const conteo = citas.reduce((acc, c) => {
    const nombreEstado = c.estado_nombre || "Pendiente";
    acc[nombreEstado] = (acc[nombreEstado] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="resumen-citas-dashboard" style={{ display: 'flex', gap: '1.5rem', margin: '1.5rem 0', padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
      <div>Total Programadas: <strong>{citas.length}</strong></div>
      {Object.entries(conteo).map(([estado, total]) => (
        <div key={estado}>{estado}: <strong>{total}</strong></div>
      ))}
    </div>
  );
}

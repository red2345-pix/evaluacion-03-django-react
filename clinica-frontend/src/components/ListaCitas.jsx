import React from 'react';

function ItemCita({ cita, onSeleccionar }) {
  return (
    <div className="item-cita-card" style={{ borderLeft: '4px solid #2563eb', padding: '0.75rem', marginBottom: '0.5rem', background: '#f9fafb' }}>
      <p><strong>Hora:</strong> {cita.hora} | <strong>Paciente:</strong> {cita.paciente_nombre}</p>
      <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Dr. {cita.medico_nombre} ({cita.especialidad})</p>
      <p>Status: <span className={`badge status-${cita.estado}`}>{cita.estado_nombre || "Pendiente"}</span></p>
      <button className="btn-link" onClick={() => onSeleccionar(cita.id)}>Ver detalle →</button>
    </div>
  );
}

export default function ListaCitas({ citas, onSeleccionar }) {
  return (
    <div className="lista-citas-container">
      <h4>Citas Registradas en el Día</h4>
      {citas.length === 0 ? (
        <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No existen citas programadas para esta fecha.</p>
      ) : (
        citas.map(c => <ItemCita key={c.id} cita={c} onSeleccionar={onSeleccionar} />)
      )}
    </div>
  );
}

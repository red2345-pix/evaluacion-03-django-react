import React from 'react';
import { actualizarEstadoCita } from '../services/api';

export default function DetalleCita({ cita, onCambiarEstado }) {
  if (!cita) {
    return (
      <div className="detalle-vacio" style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', border: '2px dashed #e5e7eb' }}>
        Seleccione una cita de la lista para auditar sus detalles y gestionar estados.
      </div>
    );
  }

  // IDs asignados comúnmente: 2 para Confirmada, 3 para Atendida, 4 para Cancelada
  // Supongamos que "Atendida" (3) y "Cancelada" (4) representan estados finales (es_final = True)
  const esEstadoFinal = cita.estado === 3 || cita.estado === 4;

  const handlePatch = (nuevoEstadoId) => {
    actualizarEstadoCita(cita.id, nuevoEstadoId)
      .then(res => {
        onCambiarEstado(cita.id, res.data);
      })
      .catch(err => {
        console.error("Error completo de Django:", err.response?.data);
        alert(`Error del servidor: ${JSON.stringify(err.response?.data)}`);
      });
  };


  return (
    <div className="detalle-cita-card" style={{ padding: '1.5rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <h3>Ficha de Auditoría de Cita</h3>
      <p><strong>Paciente:</strong> {cita.paciente_nombre}</p>
      <p><strong>Médico Tratante:</strong> {cita.medico_nombre}</p>
      <p><strong>Especialidad:</strong> {cita.especialidad}</p>
      <p><strong>Fecha / Hora:</strong> {cita.fecha} a las {cita.hora}</p>
      <p><strong>Motivo Clínico:</strong> {cita.motivo}</p>
      <p><strong>Estado Actual:</strong> <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{cita.estado_nombre || "Pendiente"}</span></p>

      <div className="acciones-estado" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => handlePatch(2)} disabled={esEstadoFinal || cita.estado === 2} className="btn-confirmar">
          Confirmar
        </button>
        <button onClick={() => handlePatch(3)} disabled={esEstadoFinal} className="btn-atendida">
          Marcar como Atendida
        </button>
        <button onClick={() => handlePatch(4)} disabled={esEstadoFinal} className="btn-cancelar">
          Cancelar Cita
        </button>
      </div>
      {esEstadoFinal && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem' }}>* Esta cita se encuentra en un estado final irreversible.</p>}
    </div>
  );
}

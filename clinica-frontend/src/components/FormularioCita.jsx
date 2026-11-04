import React, { useState, useContext } from 'react';
import { crearCita } from '../services/api';
import { ClinicaContext } from '../context/ClinicaContext';

export default function FormularioCita({ medicos, pacientes, onCitaCreada }) {
  const { fechaTrabajo, recepcionista } = useContext(ClinicaContext);
  const estadoInicial = { paciente: '', medico: '', hora: '', motivo: '', estado: 1 };
  const [form, setForm] = useState(estadoInicial);
  const [errorBackend, setErrorBackend] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorBackend(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Adjunta automáticamente la fecha de trabajo proveniente del contexto global
    const payload = { ...form, fecha: fechaTrabajo };

    crearCita(payload)
      .then(res => {
        alert("Cita médica agendada correctamente.");
        onCitaCreada(res.data); // Callback hacia el padre
        setForm(estadoInicial);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setErrorBackend(err.response.data);
        } else {
          alert("Error de conexión al procesar la cita.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-cita-panel">
      <h4>Agendar Cita (Recepción: {recepcionista})</h4>
      <p style={{ fontSize: '0.85rem', color: '#555' }}>Fecha asignada: <strong>{fechaTrabajo}</strong></p>

      {errorBackend && (
        <div className="error-summary-box" style={{ background: '#fee2e2', padding: '0.5rem', color: '#dc2626', marginBottom: '1rem', borderRadius: '4px' }}>
          {errorBackend.fecha && <p> {errorBackend.fecha}</p>}
          {errorBackend.hora && <p>{errorBackend.hora}</p>}
          {errorBackend.non_field_errors && <p>{errorBackend.non_field_errors}</p>}
        </div>
      )}

      <div className="form-group">
        <select name="paciente" value={form.paciente} onChange={handleChange} required>
          <option value="">-- Seleccionar Paciente --</option>
          {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombres} (DNI: {p.dni})</option>)}
        </select>
      </div>

      <div className="form-group">
        <select name="medico" value={form.medico} onChange={handleChange} required>
          <option value="">-- Seleccionar Médico --</option>
          {medicos.map(m => <option key={m.id} value={m.id}>{m.nombres} - {m.especialidad_nombre}</option>)}
        </select>
      </div>

      <div className="form-group">
        <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <textarea name="motivo" placeholder="Motivo de la consulta médica" value={form.motivo} onChange={handleChange} required />
      </div>

      <button type="submit" className="btn btn-primario">Confirmar Agenda</button>
    </form>
  );
}

import React, { useState, useEffect } from 'react';
import { getEspecialidades, getMedicos } from '../services/api';
import TarjetaMedico from './TarjetaMedico';

export default function FiltroEspecialidad() {
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [seleccionada, setSeleccionada] = useState('');

  useEffect(() => {
    getEspecialidades().then(res => setEspecialidades(res.data));
    getMedicos().then(res => setMedicos(res.data));
  }, []);

  const handleEspecialidadChange = (e) => {
    const id = e.target.value;
    setSeleccionada(id);
    getMedicos(id).then(res => setMedicos(res.data));
  };

  return (
    <div className="filtro-medicos-seccion">
      <h3>Filtrado de Personal Médico</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label>Seleccionar Especialidad: </label>
        <select value={seleccionada} onChange={handleEspecialidadChange}>
          <option value="">-- Todas las Especialidades --</option>
          {especialidades.map(esp => (
            <option key={esp.id} value={esp.id}>{esp.nombre}</option>
          ))}
        </select>
      </div>

      <p>Médicos encontrados bajo este criterio: <strong>{medicos.length}</strong></p>

      <div className="medicos-grid" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {medicos.map(m => (
          <TarjetaMedico 
            key={m.id}
            nombres={m.nombres}
            cmp={m.cmp}
            especialidad_nombre={m.especialidad_nombre}
            foto={m.foto}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { getPacientes, eliminarPaciente } from '../services/api';
import Boton from './Boton';

export default function GestionPacientes({ listaActualizada }) {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const cargarPacientes = () => {
    getPacientes()
      .then(res => setPacientes(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    cargarPacientes();
  }, [listaActualizada]);

  const handleEliminar = (id, nombres) => {
    if (window.confirm(`¿Está seguro de eliminar al paciente ${nombres}?`)) {
      eliminarPaciente(id)
        .then(() => cargarPacientes())
        .catch(() => alert("No se puede eliminar el paciente debido a que cuenta con dependencias activas."));
    }
  };

  const pacientesFiltrados = pacientes.filter(p =>
    p.nombres.toLowerCase().includes(busqueda.toLowerCase()) || p.dni.includes(busqueda)
  );

  return (
    <div className="panel-pacientes">
      <h3>Buscador de Pacientes</h3>
      <div className="buscador-pacientes" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Buscar por Nombre o DNI..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
        />
        <Boton variante="secundario" onClick={() => setBusqueda('')}>Limpiar</Boton>
      </div>

      <table className="tabla-pacientes" border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Paciente</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientesFiltrados.map(p => (
            <tr key={p.id}>
              <td>{p.dni}</td>
              <td>{p.nombres}</td>
              <td>{p.correo}</td>
              <td>
                <Boton variante="peligro" onClick={() => handleEliminar(p.id, p.nombres)}>Eliminar</Boton>
              </td>
            </tr>
          ))}
          {pacientesFiltrados.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No hay registros que coincidan con la búsqueda.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

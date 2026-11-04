import React, { useState, useEffect } from 'react';
import Encabezado from './components/Encabezado';
import PiePagina from './components/PiePagina';
import FormularioPaciente from './components/FormularioPaciente';
import GestionPacientes from './components/GestionPacientes';
import FiltroEspecialidad from './components/FiltroEspecialidad';
import PaginaCitas from './pages/PaginaCitas'; // <-- IMPORTA LA NUEVA PÁGINA
import { getEspecialidades } from './services/api';
import './App.css';

function App() {
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [refrescarPacientes, setRefrescarPacientes] = useState(0);

  useEffect(() => {
    getEspecialidades()
      .then(response => {
        setEspecialidades(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo establecer comunicación con el servidor API.');
        setCargando(false);
      });
  }, []);

  return (
    <div className="app-container">
      <Encabezado />
      
      <main className="content">
        {/* NUEVA SECCIÓN DE CITAS (PREGUNTA 4) */}
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <PaginaCitas />
        </div>

        <hr className="divider" style={{ margin: '2.5rem 0', border: '0', borderTop: '2px solid #e5e7eb' }} />

        {/* SECCIONES ANTERIORES */}
        <div className="seccion-pacientes" style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <FormularioPaciente onPacienteCreado={() => setRefrescarPacientes(prev => prev + 1)} />
          </div>
          <div style={{ flex: '2', minWidth: '400px' }}>
            <GestionPacientes listaActualizada={refrescarPacientes} />
          </div>
        </div>
        
        <hr className="divider" style={{ margin: '2.5rem 0', border: '0', borderTop: '2px solid #e5e7eb' }} />
        <FiltroEspecialidad />
      </main>

      <PiePagina />
    </div>
  );
}

export default App;

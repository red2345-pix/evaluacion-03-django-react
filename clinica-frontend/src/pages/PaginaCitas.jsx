import React, { useState, useEffect, useContext } from 'react';
import { getCitas, getMedicos, getPacientes } from '../services/api';
import { ClinicaContext } from '../context/ClinicaContext';
import FormularioCita from '../components/FormularioCita';
import ListaCitas from '../components/ListaCitas';
import DetalleCita from '../components/DetalleCita';
import ResumenCitas from '../components/ResumenCitas';

export default function PaginaCitas() {
  const { fechaTrabajo } = useContext(ClinicaContext);
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [citaSeleccionadaId, setCitaSeleccionadaId] = useState(null);

  useEffect(() => {
    getMedicos().then(res => setMedicos(res.data));
    getPacientes().then(res => setPacientes(res.data));
  }, []);

  useEffect(() => {
    getCitas(fechaTrabajo).then(res => setCitas(res.data));
    setCitaSeleccionadaId(null); // Limpiar detalles al cambiar la fecha de trabajo
  }, [fechaTrabajo]);

  const handleCitaCreada = (nuevaCita) => {
    setCitas([...citas, nuevaCita]);
  };

  const handleCambioEstado = (idCitaModificada, nuevoCitaData) => {
    setCitas(citas.map(c => c.id === idCitaModificada ? { ...c, ...nuevoCitaData } : c));
  };

  const citaSeleccionada = citas.find(c => c.id === citaSeleccionadaId);

  return (
    <div className="workspace-citas">
      <h3>Módulo Operativo de Citas Médicas</h3>
      
      {/* Resumen General alimentado por el estado local */}
      <ResumenCitas citas={citas} />

      <div className="pagina-citas-grid" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="col-izquierda" style={{ flex: '1', minWidth: '320px' }}>
          <FormularioCita medicos={medicos} pacientes={pacientes} onCitaCreada={handleCitaCreada} />
          <div style={{ marginTop: '2rem' }}>
            <ListaCitas citas={citas} onSeleccionar={setCitaSeleccionadaId} />
          </div>
        </div>
        <div className="col-derecha" style={{ flex: '1', minWidth: '320px' }}>
          <DetalleCita cita={citaSeleccionada} onCambiarEstado={handleCambioEstado} />
        </div>
      </div>
    </div>
  );
}

import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/';

export const getEspecialidades = () => axios.get(`${API_BASE}especialidades/`);
export const getMedicos = (especialidadId = '') => {
    const url = especialidadId ? `${API_BASE}medicos/?especialidad=${especialidadId}` : `${API_BASE}medicos/`;
    return axios.get(url);
};
export const getPacientes = () => axios.get(`${API_BASE}pacientes/`);
export const getCitas = (fecha = '') => {
    const url = fecha ? `${API_BASE}citas/?fecha=${fecha}` : `${API_BASE}citas/`;
    return axios.get(url);
};
export const crearPaciente = (datos) => axios.post(`${API_BASE}pacientes/`, datos);
export const eliminarPaciente = (id) => axios.delete(`${API_BASE}pacientes/${id}/`);
export const crearCita = (datos) => axios.post(`${API_BASE}citas/`, datos);
export const actualizarEstadoCita = (id, estadoId) => axios.patch(`${API_BASE}citas/${id}/`, { estado: estadoId });

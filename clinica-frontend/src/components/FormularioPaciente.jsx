import React, { useState } from 'react';
import { crearPaciente } from '../services/api';

export default function FormularioPaciente({ onPacienteCreado }) {
  const [form, setForm] = useState({ dni: '', nombres: '', fecha_nacimiento: '', telefono: '', correo: '' });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    let err = {};
    if (form.dni.length !== 8 || isNaN(form.dni)) err.dni = "El DNI debe tener 8 dígitos numéricos.";
    if (!form.nombres.trim()) err.nombres = "El nombre es requerido.";
    if (!form.fecha_nacimiento) err.fecha_nacimiento = "La fecha es requerida.";
    if (!form.correo.includes('@')) err.correo = "El correo ingresado no es válido.";
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    crearPaciente(form)
      .then(res => {
        alert("Paciente registrado con éxito.");
        onPacienteCreado(res.data);
        setForm({ dni: '', nombres: '', fecha_nacimiento: '', telefono: '', correo: '' });
        setErrores({});
      })
      .catch(err => alert("Error en el servidor al guardar el registro."));
  };

  return (
    <form onSubmit={handleSubmit} className="form-controlado">
      <input type="text" name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      {errores.dni && <span className="err">{errores.dni}</span>}
      
      <input type="text" name="nombres" placeholder="Nombres Completos" value={form.nombres} onChange={handleChange} />
      {errores.nombres && <span className="err">{errores.nombres}</span>}

      <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
      {errores.fecha_nacimiento && <span className="err">{errores.fecha_nacimiento}</span>}

      <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      <input type="text" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
      {errores.correo && <span className="err">{errores.correo}</span>}

      <button type="submit">Registrar Paciente</button>
    </form>
  );
}

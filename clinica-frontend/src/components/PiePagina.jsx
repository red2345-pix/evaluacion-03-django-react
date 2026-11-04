import React from 'react';

export default function PiePagina() {
  return (
    <footer className="clinica-footer" style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
      <p>&copy; {new Date().getFullYear()} Clínica San Gabriel - Todos los derechos reservados.</p>
    </footer>
  );
}

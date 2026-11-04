import React from 'react';

export default function Boton({ texto, variante = 'primario', onClick, children }) {
  return (
    <button className={`btn btn-${variante}`} onClick={onClick}>
      {texto || children}
    </button>
  );
}

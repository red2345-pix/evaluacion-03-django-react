import React, { createContext, useState } from 'react';

export const ClinicaContext = createContext();

export function ClinicaProvider({ children }) {
  const [recepcionista, setRecepcionista] = useState("María López");
  const [fechaTrabajo, setFechaTrabajo] = useState(new Date().toISOString().split('T')[0]);

  return (
    <ClinicaContext.Provider value={{ recepcionista, setRecepcionista, fechaTrabajo, setFechaTrabajo }}>
      {children}
    </ClinicaContext.Provider>
  );
}

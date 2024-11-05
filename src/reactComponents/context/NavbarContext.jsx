// ontexto para el Navbar
import { createContext, useState } from 'react';

// Primero creamos el contexto
export const NavbarContext = createContext();

// Luego creamos el provider que lo usa
export const NavbarProvider = ({ children }) => {
  const [generalWidth, setGeneralWidth] = useState({});
  
  return (
    <NavbarContext.Provider value={{ generalWidth, setGeneralWidth }}>
      {children}
    </NavbarContext.Provider>
  );
};
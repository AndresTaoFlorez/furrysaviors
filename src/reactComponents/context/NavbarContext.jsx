

// Crear contexto para el Navbar

import { createContext, useState } from 'react';

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [generalWidth, setGeneralWidth] = useState({});

  return (
    <NavbarContext.Provider value={{ generalWidth, setGeneralWidth }}>
      {children}
    </NavbarContext.Provider>
  );
};

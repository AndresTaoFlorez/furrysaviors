// ontexto para el Navbar
import { createContext, useContext, useState } from 'react';
import { GlobalContext } from './GlobalContext';

// Primero creamos el contexto
export const NavbarContext = createContext();

// Luego creamos el provider que lo usa
export const NavbarProvider = ({ children }) => {
  const [generalWidth, setGeneralWidth] = useState({});
  const { isLoading} = useContext(GlobalContext)
  
  return (
    <NavbarContext.Provider value={{ generalWidth, setGeneralWidth }}>
      {!isLoading ? children : 'Loading'}
    </NavbarContext.Provider>
  );
};
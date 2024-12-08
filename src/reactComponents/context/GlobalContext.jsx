import { useState, createContext, useEffect } from 'react'
import { useConfigContext } from '../customHooks/useConfigContext';
import { useLoginContext } from '../customHooks/useLoginContext';

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

  // config, inicializa con valores por defecto
  const [config, setConfig] = useState({
    activeIndex: 0, // o cualquier valor por defecto
    currentUrl: ''  // o cualquier valor por defecto
  });

  // usersSession
  const [userSession, setUserSession] = useState({
    user: null,
    token: null
  });

  // Loading para saber el estado de la carga
  const [isLoading, setIsLoading] = useState(true);

  // incluir funcionalidad de ConfigContext
  useConfigContext(config, setConfig, userSession, setUserSession, isLoading, setIsLoading)

  // incluir funcionalidad de LoginContext
  useLoginContext(userSession, setUserSession, isLoading, setIsLoading);

  return (
    <GlobalContext.Provider value={{ userSession, setUserSession, config, setConfig, isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  )
}

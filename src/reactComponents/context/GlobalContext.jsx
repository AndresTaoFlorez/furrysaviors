import { useState, createContext, useEffect } from 'react'
import { useConfigContext } from '../customHooks/useConfigContext';
import { useLoginContext } from '../customHooks/useLoginContext';

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

  // config, inicializa con valores por defecto
  const storedUserSessionData = window.localStorage.getItem('userSessionData');
  const parsedUserSessionData = storedUserSessionData ? JSON.parse(storedUserSessionData) : {};

  const initialState = {
    activeIndex: parsedUserSessionData.config?.activeIndex || 0, // Usa el operador de encadenamiento opcional
    currentUrl: parsedUserSessionData.config?.currentUrl || '', // Usa el operador de encadenamiento opcional
  };

  const [config, setConfig] = useState(initialState);

  // usersSession
  const [userSession, setUserSession] = useState({
    user: JSON.parse(window.localStorage.getItem('userSessionData')) || null,
    token: JSON.parse(window.localStorage.getItem('loggedUserToken')) || null
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

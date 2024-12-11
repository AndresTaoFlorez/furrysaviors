import { useState, createContext, useEffect } from 'react'
import { checkSessionService } from '../../services.js/login'
import { useConfigContext } from '../customHooks/useConfigContext';
import { useLoginContext } from '../customHooks/useLoginContext';

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

  const [config, setConfig] = useState({});

  // usersSession
  const [userSession, setUserSession] = useState({
    user: '',
    token: ''
  });

  // Loading para saber el estado de la carga
  const [isLoading, setIsLoading] = useState(true);

  // incluir funcionalidad de ConfigContext
  useConfigContext({ config, setConfig, userSession, isLoading, setIsLoading })

  // incluir funcionalidad de LoginContext
  useLoginContext({ setUserSession, setIsLoading });

  return (
    <GlobalContext.Provider value={{ userSession, setUserSession, config, setConfig, isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  )
}

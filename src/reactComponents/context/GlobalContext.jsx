import { useState, useContext, useEffect, createContext, Children } from 'react'
import { useConfigContext } from '../customHooks/useConfigContext';
import { useLoginContext } from '../customHooks/useLoginContext';


export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

  // config
  const [config, setConfig] = useState({
    activeIndex: Number,
    currentUrl: String
  })

  // usersSession
  const [userSession, setUserSession] = useState(
    {
      user: null,
      token: null
    }
  );

  // Loading to usersSession when loggin try
  const [isLoading, setIsLoading] = useState(true); // Estado para saber si está cargando la sesión

  // incluir funcionalidad de ConfigContext
  useConfigContext(config, setConfig, userSession, isLoading)

  // incluir funcionalidad de LoginContext
  useLoginContext(userSession, setUserSession, isLoading, setIsLoading);

  return (
    <GlobalContext.Provider value={{userSession, setUserSession, config, setConfig, isLoading, setIsLoading}}>
      {children}
    </GlobalContext.Provider>
  )
}
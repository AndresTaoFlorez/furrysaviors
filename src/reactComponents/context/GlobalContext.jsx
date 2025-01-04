import { useState, createContext, useEffect } from 'react'
import { deleteCurrentUrl, deleteUserAndToken } from '../../services.js/login'
import { useConfigContext } from '../customHooks/useConfigContext';
import { useLoginContext } from '../customHooks/useLoginContext';

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

  const [config, setConfig] = useState({});
  const [newIndex, setNewIndex] = useState({});
  const [changeToThisIndex, setChangeToThisIndex] = useState({})

  const [userSession, setUserSession] = useState({
    user: '',
    token: ''
  });

  const [currentUrl, setCurrentUrl] = useState(null)
  const [menuOptions, setMenuOptions] = useState({
    option0: 'home',
    option1: 'option1',
    option2: 'option2',
    option3: 'option3',
  })

  const deleteSessionData = () => {
    deleteUserAndToken()
    setUserSession(null)
    setConfig(null)
    setCurrentUrl(null)
    deleteCurrentUrl()
  }

  const [isLoading, setIsLoading] = useState(true);

  useConfigContext({
    config,
    setConfig,
    userSession,
    setUserSession,
    isLoading,
    setIsLoading,
    currentUrl,
    setChangeToThisIndex,
    setMenuOptions,
    deleteSessionData,
    newIndex,
    setNewIndex
  })

  useLoginContext({ setUserSession, setIsLoading });

  const GlobalContextValues = {
    config,
    setConfig,
    userSession,
    setUserSession,
    isLoading,
    setIsLoading,
    currentUrl,
    setCurrentUrl,
    changeToThisIndex,
    setChangeToThisIndex,
    menuOptions,
    setMenuOptions,
    deleteSessionData,
    newIndex,
    setNewIndex
  }

  return (
    <GlobalContext.Provider
      value={GlobalContextValues}
    >
      {children}
    </GlobalContext.Provider>
  )
}

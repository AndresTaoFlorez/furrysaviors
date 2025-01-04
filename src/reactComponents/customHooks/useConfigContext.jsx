import { useEffect, useRef } from "react";
import { getUser, updateUser } from '../../services.js/user'
import { checkSessionService, setUser } from '../../services.js/login'
import { isBad } from '../../services.js/dataVerify'
import {isEqual } from "lodash";

/**
 * Custom hook to manage configuration and user session
 * @param {Object} config - Current configuration state
 * @param {Function} setConfig - Function to update configuration
 * @param {Object} userSession - User session object
 * @param {Function} setUserSession - Function to update user session
 * @param {boolean} isLoading - Loading indicator
 * @param {Function} setIsLoading - Function to set loading state
 * @param {Function} navigate - Navigation function
 */
export const useConfigContext = ({
  config = {},
  setConfig = () => { },
  userSession = {},
  isLoading = false,
  setIsLoading = () => { },
  navigate = () => { },
  currentUrl = {},
  setChangeToThisIndex = () => { },
  setUserSession = () => { },
  menuOptions = {},
  deleteSessionData = () => { },
  newIndex = {},
  setNewIndex = () => { },
}) => {

  // config state ref to get latest value
  const prevConfig = useRef(config)

  // 1. Initialize config data when page loads
  useEffect(() => {
    setIsLoading(true)

    const initializeData = async () => {
      try {
        // 1. verify localstorage token
        const userData = checkSessionService()
        // 2. if not exist data, set default config
        if (isBad(userData)) { setConfig(null); return }
        // 3. get config from server
        const data = await getUser(userData.token)
        if (isBad(data)) { deleteSessionData(); return }
        const configFromServer = userData.user.config
        // 4. update config state with config from server
        setConfig(configFromServer)

      } catch { () => null }
      finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  const deleteConfig = () => {
    setConfig({})
  }

  // when url from location and url writed is different
  /**
   * 
   * @param {*} param.newUrl - New URL to update configuration
   * @param {*} param.locationUrl - URL from location or currentUrl
   */
  const updateAllConfigData = async ({ newUrl, oldUrl }) => {
    // 1. get the new search bar writed and get the current url from location
    // 2. compare if the new search bar is different from the current url
    if (isEqual(newUrl, oldUrl)) return

    // 4. update the config in the local storage
    const userData = checkSessionService()
    if (isBad(userData, { secondLevel: true })) return

    const user = userData.user
    const token = userData.token
    const oldConfig = userData.user.config

    const currentIndex = changeIndex({ newUrl, menuOptions }) // fix this funcions !!!


    if (isBad(currentIndex) || currentIndex === oldConfig.activeIndex) return
    const newConfig = { activeIndex: currentIndex, currentUrl: newUrl }
    user.config = newConfig

    // console.log('to', { pathname: newUrl, index: currentIndex });

    // set on localStorage the newUrl and the newIndex
    setUser(user)
    // set on server the newUrl and the newIndex
    setUserSession((prev) => ({
      ...prev,
      user
    }))
    await updateUser(newConfig, token)
    setConfig(newConfig)
    // set on userSession State the newUrl and the newIndex
    // set on config State the newUrl and the newIndex

    navigate(newUrl)
  }

  const changeIndex = ({ newUrl, menuOptions }) => {
    if (!newUrl || !menuOptions) return null

    const lastSegment = newUrl.split('/').pop(); // 'option1', 'option2', ...
    const entries = Object.entries(menuOptions);
    const entry = entries.find(([key, value]) => value === lastSegment);
    const index = entries.indexOf(entry)
    const key = entry ? entry[0] : null; // Devuelve la llave o null si no se encuentra
    return index; // Cambiado para devolver la llave
  };


  // try to update the child index from here - childIndex

  // Effect to update userSessionData in localStorage when config changes
  useEffect(() => {

    if (isEqual(prevConfig.current, config)) return; // Evita la ejecución si no ha cambiado
    if (isBad(prevConfig.current) || isLoading) {
      prevConfig.current = false;
      return;
    }

    const syncUserData = async () => {
      try {
        // Check if userData from localStorage is exist and is true
        const userData = checkSessionService()

        if (isBad(userData, userSession)) {
          deleteSessionData()
          return
        }
        if (isBad(config, currentUrl, prevConfig.current, isLoading)) return

        const loggedUserToken = userData.token
        const userSessionData = userData.user

        // compare config from server with config from localStorage
        // send config state data to server

        const verifySession = async () => {
          if (isBad(userData)) return
          const response = await getUser(userData.token)

          if (response?.status !== 200) { deleteSessionData(); return }

          await updateUser(config, loggedUserToken)
          userSessionData.config = config
          setUser(userSessionData)
          return
        }
        verifySession()

      } catch {
        (error) => console.log(error);
      }
    }

    syncUserData()
  }, [config])


  useEffect(() => {
    setIsLoading(true)
    const navigateToUserUrl = () => {
      try {
        const userData = checkSessionService();
        if (isBad(userData, userSession?.token)) return

        const newConfig = userData.user.config;
        setConfig(newConfig);
      } catch (error) {
        console.error("navegando a la URL del usuario", error);
      } finally {
        setIsLoading(false)
      }
    };
    navigateToUserUrl();
  }, [userSession?.token]);


  return { deleteConfig, updateAllConfigData }
};

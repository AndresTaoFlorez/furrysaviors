import { useEffect, useRef } from "react";
import { updateUser } from '../../services.js/user'
import { checkSessionService } from '../../services.js/login'
import { isNil, isEmpty, isEqual } from "lodash";

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
  location = {}
}) => {

  const prevConfig = useRef(config)
  const prevPathname = useRef(location.pathname); // Controla la URL previa para evitar bucles infinitos

  // Effect to update userSessionData in localStorage when config changes
  useEffect(() => {
    if (!prevConfig.current) return
    prevConfig.current = true

    const syncUserData = async () => {
      try {
        const loggedUserToken = JSON.parse(window.localStorage.getItem('loggedUserToken'))
        const userSessionData = JSON.parse(window.localStorage.getItem('userSessionData'))

        if (isNil(config) || isEmpty(config)) return

        userSessionData.config = config
        window.localStorage.setItem('userSessionData', JSON.stringify(userSessionData))
        await updateUser(config, loggedUserToken)
      } catch { () => null }
    }

    syncUserData()
  }, [config])

  // Initialize config data
  useEffect(() => {
    setIsLoading(true)
    if (prevConfig.current) return
    prevConfig.current = true

    const initializeData = () => {
      try {
        const userData = checkSessionService()
        if (isNil(userData) || isEmpty(userData)) return

        const { config } = userData.user
        setConfig(config)
      } catch { () => null }
      finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  useEffect(() => {
    if (isNil(userSession) || isLoading) return;

    const navigateToUserUrl = async () => {
      try {
        const userData = await checkSessionService();
        if (isNil(userData) || isEmpty(userData)) return;

        const newConfig = userData.user.config;
        setConfig(newConfig);

        if (isNil(newConfig) || isNil(location) || isEmpty(location) || isEqual(newConfig, location)) return;
        if (isEqual(newConfig.currentUrl, location.pathname)) return;

        const newUrl = "http://localhost:5173/furrysaviors" + newConfig.currentUrl;

        if (isEqual(prevPathname.current, newUrl)) return;
        navigate(newUrl);
        console.log(`Navigating to: ${newUrl}`);
      } catch (error) {
        console.error("Error navegando a la URL del usuario", error);
      }
    };

    navigateToUserUrl();
  }, [userSession?.token]);


};

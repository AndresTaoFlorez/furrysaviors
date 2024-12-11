import { useState } from 'react';
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
  setCurrentUrl = () => { },
  currentUrl = '',
  navigate = () => { },
  location = {}
}) => {

  const prevConfig = useRef(config)

  // Effect to update userSessionData in localStorage when config changes
  useEffect(() => {

    if (!prevConfig.current) return
    prevConfig.current = true

    const syncUserData = async () => {
      try {

        const userData = checkSessionService()
        if (isNil(userData) || isEmpty(userData)) return

        const loggedUserToken = userData.token
        const userSessionData = userData.user

        if (isNil(config) || isEmpty(config)) return

        if (currentUrl.currentUrl === "/home") return
        const newConfig = { ...config, ...currentUrl }

        userSessionData.config = newConfig
        console.log(userSessionData.config);

        window.localStorage.setItem('userSessionData', JSON.stringify(userSessionData))
        await updateUser(newConfig, loggedUserToken)
      } catch { () => null }
    }

    syncUserData()
  }, [config, currentUrl])

  // Initialize config data when page loads
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

        if (isNil(config) || isEmpty(userData)) return;

        const newConfig = userData.user.config;
        setConfig(newConfig);

        // if (isNil(location) || isEmpty(location) || isEqual(config, location)) return;
        // if (isEqual(prevPathname.current, config.currentUrl)) return;

      } catch (error) {
        // console.error("Error navegando a la URL del usuario", error);
      }
    };

    navigateToUserUrl();
  }, [userSession?.token]);


};

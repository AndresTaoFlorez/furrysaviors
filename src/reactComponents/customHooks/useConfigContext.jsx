import { useState } from 'react';
import { useEffect } from "react";
import { update, getConfig } from '../../services.js/updateConfig'

/**
 * Custom hook para gestionar la configuración y la obtención de usuarios
 * @param {Object} config - Estado de configuración
 * @param {Function} setConfig - Función para actualizar la configuración
 * @param {Object} userSession - Sesión del usuario
 * @param {Function} setUserSession - Función para actualizar la sesión del usuario
 * @param {boolean} isLoading - Indicador de carga
 * @param {Function} setIsLoading - Función para actualizar el estado de carga
 */
export const useConfigContext = (config, setConfig, userSession, setUserSession, isLoading, setIsLoading) => {

  // initialize config values from localstorge if exist
  useEffect(() => {

    setIsLoading(true)
    try {
      const token = window.localStorage.getItem('loggedUserToken')
      const parsedToken = JSON.parse(token)
      const getConfigData = async () => {
        const res = await getConfig(parsedToken);
        const newConfig = userSession.user?.config
        setConfig(newConfig)
      }
      getConfigData()
    } catch (error) {
      console.error('Error obteniendo userSessionData en localStorage:', error);
    } finally {
      setIsLoading(false)
    }
  }, [userSession]);

  // update when config.currentUrl changes
  useEffect(() => {
    if (config && Object.keys(config).length > 0) { // Verificar que config no esté vacío
      const updatedConfig = async () => {
        const res = await update(config, userSession.token);
        // console.log(res);
      };
      try {
        const userSessionData = window.localStorage.getItem('userSessionData');
        if (userSessionData) {
          const parsedUserSessionData = JSON.parse(userSessionData);

          const newUser = parsedUserSessionData;
          newUser.config = config
          window.localStorage.setItem('userSessionData', JSON.stringify(newUser))
          updatedConfig()

        }
      } catch (error) {
        console.error('Error actualizando userSessionData en localStorage:', error);
      }
    }
  }, [config?.currentUrl]); // Escuchar cambios en `config`

};

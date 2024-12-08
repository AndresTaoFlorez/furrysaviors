import { useEffect } from "react";

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


  useEffect(() => {
    console.log("config", config);
    if (config && Object.keys(config).length > 0) { // Verificar que config no esté vacío
      try {
        const userSessionData = window.localStorage.getItem('userSessionData');
        if (userSessionData) {
          const parsedUserSessionData = JSON.parse(userSessionData);
          
          const newUser = parsedUserSessionData;
          newUser.config = config
          // console.log(newUser);
          
        }
      } catch (error) {
        console.error('Error actualizando userSessionData en localStorage:', error);
      }
    }
  }, [config]); // Escuchar cambios en `config`
};

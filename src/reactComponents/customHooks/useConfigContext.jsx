import { useCallback, useEffect, useRef } from "react";
import axios from "axios";

/**
 * Custom hook para gestionar la configuración y la obtención de usuarios
 * @param {*} config state value 
 * @param {*} setConfig update state function
 * @param {*} userSession sesión del usuario
 * @param {*} isLoading indicador de carga
 */
export const useConfigContext = (config, setConfig, userSession, isLoading) => {
  const isInitialLoad = useRef(true); // Controla si se está haciendo la carga inicial de la configuración
  
  // Función para obtener usuarios, asegurando que no se haga la petición innecesariamente
  const getUsers = useCallback(async () => {
    // Aseguramos que no se haga la petición si no hay token o está cargando
    if (!userSession.token || isLoading) return;

    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: {
          Authorization: userSession.token
        }
      });

    } catch (error) {
      console.log(error);
    }
  }, [userSession.token, isLoading]); // Depende de userSession.token e isLoading

  useEffect(() => {
    // Evita la ejecución de la lógica si la carga inicial aún no se ha completado
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // No guardar si `config` está vacío o no contiene las propiedades mínimas necesarias
    if (!config || Object.keys(config).length === 0) return;

    localStorage.setItem('furrysaviours-config', JSON.stringify(config));

    // Realizar la petición a la API cuando se actualiza el `config`
    getUsers();

  }, [config, getUsers]); // Se ejecuta cuando `config` cambie

  useEffect(() => {
    // Intenta obtener la configuración del localStorage solo una vez
    const storedConfig = localStorage.getItem('furrysaviours-config');
    
    if (!storedConfig) return;
    
    try {
      const parsedConfig = JSON.parse(storedConfig);
      
      if (!parsedConfig || Object.keys(parsedConfig).length === 0) return;
      
      setConfig(parsedConfig);
  
      // Si la URL ha cambiado, actualiza el historial
      if (window.location.pathname !== parsedConfig.currentUrl) {
        window.history.pushState(null, null, parsedConfig.currentUrl);
      }
    } catch (error) {
      console.error('Error al parsear la configuración almacenada:', error);
    }
  }, []); // Solo se ejecuta una vez al cargar la aplicación

};

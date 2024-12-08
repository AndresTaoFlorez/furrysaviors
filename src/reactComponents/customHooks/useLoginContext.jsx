import { useState, useEffect } from 'react'
import { login, checkSessionService } from "../../services.js/login";


export const useLoginContext = (userSession, setUserSession, isLoading, setIsLoading) => {
  useEffect(() => {
    const verifySession = async () => {
      try {
        setIsLoading(true); // Inicia la carga
        const sessionData = await checkSessionService();
        setUserSession(sessionData || { user: null, token: null });
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
      } finally {
        setIsLoading(false); // Termina la carga, sea exitoso o no
      }
    };

    verifySession();

  }, []);



  useEffect(() => {
    if (userSession.user?.username && userSession.user?.password) {
      const loginSession = async () => {
        try {
          const { user, token } = await login(userSession.user.username, userSession.user.password);
          setUserSession(user && token ? { user, token } : { user: null, token: null }
          )
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
      };

      loginSession();
    }
  }, [userSession.user?.username]);

}
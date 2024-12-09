import { useState, useEffect } from 'react'
import { login, checkSessionService } from "../../services.js/login"


export const useLoginContext = (userSession, setUserSession, isLoading, setIsLoading) => {


  // 1. Actulizar lo más pronto posible el estado del userSession, solo si los datos están guardados en el localstorage
  useEffect(() => {
    setIsLoading(true)

    const verifySession = async () => {
      try {
        const sessionData = await checkSessionService()
        setUserSession(sessionData || { user: null, token: null })
      } catch (error) {
        console.error('Error al verificar la sesión:', error)
      } finally {
        setIsLoading(false) // Ensure loading state is updated in finally block
      }
    }

    verifySession()
  }, [userSession.token])


  // ... existing code ...

  useEffect(() => {
    setIsLoading(true)
    if (!userSession.user?.username || !userSession.user?.password) {
      setIsLoading(false) // Ensure loading state is updated if no credentials
      return
    }

    const loginSession = async () => {
      try {
        const { user, token } = await login(userSession.user.username, userSession.user.password)
        setUserSession({ user, token } || { user: null, token: null })
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
      } finally {
        setIsLoading(false) // Ensure loading state is updated in finally block
      }
    }

    loginSession()
  }, [userSession.user])

  // ... existing code ...
}
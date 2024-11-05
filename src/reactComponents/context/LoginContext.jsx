import { createContext, useState, useEffect } from "react"
import { login, checkSessionService as checkSessionService } from "../../services.js/login"

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    user: null,
    token: null
  })

  /**
   * Este efecto se ejecuta cuando hay credenciales de usuario
   */
  useEffect(() => {
    if (userSession.user?.username && userSession.user?.password) {
      const loginSession = async () => {
        const { user, token } = await login(userSession.user.username, userSession.user.password)
        if (!user && !token) {
          setUserSession({ user: null, token: null })
        } else {
          setUserSession({ user, token })
        }
      }
      loginSession()
    } else {
      /**
       * Si no hay credenciales, verificamos si hay una sesión existente
       */
      const verifySession = async () => {
        const sessionData = await checkSessionService()
        if (JSON.stringify(sessionData) !== JSON.stringify(userSession)) {
          setUserSession(sessionData || { user: null, token: null })
        }
      }
      verifySession()
    }
  }, [userSession?.user])

  return (
    <LoginContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </LoginContext.Provider>
  )
}




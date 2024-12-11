import { useEffect } from 'react'
import { getToken } from "../../services.js/login"
import { getUser } from '../../services.js/user'
import { isNil, isEmpty } from "lodash";

/**
 * 
 * @param {*} setUserSession 
 * @param {*} setIsLoading 
 */
export const useLoginContext = ({ setUserSession = () => { }, setIsLoading = () => { } }) => {

  // Actualizar lo más pronto posible el estado del userSession y config, solo si los datos están guardados en el localstorage
  useEffect(() => {
    setIsLoading(true)
    const verifyLocalStorageToken = async () => {
      try {
        // 1. verificar si existe un token en el localstorage
        const token = getToken()

        if (isEmpty(token)) {
          // 3. si no es correcto, eliminar el token del localstorage y el userSession
          window.localStorage.removeItem('userSessionData')
          return
        }
        // 2. si existe un token, hacer la petición al server para validar que sea correcto
        const response = await getUser(token)

        if (isEmpty(response) || isNil(response)) {
          window.localStorage.removeItem('loggedUserToken')
          window.localStorage.removeItem('userSessionData')

          console.log('token user was deleted');
          setUserSession({ user: null, token: null })
          return
        }

        const user = response.data
        setUserSession({ user, token })


      } catch (error) {
        console.log(error);
        window.localStorage.removeItem('userSessionData')
        window.localStorage.removeItem('loggedUserToken')
        console.log('error - data user was deleted');

        return
      } finally {
        setIsLoading(false)
      }
    }

    verifyLocalStorageToken()
  }, [])

}
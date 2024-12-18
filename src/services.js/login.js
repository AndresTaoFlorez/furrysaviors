import axios from 'axios'
import { isEmpty } from 'lodash'
import { isBad } from './dataVerify'

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @param {*} retries 
 * @param {*} delay 
 * @returns 
 */
const login = async (email, password, retries = 5, delay = 300) => {
  let attempt = 0;

  const tryLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', { email, password });

      // Verifica si la respuesta contiene los datos esperados
      if (data.token && data.user) {
        window.localStorage.setItem('loggedUserToken', JSON.stringify(data.token));
        window.localStorage.setItem('userSessionData', JSON.stringify(data.user));
        return { user: data.user, token: data.token };
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw { 
          message: 'Maximum retries reached. Unable to login.', 
          res: error, 
          status: error.response?.status || 500, 
          email: null, 
          password: null 
        };
      }

      console.log(`Retrying login... Attempt ${attempt} of ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return tryLogin();
    }
  };

  return tryLogin();
};

const checkSessionService = () => {
  const token = JSON.parse(window.localStorage.getItem('loggedUserToken'))
  const user = JSON.parse(window.localStorage.getItem('userSessionData'))
  if (token && user) {
    return { token, user }
  }
  return null
}

const setUrlFromServer = ({ url }) => {
  window.localStorage.setItem('currentUrl', JSON.stringify(url))
}
const getCurrentUrl = () => {
  try {
    const url = JSON.parse(window.localStorage.getItem('currentUrl'))
    if (isBad(url)) {
      return null
    }
    return url
  } catch (error) {
    // Manejo de errores, puedes agregar un log o una acción específica aquí
    return null
  }
}
const deleteCurrentUrl = () => {
  window.localStorage.removeItem('currentUrl')
}

const getToken = () => {
  const token = JSON.parse(window.localStorage.getItem('loggedUserToken'))
  if (isEmpty(token)) {
    return null
  }
  return token
}

const setToken = (newToken) => {
  const token = `Bearer ${newToken}`
  window.localStorage.setItem('loggedUserToken', JSON.stringify(token))
}

const setUser = (newUser) => {
  window.localStorage.setItem('userSessionData', JSON.stringify(newUser))
}

const deleteUserAndToken = () => {
  window.localStorage.removeItem('loggedUserToken')
  window.localStorage.removeItem('userSessionData')
}

export {
  login,
  setToken,
  checkSessionService,
  setUser,
  getToken,
  deleteUserAndToken,
  setUrlFromServer,
  getCurrentUrl,
  deleteCurrentUrl
}
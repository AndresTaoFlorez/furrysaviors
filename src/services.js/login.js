import axios from 'axios'
import { isEmpty } from 'lodash'
import { isBad } from './dataVerify'

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
const login = async (email, password) => {
  try {
    const { data } = await axios.post('http://localhost:3001/api/auth/login', { email, password })
    if (data.token && data.user) {
      window.localStorage.setItem('loggedUserToken', JSON.stringify(data.token))
      window.localStorage.setItem('userSessionData', JSON.stringify(data.user))
      return { user: data.user, token: data.token }
    }
  } catch (error) {
    throw { message: 'Wrong password', res: error, status: 401, email: null, password: null }
  }
}

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
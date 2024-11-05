import axios from 'axios'

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

const checkSessionService = async () => {
  const token = await JSON.parse(window.localStorage.getItem('loggedUserToken'))
  const user = await JSON.parse(window.localStorage.getItem('userSessionData'))
  if (token && user) {
    return { token, user }
  }
  return null
}

const setToken = (newToken) => {
  const token = `Bearer ${newToken}`
  window.localStorage.setItem('loggedUserToken', JSON.stringify(token))
}

const setUser = (newUser) => {
  window.localStorage.setItem('userSessionData', JSON.stringify(newUser))
}

export { login, setToken, checkSessionService, setUser }
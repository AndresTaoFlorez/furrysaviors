import axios from 'axios'

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
const login = async (email, password) => {
  const {data} = await axios.post('http://localhost:3001/api/auth/login', { email, password })
  return data
}

export default login


import { Modal } from "../Modal"
import { useState, useContext } from "react"
import { login } from '../../../services.js/login'
import '../../../style/reactComponentsStyle/Login.scss'
import { GlobalContext } from "../../context/GlobalContext"
import { isBad } from "../../../services.js/dataVerify"

const LoginForm = ({ setToggleLogin, toggleLogin }) => {

  /**
   * @type {Object} formData - Estado del formulario de login {username, password}.
  */
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  /**
   * @type {Object} userSession - Estado del usuario logueado {user, token}.
   */
  const { userSession, setUserSession, setIsLoading } = useContext(GlobalContext)

  /**
     * @param {Event} e - Evento de input change.
     */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * @param {Event} e - Evento de submit.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    if (!isBad(userSession?.token)) {  // el Token existe
      setFormData({ username: '', password: '' })
      handleHover({ handleStatus: toggleLogin.animation, setAnimation: setToggleLogin, setClicStatus: setToggleLogin })
      return
    }
    setToggleLogin((prev) => ({ ...prev, animation: false }))
    setTimeout(() => {
      setToggleLogin((prev) => ({ ...prev, clickStatus: false }))
    }, 200)
    const loginFunction = async (email, password) => {
      const { user, token } = await login(email, password)
      setUserSession({ user, token })
    }
    loginFunction(formData.username, formData.password)
  }

  return (
    <Modal setToggleLogin={setToggleLogin} toggleLogin={toggleLogin}>
      <div className={`littleLogin ${!toggleLogin.animation ? 'littleLogin_animation_out' : ''}`}>
        <form className="login-container" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Introduce tu usuario"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Introduce tu contraseña"
              required
            />
          </div>

          <button type="submit" className="button-form">
            Iniciar sesión
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default LoginForm

import { Modal } from "../Modal"
import { useState, useContext } from "react"
import '../../../style/reactComponentsStyle/Login.scss'
import { LoginContext } from "../../../reactComponents/context/LoginContext"

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
  const { userSession, setUserSession } = useContext(LoginContext)

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

    if (userSession.token) {  // el Token existe
      setFormData({ username: '', password: '' })
      handleHover({ handleStatus: toggleLogin.animation, setAnimation: setToggleLogin, setClicStatus: setToggleLogin })
      console.log('El token existe')
      return
    }
    setToggleLogin((prev) => ({ ...prev, animation: false }))
    setTimeout(() => {
      setToggleLogin((prev) => ({ ...prev, clickStatus: false }))
    }, 200)
    setUserSession({ user: formData, token: null })
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

import ModalTest, { ModalContext } from "../Modal"
import '../../../style/reactComponentsStyle/Login.scss'

const LoginForm = ({ clicStatus, animation, setAnimation, setClicStatus, handleSubmit, formData, handleInputChange, handleHover }) => {
  return (
    <ModalContext
      modalState={clicStatus}
      setModalState={handleHover({ setAnimation, setClicStatus })}
      duration={200}
    >
      <div className={`littleLogin ${!animation ? 'littleLogin_animation_out' : ''}`}>
        <form className="login-container" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="form-group">
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

          <div className="form-group">
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

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </ModalContext>
  )
}

export default LoginForm

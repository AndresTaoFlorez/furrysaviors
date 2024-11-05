import '../../../style/reactComponentsStyle/Login.scss'
import { useState } from "react"
import LoginButton from './LoginButton'
import LoginForm from './LoginForm'

export function Login() {

  /**
   * @type {Object} toggleLogin - Estado del modal de login {clickStatus, animation}.
   */
  const [toggleLogin, setToggleLogin] = useState({
    clickStatus: false,
    animation: false
  })

  return (
    <div className={`Login ${toggleLogin.clickStatus ? 'blokedOut' : ''}`}>
      {toggleLogin.clickStatus ? (
        <LoginForm
          setToggleLogin={setToggleLogin}
          toggleLogin={toggleLogin}
        />
      ) : (
        <LoginButton
          setToggleLogin={setToggleLogin}
          toggleLogin={toggleLogin}
        />
      )}
    </div>
  )
}
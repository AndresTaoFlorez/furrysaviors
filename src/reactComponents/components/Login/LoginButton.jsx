import '../../../style/reactComponentsStyle/Login.scss'
import { useRef, useContext } from "react"
import { isBad } from '../../../services.js/dataVerify'
import { deleteUserAndToken } from '../../../services.js/login'
import useMaxInitialWidth from '../../../reactComponents/customHooks/useMaxInitialWidth'
import { GlobalContext } from '../../context/GlobalContext'
import { useConfigContext } from '../../customHooks/useConfigContext'

/**
 * @param {function} setClicStatus - Función para manejar el estado de clic.
 * @param {function} setAnimation - Función para manejar el estado de animación.
 * @param {function} handleHover - Función para manejar el estado de hover.
 */
const LoginButton = ({ setToggleLogin, children }) => {
  const loginButtonRef = useRef(null);

  // import context form navbar context
  const { userSession, setUserSession, setConfig } = useContext(GlobalContext)
  const { deleteConfig } = useConfigContext({ setConfig });


  const handleClick = () => {
    setToggleLogin({ clickStatus: true, animation: true })
  }

  const handleLogout = () => {
    deleteUserAndToken()
    setToggleLogin({ clickStatus: false, animation: false })
    setUserSession({ user: null, token: null })
    deleteConfig()

  }
  return (
    <>
      {!isBad(userSession?.token) ? (
        // session logged
        <div className="logged">
          <p>Welcome</p>
          <p className='username'>{userSession.user?.name}</p>
          <button className="button-logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        // session no logged until
        <div ref={loginButtonRef} className='loginImage' onClick={handleClick}>
          {children}
          <img src="https://img.icons8.com/?size=100&id=7rcs0z3sdioE&format=png&color=000000" alt="user icon" />
        </div>
      )}
    </>
  )
};

export default LoginButton;
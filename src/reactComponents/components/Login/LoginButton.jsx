import '../../../style/reactComponentsStyle/Login.scss'
import { useState, useEffect, useRef, useContext } from "react"
import useMaxInitialWidth from '../../../reactComponents/customHooks/useMaxInitialWidth'
import { NavbarContext } from '../../../reactComponents/context/NavbarContext'
import { GlobalContext } from '../../context/GlobalContext'

/**
 * @param {function} setClicStatus - Función para manejar el estado de clic.
 * @param {function} setAnimation - Función para manejar el estado de animación.
 * @param {function} handleHover - Función para manejar el estado de hover.
 */
const LoginButton = ({ setToggleLogin, toggleLogin, children }) => {
  const loginButtonRef = useRef(null);
  const [initialWidth, setInitialWidth] = useState({})// Initial width of some refered elements

  // import context form navbar context
  const { setGeneralWidth } = useContext(NavbarContext)
  const { userSession, setUserSession } = useContext(GlobalContext)

  useEffect(() => {
    setGeneralWidth(prev => ({
      ...prev,
      loginButtonRef_initialWidth: Number(initialWidth.loginButtonRef_initialWidth) || 0
    }))
  }, [initialWidth])

  const useCalculateInitialWidth = (key, setElementSomething, elementRef) => {
    useMaxInitialWidth(elementRef, (width) => setElementSomething(prev => ({
      ...prev,
      [key]: width || 0 // Actualiza correctamente preservando los valores anteriores
    })))
  }

  useCalculateInitialWidth('loginButtonRef_initialWidth', setInitialWidth, loginButtonRef)

  const handleClick = () => {
    setToggleLogin({ clickStatus: true, animation: true })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserToken')
    window.localStorage.removeItem('userSessionData')
    setToggleLogin({ clickStatus: false, animation: false })
    setUserSession({ user: null, token: null })

  }
  return (
    <>
      {userSession.token ? (
        <div className="logged">
          <p>Welcome</p>
          <p className='username'>{userSession.user?.name}</p>
          <button className="button-logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div ref={loginButtonRef} className='loginImage' onClick={handleClick}>
          {children}
          <img src="https://img.icons8.com/?size=100&id=7rcs0z3sdioE&format=png&color=000000" alt="user icon" />
        </div>
      )}
    </>
  )
};

export default LoginButton;
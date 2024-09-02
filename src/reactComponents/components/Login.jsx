import '../../style/reactComponentsStyle/Login.scss'
import { useState, useRef, useEffect } from "react"
// import useWidth from '../customHooks/useWidth'

export function Login() {
  const [isHovered, setIsHovered] = useState({
    LoginHover: false,
    littleLoginHover: false,
    focused: false
  })

  const loginSectionRef = useRef(null)

  const [clicStatus, setClicStatus] = useState(false)

  useEffect(() => {
    console.log(isHovered);
    
    },[isHovered])

  const onMouseHoverOut = async (a) => {
    setTimeout(() => {
      setIsHovered(a)
    }, 20)
  }

  const onMouseDelay = (callback, delay) => {
    setTimeout(callback, delay);
  };

  return (<>
    <div className={`${isHovered.LoginHover ? 'growingFloatingButton' : ''} Login`}
      onClick={() => {
        !isHovered.littleLoginHover && setClicStatus(!clicStatus)
      }}
    >
      {!clicStatus ? (
        <div className='loginImage'
          onMouseOver={() => setIsHovered({ ...isHovered, LoginHover: true })}
          onMouseOut={() => onMouseHoverOut({ ...isHovered, LoginHover: false })}
        >
          <img src="../../../public/resources/user-svgrepo-com.svg" alt="hipsum logo" />
        </div>
      ) : (
        <div >
          <div className={`${(
            !isHovered.focused?clicStatus:onMouseDelay(clicStatus, 1000)) ? 'littleLogin_animation' : 'littleLogin_animation_out'} littleLogin`}
            ref={loginSectionRef}
            style={{ '--littleLoginHeight': `230px` }}
          >
            <div className="login-container" >
              <h1>Login</h1>
              <label to="username">Usuario:</label>
              <input type="text" id="username" name="username" placeholder="Introduce tu usuario"
                onMouseOver={() => setIsHovered({ ...isHovered, littleLoginHover: true })}
                onMouseOut={() => onMouseHoverOut({ ...isHovered, littleLoginHover: false })}
                onClick={() => setIsHovered({ ...isHovered, focused: true })}
              />
              <label to="password">Contraseña:</label>
              <input type="password" id="password" name="password" placeholder="Introduce tu contraseña"
                onMouseOver={() => setIsHovered({ ...isHovered, littleLoginHover: true })}
                onMouseOut={() => onMouseHoverOut({ ...isHovered, littleLoginHover: false })}
                onClick={() => setIsHovered({ ...isHovered, focused: true })}
              />
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>)
}
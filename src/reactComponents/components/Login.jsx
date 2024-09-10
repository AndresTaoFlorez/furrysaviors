import '../../style/reactComponentsStyle/Login.scss'
import { useState, useEffect, useRef } from "react"
import useInitialHeight from '../customHooks/useInitialHeight'
import useInitialWidth from '../customHooks/useInitialWidth'
import { ModalTest } from '../components/Modal'

export function Login() {
  const [isHovered, setIsHovered] = useState({
    LoginHover: false,
    littleLoginHover: false,
    focused: false
  })

  const [initialSize, setInitialSize] = useState({
    loginButtonRef_height: 0,
    loginButtonRef_width: 0
  })

  const loginButtonRef = useRef(null)

  // Uso del CustomHook para calcultar el valor estable inicial de la referencia loginButtonRef
  useInitialHeight(loginButtonRef, (height) => { setInitialSize(e => ({ ...e, loginButtonRef_height: height })) })
  useInitialWidth(loginButtonRef, (width) => { setInitialSize(e => ({ ...e, loginButtonRef_width: width })) })

  const [clicStatus, setClicStatus] = useState(false)
  const [animation, setAnimation] = useState(null)

  const onMouseDelay = async (callback, delay = 1000) => {
    // console.log('onMouseDelay');
    setTimeout(callback, delay);
  };
  const handleHover = (e) => {
    
    if (clicStatus) {
      setAnimation(e)
      console.log(e);
      onMouseDelay(() => {
        setClicStatus(!clicStatus)
        setAnimation(!e)
      }, 200)
    }
  };

 

  const handleHover0 = (state = Boolean) => {
    setIsHovered((prev) => ({ ...prev, LoginHover: state }))
  }

  return (<>
    <div className="Login"

      onMouseOver={() => handleHover0(true)}
      onMouseOut={() => handleHover0(false)}
      style={{ '--loginButtonRef_height': initialSize.loginButtonRef_height + 'px', '--loginButtonRef_width': initialSize.loginButtonRef_width + 'px' }}
    >
      {!clicStatus ? (
        <div className='loginImage' ref={loginButtonRef}
          onMouseOver={() => setIsHovered({ ...isHovered, LoginHover: true })}
          onMouseOut={() => setIsHovered({ ...isHovered, LoginHover: false })}
          onClick={() => {
            setClicStatus(!clicStatus)
            setAnimation(true)
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/3293/3293466.png " alt="hipsum logo" />
        </div>
      ) : (
        <ModalTest modalState={clicStatus} setModalState={(e) => handleHover(e)} duration="200">
          <div className='block' style={{ '--loginButtonRef_width': initialSize.loginButtonRef_width + 'px' }}></div>
          {/* LITTLE LOGIN */}
          <div className={`littleLogin ${animation ? '' : 'littleLogin_animation_out'}`}>
            <div className="login-container" >
              <h1>Login</h1>
              <label to="username">Usuario:</label>
              <input type="text" id="username" name="username" placeholder="Introduce tu usuario" />
              <label to="password">Contraseña:</label>
              <input type="password" id="password" name="password" placeholder="Introduce tu contraseña" />
              <button>Send</button>
            </div>
          </div>
        </ModalTest>
      )}
    </div >
  </>)
}
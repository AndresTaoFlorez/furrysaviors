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

  const handleHover = (hoverState) => {
    setIsHovered(prevState => ({
      ...prevState,
      littleLoginHover: hoverState,
      focused: hoverState
    }));

    // setModalState(e => ({ ...e, preModalState: true }))

  };

  const onMouseDelay = async (callback, delay = 1000) => {
    console.log('onMouseDelay');
    setTimeout(callback, delay);
  };

  return (<>
    <div className={`${isHovered.LoginHover ? (!clicStatus && 'growingLogin') : ''} Login`}
      ref={loginButtonRef}
      onMouseOver={() => setIsHovered((prev) => ({ ...prev, LoginHover: true }))}
      onMouseOut={() => setIsHovered((prev) => ({ ...prev, LoginHover: false }))}
      style={{ '--loginAnimationDuration': '200ms', '--loginButtonRef_height': initialSize.loginButtonRef_height + 'px', '--loginButtonRef_width': initialSize.loginButtonRef_width + 'px' }}
    >
      {!clicStatus ? (
        <div className='loginImage'
          onMouseOver={() => setIsHovered({ ...isHovered, LoginHover: true })}
          onMouseOut={() => setIsHovered({ ...isHovered, LoginHover: false })}
          onClick={() => {
            setClicStatus(!clicStatus)
            setIsHovered({ ...isHovered, focused: false })
            setAnimation(true)
          }}>
          <img src="../../../public/resources/user-svgrepo-com.svg" alt="hipsum logo" />
        </div>
      ) : (
        <>

          <ModalTest modalState={animation} setModalState={(e) => {
            console.log(e);
            setAnimation(e)
            if (!isHovered.focused) {
              setAnimation(false)
              onMouseDelay(() => {
                setClicStatus(!clicStatus)
                setAnimation(!animation)
              }, 100)
            }
          }}>
            <div className='block'
              style={{ '--loginButtonRef_width': initialSize.loginButtonRef_width + 'px' }}>
            </div>
            <div style={{ '--littleLoginHeight': '230px', '--loginButtonRef_height': initialSize.loginButtonRef_height + 'px', '--loginButtonRef_width': initialSize.loginButtonRef_width + 'px' }}
              className={`littleLogin ${animation ? 'littleLogin_animation' : 'littleLogin_animation_out'}`}
            >
              <div className="login-container" >
                <h1>Login</h1>
                <label to="username">Usuario:</label>
                <input type="text" id="username" name="username" placeholder="Introduce tu usuario"
                  onMouseOver={() => handleHover(true)}
                  onMouseOut={() => handleHover(false)}
                  onTouchStart={() => handleHover(true)}
                  onTouchEnd={() => handleHover(true)}
                />
                <label to="password">Contraseña:</label>
                <input type="password" id="password" name="password" placeholder="Introduce tu contraseña"
                  onMouseOver={() => handleHover(true)}
                  onMouseOut={() => handleHover(false)}
                  onTouchStart={() => handleHover(true)}
                  onTouchEnd={() => handleHover(true)}
                />
                <button
                  onMouseOver={() => handleHover(true)}
                  onMouseOut={() => handleHover(false)}
                  onTouchStart={() => handleHover(true)}
                  onTouchEnd={() => handleHover(true)}
                >Send</button>
              </div>
            </div>
          </ModalTest>
        </>
      )}
    </div >
  </>)
}
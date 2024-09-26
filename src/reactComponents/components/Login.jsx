import '../../style/reactComponentsStyle/Login.scss'
import { useState } from "react"
import { ModalTest } from '../components/Modal'

export function Login() {

  // Uso del CustomHook para calcultar el valor estable inicial de la referencia loginButtonRef
  const [clicStatus, setClicStatus] = useState(false)
  const [animation, setAnimation] = useState(null)

  const onMouseDelay = async (callback, delay = 800) => {
    // console.log('onMouseDelay');
    setTimeout(callback, delay);
  };
  const handleHover = (e) => {
    if (clicStatus) {
      setAnimation(e)
      // console.log(e);
      onMouseDelay(() => {
        setClicStatus(!clicStatus)
        setAnimation(!e)
      }, 200)
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e)
    const user = e.target[0].value
    const password = e.target[1].value

    console.log({user, password})
  }

  return (<>
    <div className={`Login ${clicStatus && 'blokedOut'}`}
    >
      {!clicStatus ? (
        <div className='loginImage'
          onClick={() => {
            setClicStatus(!clicStatus)
            setAnimation(true)
          }}
        >
          <img src="https://img.icons8.com/?size=100&id=7rcs0z3sdioE&format=png&color=000000" alt="user icon" />
        </div>
      ) : (
        <ModalTest modalState={clicStatus} setModalState={(e) => handleHover(e)} duration={200}>
          <div className={`${clicStatus ? 'blokedOut' : 'block'}`}></div>
          {/* LITTLE LOGIN */}
          <div className={`littleLogin ${animation ? '' : 'littleLogin_animation_out'}`}>
            <form className="login-container" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <label to="username">Usuario:</label>
              <input type="text" id="username" name="username" placeholder="Introduce tu usuario" />
              <label to="password">Contraseña:</label>
              <input type="password" id="password" name="password" placeholder="Introduce tu contraseña" />
              <button>Send</button>
            </form>
          </div>
        </ModalTest>
      )}
    </div >
  </>)
}
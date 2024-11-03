import '../../../style/reactComponentsStyle/Login.scss'

/**
 * @param {function} setClicStatus - Función para manejar el estado de clic.
 * @param {function} setAnimation - Función para manejar el estado de animación.
 * @param {function} handleHover - Función para manejar el estado de hover.
 */
const LoginButton = ({ setClicStatus, setAnimation, handleHover }) => (
  <div className='loginImage'
    onClick={() => {
      const handleHover_options = {
        handleStatus: false,
        setAnimation,
        setClicStatus
      }
      handleHover(handleHover_options)
    }}
  >
    <img src="https://img.icons8.com/?size=100&id=7rcs0z3sdioE&format=png&color=000000" alt="user icon" />
  </div>
);

export default LoginButton;
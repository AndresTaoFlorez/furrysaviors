import '../../../style/reactComponentsStyle/Login.scss'
import { useState } from "react"
import login from '../../../services.js/login'
import LoginButton from './LoginButton'
import LoginForm from './LoginForm'
import handleHover from '../../../utils/handleHover'


export function Login() {
  const [clicStatus, setClicStatus] = useState(false)
  const [animation, setAnimation] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [user, setUser] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(formData.username, formData.password)
      const handleHover_options = {
        handleStatus: false,
        setAnimation,
        setClicStatus,
        aditionalFunction: () => {
          setUser(data)
          setFormData({ username: '', password: '' })
        }
      }
      handleHover(handleHover_options)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`Login ${(clicStatus || user) ? 'blokedOut' : ''}`}>
      {!user && (
        clicStatus ? (
          <LoginForm
            clicStatus={clicStatus}
            animation={animation}
            setAnimation={setAnimation}
            setClicStatus={setClicStatus}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            handleHover={handleHover}
          />
          // <h2>Login</h2>
        ) : (
          <LoginButton
            setClicStatus={setClicStatus}
            setAnimation={setAnimation}
            handleHover={handleHover}
          />
        )
      )}
    </div>
  )
}
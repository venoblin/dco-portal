import './Login.css'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import { login } from '../../services/login'
import Logo from '../Logo'
import Panel from '../ui/Panel'
import Loading from '../Loading'

const Login = () => {
  const appContext = useContext(AppContext)
  const [username, onUsernameChange, resetUsername] = useFormState('')
  const [password, onPasswordChange, resetPassword] = useFormState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        login({ username: username, password: password })
      )

      console.log(res)
    } catch (error) {
      appContext.showPopup(error.message)
    }

    resetUsername()
    resetPassword()
  }

  return (
    <div className="Login">
      <Panel>
        <Logo msg={'Login'} />

        {!appContext.isLoading ? (
          <form onSubmit={(event) => handleLogin(event)}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
              onChange={(event) => onUsernameChange(event)}
              value={username}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={(event) => onPasswordChange(event)}
              value={password}
            />

            <button>Login</button>
          </form>
        ) : (
          <Loading />
        )}
      </Panel>
    </div>
  )
}

export default Login

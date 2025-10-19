import './Login.css'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import { login } from '../../services/login'
import Logo from '../Logo'
import Panel from '../ui/Panel'
import LoadingIcon from '../LoadingIcon'
import { storageGet, storageRemove, storageSet } from '../../utils/localStorage'

const Login = () => {
  const appContext = useContext(AppContext)
  const [username, onUsernameChange, resetUsername] = useFormState('')
  const [password, onPasswordChange, resetPassword] = useFormState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    if (storageGet('credentials')) {
      storageRemove('credentials')
    }

    try {
      const res = await appContext.load(() =>
        login({ username: username, password: password })
      )

      if (res && res.data.accessToken) {
        const credentials = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiresAt: res.data.expiresAt
        }
        storageSet('credentials', credentials)

        appContext.setAuth({
          isAuthenticated: true,
          credentials: credentials
        })
      } else {
        appContext.showPopup(
          res && res.message
            ? res.message
            : 'Username or password are incorrect'
        )
      }
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
              className="light"
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
              className="light"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={(event) => onPasswordChange(event)}
              value={password}
            />

            <button>Login</button>
          </form>
        ) : (
          <LoadingIcon />
        )}
      </Panel>
    </div>
  )
}

export default Login

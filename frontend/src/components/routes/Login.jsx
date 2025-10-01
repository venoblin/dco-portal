import './Login.css'
import useFormState from '../../hooks/useFormState'
import Logo from '../Logo'
import Panel from '../ui/Panel'

const Login = () => {
  const [username, onUsernameChange, resetUsername] = useFormState('')
  const [password, onPasswordChange, resetPassword] = useFormState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    const AUTH_API = process.env.REACT_APP_AUTH_API
    console.log(AUTH_API)
  }

  return (
    <div className="Login">
      <Panel>
        <Logo msg={'Login'} />

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
      </Panel>
    </div>
  )
}

export default Login

import Logo from '../Logo'
import Panel from '../ui/Panel'
import './Login.css'

const Login = () => {
  return (
    <div className="Login">
      <Panel>
        <Logo msg={'Login'} />

        <form>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            required
          />

          <button>Login</button>
        </form>
      </Panel>
    </div>
  )
}

export default Login

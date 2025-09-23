import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/guides">Guides</Link>
    </nav>
  )
}

export default NavBar

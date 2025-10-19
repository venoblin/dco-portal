import './NavBar.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getBasePathname } from '../utils'
import Logo from './Logo'

const NavBar = () => {
  const location = useLocation()
  const [basePath, setBasePath] = useState('')

  useEffect(() => {
    setBasePath(getBasePathname(location.pathname))
  }, [location.pathname])

  return (
    <nav className="NavBar">
      <div>
        <Logo />

        <div className="links-wrap">
          <Link
            to="/"
            className={`nav-link${basePath === '/' ? ' active' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="#989898"
                  d="M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11H4v8a2 2 0 0 0 2 2h4v-6a2 2 0 1 1 4 0v6h4a2 2 0 0 0 2-2v-8h.997c.952 0 1.368-1.205.615-1.791z"
                />
              </g>
            </svg>
          </Link>

          <Link
            to="/guides"
            className={`nav-link${basePath === '/guides' ? ' active' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="#989898"
                  d="M4 5a3 3 0 0 1 3-3h11a2 2 0 0 1 2 2v12.99c0 .168-.038.322-.113.472l-.545 1.09a1 1 0 0 0 0 .895l.543 1.088A1 1 0 0 1 19 22H7a3 3 0 0 1-3-3zm3 13h10.408a3 3 0 0 0 0 2H7a1 1 0 1 1 0-2m3-11a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2z"
                />
              </g>
            </svg>
          </Link>

          <Link
            to="/tools"
            className={`nav-link${basePath === '/tools' ? ' active' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="#989898"
                  d="M7.527 2.657a7.001 7.001 0 0 1 8.26 9.347l4.599 3.893a3.3 3.3 0 1 1-4.651 4.65l-3.891-4.597a7.001 7.001 0 0 1-9.35-8.26a1.01 1.01 0 0 1 1.72-.432l3.045 3.307l2.297-.845l.847-2.3l-3.309-3.04a1.01 1.01 0 0 1 .433-1.723"
                />
              </g>
            </svg>
          </Link>
        </div>
      </div>

      <div className="links-wrap">
        <Link
          to="/profile"
          className={`nav-link${basePath === '/profile' ? ' active' : ''}`}
          aria-label="Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path
                fill="#989898"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
              />
            </g>
          </svg>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar

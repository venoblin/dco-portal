import { useNavigate } from 'react-router-dom'
import { storageRemove } from '../../utils/localStorage'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const Profile = () => {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    appContext.logout()
    navigate('/')
  }

  return (
    <header>
      <h1>Profile - Admin</h1>

      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Profile

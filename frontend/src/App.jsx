import 'quill/dist/quill.snow.css'
import './styles/App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import useToggle from './hooks/useToggle'
import NavBar from './components/NavBar'
import Dashboard from './components/routes/Dashboard'
import Guides from './components/routes/Guides'
import GuidesNew from './components/routes/GuidesNew'
import GuideSingle from './components/routes/GuideSingle'
import Tools from './components/routes/Tools'
import Profile from './components/routes/Profile'
import Popup from './components/Popup'

const App = () => {
  const [msg, setMsg] = useState('')
  const [isPopup, toggleIsPopup] = useToggle(false)

  const popupToggle = (msg) => {
    setMsg(msg)
    toggleIsPopup()
  }

  return (
    <div className="App">
      {isPopup === true && <Popup popupToggle={popupToggle} />}
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard popupToggle={popupToggle} />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/new" element={<GuidesNew />} />
          <Route path="/guides/:id" element={<GuideSingle />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer>
        <p className="muted-text">2025 DCO Portal</p>
      </footer>
    </div>
  )
}

export default App

import 'quill/dist/quill.snow.css'
import './styles/App.css'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import NavBar from './components/NavBar'
import Dashboard from './components/routes/Dashboard'
import Guides from './components/routes/Guides'
import GuidesNew from './components/routes/GuidesNew'
import GuideSingle from './components/routes/GuideSingle'
import Tools from './components/routes/Tools'
import Profile from './components/routes/Profile'
import TriageManager from './components/routes/TriageManager'
import DeviceLookup from './components/routes/DeviceLookup'
import IncidentManager from './components/routes/IncidentManager'
import NotFound from './components/routes/NotFound'
import Login from './components/routes/Login'
import TriageNew from './components/routes/TriageNew'

const App = () => {
  const appContext = useContext(AppContext)

  return (
    <div
      className={`App${
        appContext.auth.isAuthenticated === true ? '' : ' not-authenticated'
      }`}
    >
      {appContext.auth.isAuthenticated === true && <NavBar />}

      <main>
        {appContext.auth.isAuthenticated === true ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/new" element={<GuidesNew />} />
            <Route path="/guides/:id" element={<GuideSingle />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/triage-manager" element={<TriageManager />} />
            <Route path="/tools/triage-manager/new" element={<TriageNew />} />
            <Route path="/tools/device-lookup" element={<DeviceLookup />} />
            <Route
              path="/tools/incident-manager"
              element={<IncidentManager />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Login />} />
          </Routes>
        )}
      </main>

      <footer>
        <p className="muted-text">2025 DCO Portal</p>
      </footer>
    </div>
  )
}

export default App

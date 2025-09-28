import 'quill/dist/quill.snow.css'
import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './components/routes/Dashboard'
import Guides from './components/routes/Guides'
import GuidesNew from './components/routes/GuidesNew'
import GuideSingle from './components/routes/GuideSingle'
import Tools from './components/routes/Tools'
import Profile from './components/routes/Profile'
import IncidentManager from './components/routes/IncidentManager'

const App = () => {
  return (
    <div className="App">
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/new" element={<GuidesNew />} />
          <Route path="/guides/:id" element={<GuideSingle />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/incident-manager" element={<IncidentManager />} />
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

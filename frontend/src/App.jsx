import './styles/App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './routes/Dashboard'
import Guides from './routes/Guides'
import GuidesNew from './routes/GuidesNew'
import GuideSingle from './routes/GuideSingle'
import Tools from './routes/Tools'
import Profile from './routes/Profile'

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

import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './routes/dashboard'
import Guides from './routes/Guides'

const App = () => {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </div>
  )
}

export default App

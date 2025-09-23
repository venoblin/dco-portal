import { Route, Routes } from 'react-router-dom'
import Dashboard from './routes/dashboard'
import Guides from './routes/Guides'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </div>
  )
}

export default App

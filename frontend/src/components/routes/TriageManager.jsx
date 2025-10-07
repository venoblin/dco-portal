import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Panel from '../ui/Panel'
import { AppContext } from '../../contexts/AppContext'

const TriageManager = () => {
  const appContext = useContext(AppContext)
  const [triages, setTriages] = useState(null)

  const getTriages = async () => {
    try {
      const res = await appContext.load()
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  useEffect(() => {}, [])

  return (
    <div>
      <header>
        <h1>Triage Manager</h1>

        <Link to="/tools/triage-manager/new" className="btn">
          Create Triage
        </Link>
      </header>

      <Panel></Panel>
    </div>
  )
}

export default TriageManager

import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllTriages } from '../../services/triages'
import { AppContext } from '../../contexts/AppContext'
import Panel from '../ui/Panel'
import LoadingIcon from '../LoadingIcon'

const TriageManager = () => {
  const appContext = useContext(AppContext)
  const [triages, setTriages] = useState(null)

  const getTriages = async () => {
    try {
      const res = await appContext.load(() => getAllTriages())

      setTriages(res.triages)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  useEffect(() => {
    getTriages()
  }, [])

  return (
    <div>
      <header>
        <h1>Triage Manager</h1>

        <Link to="/tools/triage-manager/new" className="btn">
          Create Triage
        </Link>
      </header>

      <Panel>
        {!appContext.isLoading ? (
          <div>
            {triages && triages.length > 0 ? (
              triages.map((t) => <p key={t.id}>{t.name}</p>)
            ) : (
              <p>No triages found!</p>
            )}
          </div>
        ) : (
          <LoadingIcon />
        )}
      </Panel>
    </div>
  )
}

export default TriageManager

import './TriageEdit.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { getSingleTriage } from '../../services/triages'
import LoadingIcon from '../LoadingIcon'
import Panel from '../ui/Panel'

const TriageNew = () => {
  const appContext = useContext(AppContext)
  const [triage, setTriage] = useState(null)
  const { id } = useParams()

  const getTriage = async () => {
    try {
      const res = await appContext.load(() => getSingleTriage(id))

      if (res) {
        setTriage(res.triage)
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't find triage")
    }
  }

  useEffect(() => {
    getTriage()
  }, [])

  return (
    <div className="TriageEdit">
      <header>
        <div>
          <Link to="/tools/triage-manager">← Back</Link>

          {triage && <h1>{triage.name}</h1>}
        </div>

        {triage && (
          <div className="inputs">
            <button>New Path</button>
            <button>Download</button>
          </div>
        )}
      </header>

      <Panel>
        {!appContext.isLoading ? (
          <div>
            {triage && triage.paths && triage.paths.length ? (
              <div>Paths</div>
            ) : (
              <p>There are no paths!</p>
            )}
          </div>
        ) : (
          <LoadingIcon />
        )}
      </Panel>
    </div>
  )
}

export default TriageNew

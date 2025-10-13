import './TriageManager.css'
import { useContext, useEffect, useState } from 'react'
import { getAllTriages, postTriage } from '../../services/triages'
import { AppContext } from '../../contexts/AppContext'
import Panel from '../ui/Panel'
import LoadingIcon from '../LoadingIcon'
import useFormState from '../../hooks/useFormState'
import { Link, useNavigate } from 'react-router-dom'

const TriageManager = () => {
  const appContext = useContext(AppContext)
  const [triages, setTriages] = useState(null)
  const [name, onNameChange, setName, resetName] = useFormState('')
  const navigate = useNavigate()

  const getTriages = async () => {
    try {
      const res = await appContext.load(() => getAllTriages())

      setTriages(res.triages)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() => postTriage({ name: name }))

      if (res) {
        resetName()
        navigate(`/tools/triage-manager/${res.triage.id}`)
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't create triage")
    }
  }

  useEffect(() => {
    getTriages()
  }, [])

  return (
    <div className="TriageManager">
      <header>
        <h1>Triage Manager</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onNameChange}
            required
          />
          <button>Create Triage</button>
        </form>
      </header>

      <Panel>
        {!appContext.isLoading ? (
          <div>
            {triages && triages.length > 0 ? (
              triages.map((t) => (
                <Link
                  className="block-link"
                  to={`/tools/triage-manager/${t.id}`}
                  key={t.id}
                >
                  {t.name}
                </Link>
              ))
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

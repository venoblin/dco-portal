import './TriageEdit.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { getSingleTriage } from '../../services/triages'
import useFormState from '../../hooks/useFormState'
import LoadingIcon from '../LoadingIcon'
import DeviceTriageCard from '../DeviceTriageCard'
import { postDevice } from '../../services/devices'

const TriageNew = () => {
  const appContext = useContext(AppContext)
  const [hostname, onHostnameChange, setHostname, resetHostname] =
    useFormState('')
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

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        postDevice({
          triageId: id,
          hostname: hostname
        })
      )

      resetHostname()

      if (res) {
        getTriage()
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't create device")
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

        {triage && !appContext.isLoading && (
          <div className="inputs">
            <form className="input-button-combine" onSubmit={onSubmit}>
              <label htmlFor="hostname">Hostname</label>
              <input
                type="text"
                name="hostname"
                id="hostname"
                placeholder="Hostname"
                value={hostname}
                onChange={onHostnameChange}
                required
              />
              <button>Add Device</button>
            </form>

            <button>Download</button>
          </div>
        )}
      </header>

      <div>
        {!appContext.isLoading ? (
          <div>
            {triage && triage.devices && triage.devices.length ? (
              triage.devices.map((d) => (
                <DeviceTriageCard key={d.id} triage={triage} device={d} />
              ))
            ) : (
              <p>There are no devices!</p>
            )}
          </div>
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  )
}

export default TriageNew

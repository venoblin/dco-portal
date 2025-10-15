import './TriageEdit.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { getSingleTriage } from '../../services/triages'
import useFormState from '../../hooks/useFormState'
import LoadingIcon from '../LoadingIcon'
import DeviceTriageCard from '../DeviceTriageCard'
import { postDevice } from '../../services/devices'
import useToggle from '../../hooks/useToggle'

const TriageNew = () => {
  const appContext = useContext(AppContext)
  const [hostname, onHostnameChange, setHostname, resetHostname] =
    useFormState('')
  const [triage, setTriage] = useState(null)
  const [name, onNameChange, setName, resetName] = useFormState('')
  const [isEditMode, toggleIsEditMode] = useToggle(false)
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

  const onDeviceSubmit = async (event) => {
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
        setTriage({ ...triage, devices: [...triage.devices, res.device] })
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't create device")
    }
  }

  const onRenameSubmit = async (event) => {
    event.preventDefault()

    try {
    } catch {
      appContext.showPopup("Couldn't rename triage")
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

          {triage && (
            <div>
              {isEditMode ? (
                <form
                  className="input-button-combine"
                  onSubmit={onRenameSubmit}
                >
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={onNameChange}
                    required
                  />
                  <button type="submit">Rename</button>
                  <button className="normalize" onClick={toggleIsEditMode}>
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="name-wrap">
                  <h1>{triage.name}</h1>
                  <button onClick={toggleIsEditMode}>Rename</button>
                  <button className="danger-bg">Delete</button>
                </div>
              )}
            </div>
          )}
        </div>

        {triage && (
          <div className="inputs">
            <form className="input-button-combine" onSubmit={onDeviceSubmit}>
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
        <div>
          {triage && triage.devices && triage.devices.length ? (
            triage.devices.map((d) => (
              <DeviceTriageCard
                key={d.id}
                triage={triage}
                setTriage={setTriage}
                device={d}
              />
            ))
          ) : (
            <p>There are no devices!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TriageNew

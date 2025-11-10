import './DeviceTriageCard.css'
import PathTriageCard from './PathTriageCard'
import Panel from './ui/Panel'
import useFormState from '../hooks/useFormState'
import useToggle from '../hooks/useToggle'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { postPath } from '../services/paths'
import { deleteDevice, patchDevice } from '../services/devices'
import SvgButton from './SvgButton'

const DeviceTriageCard = (props) => {
  const appContext = useContext(AppContext)
  const [port, onPortChange, setPort, resetPort] = useFormState('')
  const [isPortActive, toggleIsPortActive, setIsPortActive, resetIsPortActive] =
    useToggle(false)
  const [
    destHostname,
    onDestHostnameChange,
    setDestHostname,
    resetDestHostname
  ] = useFormState('')
  const [destPort, onDestPortChange, setDestPort, resetDestPort] =
    useFormState('')
  const [
    destIsPortActive,
    onDestIsPortActive,
    setDestIsPortActive,
    resetDestIsPortActive
  ] = useToggle(false)
  const [isEditMode, toggleIsEditMode] = useToggle(false)
  const [hostname, onHostnameChange, setHostname, resetHostname] = useFormState(
    props.device.hostname
  )

  const onPathSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        postPath({
          deviceId: props.device.id,
          port: port,
          isPortActive: isPortActive,
          destHostname: destHostname === '' ? 'N/A' : destHostname,
          destPort: destPort === '' ? 'N/A' : destPort,
          destIsPortActive: destIsPortActive
        })
      )

      if (res) {
        const updatedDevices = props.triage.devices.map((d) => {
          if (d.id === props.device.id) {
            d.paths.push({ ...res.path, hops: [] })
          }

          return d
        })

        props.setTriage({ ...props.triage, devices: updatedDevices })
      } else {
        throw new Error()
      }

      resetPort()
      resetIsPortActive()
      resetDestHostname()
      resetDestPort()
      resetDestIsPortActive()
    } catch (err) {
      console.log(err.message)
      appContext.showPopup("Couldn't create path")
    }
  }

  const onRenameSubmit = (event) => {
    event.preventDefault()

    try {
      const res = appContext.load(() =>
        patchDevice(props.device.id, { hostname: hostname })
      )

      if (res) {
        const updatedDevices = props.triage.devices.map((d) => {
          if (d.id === props.device.id) {
            d.hostname = hostname
          }

          return d
        })

        props.setTriage({ ...props.triage, devices: updatedDevices })
        resetHostname()
        toggleIsEditMode()
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't rename device")
    }
  }

  const handleDelete = () => {
    const handler = async () => {
      const res = await appContext.load(() => deleteDevice(props.device.id))
      if (res) {
        const updatedDevices = props.triage.devices.filter(
          (d) => d.id !== props.device.id
        )

        props.setTriage({ ...props.triage, devices: updatedDevices })

        appContext.dismissPopup()
      } else {
        appContext.dismissPopup()
        appContext.showPopup("Couldn't delete guide")
      }
    }

    appContext.showPopup({
      msg: `Are you sure you want to delete "${props.device.hostname}"?`,
      dismissBtnText: 'Cancel',
      component: (
        <button className="danger-bg" onClick={handler}>
          Delete
        </button>
      )
    })
  }

  const editHandler = () => {
    resetHostname()
    toggleIsEditMode()
  }

  return (
    <Panel className="DeviceTriageCard">
      <header className="device">
        {isEditMode ? (
          <form className="input-button-combine" onSubmit={onRenameSubmit}>
            <label htmlFor="hostname">Hostname</label>
            <input
              className="light"
              type="text"
              name="hostname"
              id="hostname"
              placeholder="Hostname"
              value={hostname}
              onChange={onHostnameChange}
              required
            />
            <button type="submit">Rename</button>
            <button onClick={toggleIsEditMode} className="normalize">
              Cancel
            </button>
          </form>
        ) : (
          <div className="header-wrap">
            <h2>{props.device.hostname}</h2>
            <SvgButton onClick={editHandler} type="edit" />
            <SvgButton onClick={handleDelete} type="delete" />
          </div>
        )}
      </header>

      <div className="paths">
        {props.device.paths && props.device.paths.length > 0 ? (
          props.device.paths.map((p) => (
            <PathTriageCard
              key={p.id}
              triage={props.triage}
              setTriage={props.setTriage}
              device={props.device}
              path={p}
            />
          ))
        ) : (
          <p>There are no paths!</p>
        )}
      </div>

      <form onSubmit={onPathSubmit} className="path-form">
        <div className="inner-wrap">
          <div className="form-section">
            <label htmlFor={`port_${props.device.id}`}>Port</label>
            <input
              className="small light"
              type="text"
              name="port"
              id={`port_${props.device.id}`}
              placeholder="Port"
              value={port}
              onChange={onPortChange}
              required
            />

            <div className="checkbox-wrap">
              <label
                className="show"
                htmlFor={`isPortActive_${props.device.id}`}
              >
                UP:
              </label>
              <input
                className="light"
                id={`isPortActive_${props.device.id}`}
                name="isPortActive"
                type="checkbox"
                checked={isPortActive}
                onChange={toggleIsPortActive}
              />
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                fill="#989898"
                d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"
              ></path>
            </g>
          </svg>

          <div className="form-section">
            <label htmlFor={`destHostname_${props.device.id}`}>
              Destination
            </label>
            <input
              className="light"
              type="text"
              name="destHostname"
              id={`destHostname_${props.device.id}`}
              placeholder="Destination (optional)"
              value={destHostname}
              onChange={onDestHostnameChange}
            />

            <label htmlFor={`destPort_${props.device.id}`}>Port</label>
            <input
              className="small light"
              type="text"
              name="destPort"
              id={`destPort_${props.device.id}`}
              placeholder="Port (optional)"
              value={destPort}
              onChange={onDestPortChange}
            />

            <div className="checkbox-wrap">
              <label
                className="show"
                htmlFor={`destIsPortActive_${props.device.id}`}
              >
                UP:
              </label>
              <input
                className="light"
                id={`destIsPortActive_${props.device.id}`}
                name="destIsPortActive"
                type="checkbox"
                checked={destIsPortActive}
                onChange={onDestIsPortActive}
              />
            </div>
          </div>
        </div>

        <button>Add Path</button>
      </form>
    </Panel>
  )
}

export default DeviceTriageCard

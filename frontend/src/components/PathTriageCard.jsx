import { useContext, useRef } from 'react'
import useFormState from '../hooks/useFormState'
import './PathTriageCard.css'
import { AppContext } from '../contexts/AppContext'
import { postHop } from '../services/hops'
import { deletePath } from '../services/paths'
import useToggle from '../hooks/useToggle'

const PathTriageCard = (props) => {
  const appContext = useContext(AppContext)
  const [hop, onHopChange, setHop, resetHop] = useFormState('')
  const [isEditMode, toggleIsEditMode] = useToggle(false)
  const [port, onPortChange, setPort, resetPort] = useFormState(props.path.port)
  const [isPortActive, toggleIsPortActive, setIsPortActive, resetIsPortActive] =
    useToggle(props.path.isPortActive)
  const [
    destHostname,
    onDestHostnameChange,
    setDestHostname,
    resetDestHostname
  ] = useFormState(props.path.destHostname)
  const [destPort, onDestPortChange, setDestPort, resetDestPort] = useFormState(
    props.path.destPort
  )
  const [
    destIsPortActive,
    onDestIsPortActive,
    setDestIsPortActive,
    resetDestIsPortActive
  ] = useToggle(props.path.destIsPortActive)
  const inputRef = useRef()

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        postHop({
          pathId: props.path.id,
          hop: hop
        })
      )

      if (res) {
        const updatedDevices = props.triage.devices.map((d) => {
          if (d.id === props.device.id) {
            d.paths.map((p) => {
              if (p.id === props.path.id) {
                p.hops.push(res.hop)
              }
            })
          }

          return d
        })

        props.setTriage({ ...props.triage, devices: updatedDevices })
      } else {
        throw new Error()
      }

      resetHop()

      inputRef.current.focus()
    } catch {
      appContext.showPopup("Couldn't create hop")
    }
  }

  const onUpdateSubmit = async () => {
    try {
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const handleDelete = () => {
    const handler = async () => {
      const res = await appContext.load(() => deletePath(props.path.id))
      if (res) {
        const updatedDevices = props.triage.devices.map((d) => {
          if (d.id === props.device.id) {
            d.paths = d.paths.filter((p) => p.id !== props.path.id)
          }

          return d
        })

        props.setTriage({ ...props.triage, devices: updatedDevices })

        appContext.dismissPopup()
      } else {
        appContext.dismissPopup()
        appContext.showPopup("Couldn't delete path")
      }
    }

    appContext.showPopup({
      msg: `Are you sure you want to delete "${props.path.port}"?`,
      dismissBtnText: 'Cancel',
      component: (
        <button className="danger-bg" onClick={handler}>
          Delete
        </button>
      )
    })
  }

  return (
    <div className="PathTriageCard">
      {isEditMode ? (
        <form onSubmit={onUpdateSubmit} className="path-form">
          <div className="inner-wrap">
            <div className="form-section">
              <label htmlFor={`port_${props.device.id}`}>Port</label>
              <input
                className="small"
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
                type="text"
                name="destHostname"
                id={`destHostname_${props.device.id}`}
                placeholder="Destination (optional)"
                value={destHostname}
                onChange={onDestHostnameChange}
              />

              <label htmlFor={`destPort_${props.device.id}`}>Port</label>
              <input
                className="small"
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
                  id={`destIsPortActive_${props.device.id}`}
                  name="destIsPortActive"
                  type="checkbox"
                  checked={destIsPortActive}
                  onChange={onDestIsPortActive}
                />
              </div>
            </div>
          </div>

          <div className="inputs">
            <button type="submit">Update Path</button>
            <button onClick={toggleIsEditMode}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <div className="inputs">
            <button onClick={toggleIsEditMode}>Edit Path</button>
            <button className="danger-bg" onClick={handleDelete}>
              Delete Path
            </button>
          </div>

          <div className="main-wrap">
            <div className="device">
              <p>
                <span className="muted-text">Port:</span> {props.path.port}
              </p>
              <p>
                <span className="muted-text">Status:</span>{' '}
                {props.path.isPortActive ? 'UP' : 'DOWN'}
              </p>
            </div>

            <div className="hops">
              {props.path.hops && props.path.hops.length > 0 ? (
                props.path.hops.map((h, index) => (
                  <p key={h.id}>{`${h.hop}${
                    index === props.path.hops.length - 1 ? '' : ' →'
                  }`}</p>
                ))
              ) : (
                <p>There are no hops!</p>
              )}
            </div>

            <div className="destination">
              <p>
                <span className="muted-text">Destination:</span>{' '}
                {props.path.destHostname}
              </p>
              <p>
                <span className="muted-text">Port:</span> {props.path.destPort}
              </p>
              <p>
                <span className="muted-text">Status:</span>{' '}
                {props.path.destIsPortActive ? 'UP' : 'DOWN'}
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <label htmlFor="hop">Hop</label>
            <input
              ref={inputRef}
              className="small"
              type="text"
              name="hop"
              id="hop"
              placeholder="Hop"
              value={hop}
              onChange={onHopChange}
              required
            />

            <button>Add Hop</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PathTriageCard

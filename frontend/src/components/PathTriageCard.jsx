import { useContext, useRef } from 'react'
import useFormState from '../hooks/useFormState'
import './PathTriageCard.css'
import { AppContext } from '../contexts/AppContext'
import { postHop } from '../services/hops'

const PathTriageCard = (props) => {
  const appContext = useContext(AppContext)
  const [hop, onHopChange, setHop, resetHop] = useFormState('')
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

  return (
    <div className="PathTriageCard">
      <div className="inputs">
        <button>Edit Path</button>
        <button className="danger-bg">Delete Path</button>
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
  )
}

export default PathTriageCard

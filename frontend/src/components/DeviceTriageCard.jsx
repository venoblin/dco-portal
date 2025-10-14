import './DeviceTriageCard.css'
import PathTriageCard from './PathTriageCard'
import Panel from './ui/Panel'
import useFormState from '../hooks/useFormState'
import useToggle from '../hooks/useToggle'

const DeviceTriageCard = (props) => {
  const [port, onPortChange] = useFormState('')
  const [isPortActice, toggleIsPortActice] = useToggle(false)
  const [destHostname, onDestHostnameChange] = useFormState('')
  const [destPort, onDestPortChange] = useFormState('')
  const [destIsPortActive, onDestIsPortActive] = useToggle(false)

  return (
    <Panel className="DeviceTriageCard">
      <div className="device">
        <h2>{props.device.hostname}</h2>
      </div>

      <div className="paths">
        {props.device.paths && props.device.paths.length > 0 ? (
          props.device.paths.map((p) => <PathTriageCard key={p.id} path={p} />)
        ) : (
          <p>There are no paths!</p>
        )}
      </div>

      <form>
        <div className="inner-wrap">
          <div className="form-section">
            <label htmlFor={`port_${props.device.id}`}>Port</label>
            <input
              type="text"
              name="port"
              id={`port_${props.device.id}`}
              placeholder="Port"
              value={port}
              onChange={onPortChange}
              required
            />

            <div>
              <label
                className="show"
                htmlFor={`isPortActice_${props.device.id}`}
              >
                UP:
              </label>
              <input
                id={`isPortActice_${props.device.id}`}
                name="isPortActice"
                type="checkbox"
                checked={isPortActice}
                onChange={toggleIsPortActice}
              />
            </div>
          </div>

          <div className="form-section">
            <label htmlFor={`destHostname_${props.device.id}`}>
              Destination
            </label>
            <input
              type="text"
              name="destHostname"
              id={`destHostname_${props.device.id}`}
              placeholder="Destination"
              value={destHostname}
              onChange={onDestHostnameChange}
            />

            <label htmlFor={`destPort_${props.device.id}`}>Port</label>
            <input
              type="text"
              name="destPort"
              id={`destPort_${props.device.id}`}
              placeholder="Port"
              value={destPort}
              onChange={onDestPortChange}
            />

            <div>
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

        <button>Add Path</button>
      </form>
    </Panel>
  )
}

export default DeviceTriageCard

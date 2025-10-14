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

            <div className="checkbox-wrap">
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

        <button>Add Path</button>
      </form>
    </Panel>
  )
}

export default DeviceTriageCard

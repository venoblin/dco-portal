import './DeviceTriageCard.css'
import PathTriageCard from './PathTriageCard'

const DeviceTriageCard = (props) => {
  return (
    <div className="DeviceTriageCard">
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
    </div>
  )
}

export default DeviceTriageCard

import PathTriageCard from './PathTriageCard'

const DeviceTriageCard = (props) => {
  return (
    <div>
      <div className="device">
        <p>{props.device.hostname}</p>
      </div>

      <div className="paths">
        {props.device.paths && props.device.paths.length > 0 ? (
          props.device.paths.map((p) => <PathTriageCard key={p.id} path={p} />)
        ) : (
          <p>There are no paths</p>
        )}
      </div>
    </div>
  )
}

export default DeviceTriageCard

import './PathTriageCard.css'

const PathTriageCard = (props) => {
  return (
    <div className="PathTriageCard">
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
          props.path.hops.map((h) => <p key={h.id}>{h.hop}</p>)
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
  )
}

export default PathTriageCard

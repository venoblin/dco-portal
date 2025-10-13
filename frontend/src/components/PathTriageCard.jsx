const PathTriageCard = (props) => {
  return (
    <div>
      <div className="device">
        <p>{props.path.port}</p>
        <p>Status: {props.path.isPortActive ? 'UP' : 'DOWN'}</p>
      </div>

      <div className="hops">
        {props.path.hops && props.path.hops.length > 0 ? (
          props.path.hops.map((h) => <p key={h.id}>{h.hop}</p>)
        ) : (
          <p>There are no hops!</p>
        )}
      </div>

      <div className="destination">
        <p>{props.path.destHostname}</p>
        <p>{props.path.destPort}</p>
        <p>Status: {props.path.destIsPortActive ? 'UP' : 'DOWN'}</p>
      </div>
    </div>
  )
}

export default PathTriageCard

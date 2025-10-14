import useFormState from '../hooks/useFormState'
import './PathTriageCard.css'

const PathTriageCard = (props) => {
  const [hop, onHopChange] = useFormState('')

  return (
    <div className="PathTriageCard">
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

      <form>
        <label htmlFor="hop">Hop</label>
        <input
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

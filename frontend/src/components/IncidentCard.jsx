import './IncidentCard.css'

const IncidentCard = (props) => {
  return (
    <div className="IncidentCard">
      <div className="incident-header">
        <h2>{props.incident.incident}</h2>
        <h2>{props.incident.number}</h2>
        <p>Assigned to {props.incident.assigned_to}</p>
      </div>

      <div className="incident-info">
        <h3>{props.incident.short_description}</h3>
        <p className="muted-text">{props.incident.description}</p>
      </div>
    </div>
  )
}

export default IncidentCard

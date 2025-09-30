import './IncidentPrint.css'

const IncidentPrint = (props) => {
  return (
    <div className="IncidentPrint">
      <p>{props.incident.incident}</p>
    </div>
  )
}

export default IncidentPrint

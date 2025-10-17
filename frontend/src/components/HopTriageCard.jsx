import './HopTriageCard.css'

const HopTriageCard = (props) => {
  return (
    <div className="HopTriageCard">
      <p>{props.hop.hop}</p>
    </div>
  )
}

export default HopTriageCard

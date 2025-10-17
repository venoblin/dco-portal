import './HopTriageCard.css'

const HopTriageCard = (props) => {
  return (
    <div className="HopTriageCard">
      <div className="inputs">
        <button>Edit Hop</button>
        <button className="danger-bg">Delete Hop</button>
      </div>
      <p>{props.hop.hop}</p>
    </div>
  )
}

export default HopTriageCard

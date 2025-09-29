import './IncidentCard.css'
import useToggle from '../hooks/useToggle'

const IncidentCard = (props) => {
  const [isShowingDesc, toggleIsShowingDesc] = useToggle(false)

  const onCheckChange = (event) => {
    setIsChecked(event.target.checked)
    props.onCheck(props.incident, event.target.checked)
  }

  const showDescHandler = () => {
    toggleIsShowingDesc()
  }

  return (
    <div className={`IncidentCard${isChecked ? ' selected' : ''}`}>
      <div>
        <div className="incident-header">
          <div className="incident">
            <h2>{props.incident.incident}</h2>
            <h2>{props.incident.number}</h2>
            <p>Assigned to {props.incident.assigned_to}</p>
          </div>

          <div className="inputs">
            {!isChecked && <button>Print</button>}
            <input
              className="big-checkbox"
              type="checkbox"
              value={isChecked}
              onChange={(event) => onCheckChange(event)}
            />

            <button
              onClick={showDescHandler}
              className={`svg-btn${isShowingDesc ? ' showing' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path
                    className="accent"
                    fill="#989898"
                    d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="incident-info">
          <p>{props.incident.short_description}</p>

          {isShowingDesc === true && (
            <p className="muted-text">{props.incident.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default IncidentCard

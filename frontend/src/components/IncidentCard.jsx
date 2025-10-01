import './IncidentCard.css'
import useToggle from '../hooks/useToggle'

const IncidentCard = (props) => {
  const [isShowingDesc, toggleIsShowingDesc] = useToggle(false)

  const showDescHandler = () => {
    toggleIsShowingDesc()
  }

  return (
    <div
      className={`IncidentCard${props.incident.isChecked ? ' selected' : ''}`}
    >
      <div>
        <div className="incident-header">
          <div className="incident">
            <h2>{props.incident.incident}</h2>
            <h2>{props.incident.number}</h2>

            {props.incident.arms && (
              <div className="incident-arms">
                {props.incident.arms.length > 0 &&
                  props.incident.arms.map((a) => <p key={a}>{a}</p>)}
              </div>
            )}
          </div>

          <div className="inputs">
            {!props.incident.isChecked && (
              <button onClick={() => props.onPrint(props.incident)}>
                Print
              </button>
            )}
            <input
              className="big-checkbox"
              type="checkbox"
              checked={props.incident.isChecked}
              onChange={(event) => props.onCheckChange(event, props.incident)}
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
          <div className="info">
            <div className="machine-info-wrap">
              <div className="machine-info">
                <p className="muted-text">Hostname:</p>
                <p>{props.incident.cmdb_ci}</p>
              </div>

              <div className="machine-info">
                <p className="muted-text">Asset:</p>
                <p>{props.incident.ci ? props.incident.ci.asset_tag : 'N/A'}</p>
              </div>

              <div className="machine-info">
                <p className="muted-text">Rack:</p>
                <p>{props.incident.ci ? props.incident.ci.rack : 'N/A'}</p>
              </div>

              <div className="machine-info">
                <p className="muted-text">Height:</p>
                <p>{props.incident.ci ? props.incident.ci.height : 'N/A'}</p>
              </div>
            </div>

            <div>
              <p>Assigned to {props.incident.assigned_to}</p>
              <p>{props.incident.u_sub_type}</p>
              <p
                className={`${
                  (Date.parse(props.incident.due_date) < new Date() === true
                    ? 'danger'
                    : '') ||
                  (Date.parse(props.incident.due_date) - 4 * 60 * 60 * 1000 <
                    new Date() ===
                  true
                    ? 'warning'
                    : '')
                }`}
              >
                Due {props.incident.due_date}
              </p>
            </div>
          </div>

          <p>{props.incident.short_description}</p>
          {isShowingDesc === true && (
            <div
              className="full-description"
              dangerouslySetInnerHTML={{
                __html: props.incident.description.replaceAll('\n', '<br>')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default IncidentCard

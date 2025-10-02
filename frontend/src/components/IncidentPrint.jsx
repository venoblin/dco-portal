import './IncidentPrint.css'

const IncidentPrint = (props) => {
  return (
    <div className="IncidentPrint">
      <div className="info">
        <div className="machine-info">
          <h2>Machine Info</h2>

          <div className="info-wrap">
            <p className="muted-text">Hostname:</p>
            <p>{props.incident.cmdb_ci}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Asset:</p>
            <p>{props.incident.ci ? props.incident.ci.asset_tag : 'N/A'}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Serial:</p>
            <p>{props.incident.ci ? props.incident.ci.serial : 'N/A'}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Manufacturer:</p>
            <p>{props.incident.ci ? props.incident.ci.manufacturer : 'N/A'}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Model:</p>
            <p>{props.incident.ci ? props.incident.ci.model : 'N/A'}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Rack:</p>
            <p>{props.incident.ci ? props.incident.ci.rack : 'N/A'}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Height:</p>
            <p>{props.incident.ci ? props.incident.ci.height : 'N/A'}</p>
          </div>
        </div>

        <div className="incident-info">
          <h2>Incident Info</h2>

          <div className="info-wrap">
            <p className="muted-text">Incident:</p>
            <p>{props.incident.incident}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Task:</p>
            <p>{props.incident.number}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Assigned To:</p>
            <p>{props.incident.assigned_to}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Due:</p>
            <p>{props.incident.due_date}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Type:</p>
            <p>{props.incident.u_sub_type}</p>
          </div>

          {props.incident.arms && (
            <div className="info-wrap">
              <p className="muted-text">ARM/s:</p>

              <div className="arms">
                {props.incident.arms.length > 0 &&
                  props.incident.arms.map((a, idx) =>
                    idx === props.incident.arms.length - 1 ? (
                      <p key={a}>{a}</p>
                    ) : (
                      <p key={a}>{a},</p>
                    )
                  )}
              </div>
            </div>
          )}
        </div>

        <div className="barcodes">
          <Barcode value={props.incident.incident} />

          <div>Asset tag Barcode</div>

          {props.incident.arms &&
            props.incident.arms.length > 0 &&
            props.incident.arms.map((a) => <Barcode key={a} value={a} />)}
        </div>
      </div>

      <div className="description">
        <p className="short-description">{props.incident.short_description}</p>
        <p
          className="full-description"
          dangerouslySetInnerHTML={{
            __html: props.incident.description
          }}
        />
      </div>
    </div>
  )
}

export default IncidentPrint

import './IncidentPrint.css'
import Barcode from './Barcode'

const IncidentPrint = (props) => {
  return (
    <div className="IncidentPrint to-print">
      <div className="info">
        <div className="machine-info">
          <h2>Machine Info</h2>

          <div className="info-wrap">
            <p className="muted-text">Hostname:</p>
            <p>{props.incident.cmdb_ci}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Asset:</p>
            <p>{props.incident.device && props.incident.device.assetTag}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Serial:</p>
            <p>{props.incident.device && props.incident.device.serialNo}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Manufacturer:</p>
            <p>{props.incident.device && props.incident.device.manufacturer}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Model:</p>
            <p>{props.incident.device && props.incident.device.model}</p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Rack:</p>
            <p>
              {props.incident.device && props.incident.device.deployment.rack}
            </p>
          </div>

          <div className="info-wrap">
            <p className="muted-text">Height:</p>
            <p>
              {props.incident.device &&
                props.incident.device.deployment.zPosition}
            </p>
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
                {props.incident.arms &&
                  props.incident.arms.length > 0 &&
                  props.incident.arms.map((a, idx) =>
                    idx === props.incident.arms.length - 1 ? (
                      <p key={a.number}>{a.number}</p>
                    ) : (
                      <p key={a.number}>{a.number},</p>
                    )
                  )}
              </div>
            </div>
          )}
        </div>

        <div className="barcodes">
          <Barcode value={props.incident.incident} />

          {props.incident.device && (
            <Barcode value={props.incident.device.assetTag} />
          )}

          {props.incident.arms &&
            props.incident.arms.length > 0 &&
            props.incident.arms.map((a) => (
              <Barcode key={a.number} value={a.number} />
            ))}
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

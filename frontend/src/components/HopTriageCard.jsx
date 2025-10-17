import { useContext } from 'react'
import { deleteHop } from '../services/hops'
import './HopTriageCard.css'
import { AppContext } from '../contexts/AppContext'

const HopTriageCard = (props) => {
  const appContext = useContext(AppContext)

  const handleDelete = () => {
    const handler = async () => {
      const res = await appContext.load(() => deleteHop(props.hop.id))
      if (res) {
        const updatedDevices = props.triage.devices.map((d) => {
          if (d.id === props.device.id) {
            d.paths = d.paths.map((p) => {
              if (p.id === props.path.id) {
                p.hops = p.hops.filter((h) => h.id !== props.hop.id)
              }

              return p
            })
          }

          return d
        })

        props.setTriage({ ...props.triage, devices: updatedDevices })

        appContext.dismissPopup()
      } else {
        appContext.dismissPopup()
        appContext.showPopup("Couldn't delete hop")
      }
    }

    appContext.showPopup({
      msg: `Are you sure you want to delete "${props.hop.hop}"?`,
      dismissBtnText: 'Cancel',
      component: (
        <button className="danger-bg" onClick={handler}>
          Delete
        </button>
      )
    })
  }

  return (
    <div className="HopTriageCard">
      <div className="inputs">
        <button>Edit Hop</button>
        <button onClick={handleDelete} className="danger-bg">
          Delete Hop
        </button>
      </div>
      <p>{props.hop.hop}</p>
    </div>
  )
}

export default HopTriageCard

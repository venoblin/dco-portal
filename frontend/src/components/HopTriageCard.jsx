import './HopTriageCard.css'
import { useContext } from 'react'
import { deleteHop, patchHop } from '../services/hops'
import { AppContext } from '../contexts/AppContext'
import useToggle from '../hooks/useToggle'
import useFormState from '../hooks/useFormState'
import SvgButton from './SvgButton'

const HopTriageCard = (props) => {
  const appContext = useContext(AppContext)
  const [hop, onHopChange, setHop, resetHop] = useFormState(props.hop.hop)
  const [isEditMode, toggleIsEditMode] = useToggle(false)

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        patchHop(props.hop.id, {
          hop: hop
        })
      )

      if (res) {
        const updatedDevices = props.triage.devices.map((d) => {
          if (d.id === props.device.id) {
            d.paths = d.paths.map((p) => {
              if (p.id === props.path.id) {
                p.hops = p.hops.map((h) => {
                  if (h.id === props.hop.id) {
                    h = { ...h, ...res.hop }
                  }

                  return h
                })
              }

              return p
            })
          }

          return d
        })

        props.setTriage({ ...props.triage, devices: updatedDevices })

        toggleIsEditMode()
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't update hop")
    }
  }

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

  const editHandler = () => {
    resetHop()
    toggleIsEditMode()
  }

  return (
    <div className="HopTriageCard">
      {isEditMode ? (
        <form onSubmit={onSubmit}>
          <label htmlFor="hop">Hop</label>
          <input
            className="small light"
            type="text"
            name="hop"
            id="hop"
            placeholder="Hop"
            value={hop}
            onChange={onHopChange}
            required
          />

          <div className="inputs">
            <button type="submit">Update Hop</button>
            <button onClick={editHandler}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <div className="inputs">
            <SvgButton onClick={toggleIsEditMode} type="edit" />
            <SvgButton
              className="danger"
              onClick={handleDelete}
              type="delete"
            />
          </div>
          <p className="hop">{props.hop.hop}</p>
        </div>
      )}
    </div>
  )
}

export default HopTriageCard

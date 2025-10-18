import './TriageEdit.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import {
  deleteTriage,
  getSingleTriage,
  patchTriage
} from '../../services/triages'
import useFormState from '../../hooks/useFormState'
import DeviceTriageCard from '../DeviceTriageCard'
import { postDevice } from '../../services/devices'
import useToggle from '../../hooks/useToggle'
import { generateXlsxFile } from '../../utils/xlsx'
import { findAllDevices } from '../../services/tools'

const TriageNew = () => {
  const appContext = useContext(AppContext)
  const [hostname, onHostnameChange, setHostname, resetHostname] =
    useFormState('')
  const [triage, setTriage] = useState(null)
  const [name, onNameChange, setName] = useFormState('')
  const [isEditMode, toggleIsEditMode] = useToggle(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const getTriage = async () => {
    try {
      const res = await appContext.load(() => getSingleTriage(id))

      if (res) {
        setTriage(res.triage)
        setName(res.triage.name)
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't find triage")
    }
  }

  const onDeviceSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        postDevice({
          triageId: id,
          hostname: hostname
        })
      )

      resetHostname()

      if (res) {
        setTriage({
          ...triage,
          devices: [...triage.devices, { ...res.device, paths: [] }]
        })
      } else {
        throw new Error()
      }
    } catch {
      appContext.showPopup("Couldn't create device")
    }
  }

  const onRenameSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await appContext.load(() =>
        patchTriage(triage.id, { name: name })
      )

      if (res) {
        setTriage(res.triage)
      } else {
        throw new Error()
      }

      toggleIsEditMode()
    } catch {
      appContext.showPopup("Couldn't rename triage")
    }
  }

  const handleDelete = () => {
    const handler = async () => {
      const res = await appContext.load(() => deleteTriage(id))
      if (res) {
        appContext.dismissPopup()
        navigate('/tools/triage-manager')
      } else {
        appContext.dismissPopup()
        appContext.showPopup("Couldn't delete guide")
      }
    }

    appContext.showPopup({
      msg: `Are you sure you want to delete "${triage.name}"?`,
      dismissBtnText: 'Cancel',
      component: (
        <button className="danger-bg" onClick={handler}>
          Delete
        </button>
      )
    })
  }

  const handleDownload = async () => {
    let longestPath = 0
    // const data = []

    const getHops = (path) => {
      const hops = path.hops

      if (hops.length - 1 < longestPath) {
        const difference = longestPath - hops.length - 1

        for (let i = 0; i <= difference; i++) {
          hops.push("'==>")
        }
      }

      return path.hops.map((h) => h.hop)
    }

    try {
      const promises = triage.devices.map(async (d) => {
        const deviceArr = [[d.hostname]]

        const res = await appContext.load(() =>
          findAllDevices(
            { queriesArr: [d.hostname] },
            appContext.auth.credentials
          )
        )

        if (res) {
          deviceArr.push(
            res.device[0].info.assetTag
              ? res.device[0].info.assetTag
              : 'Not Found',
            res.device[0].info.deployment.rack
              ? res.device[0].info.deployment.rack
              : 'Not Found',
            res.device[0].info.deployment.zPosition
              ? d.info.deployment.zPosition
              : 'Not Found'
          )
        }

        d.paths.forEach(async (p, index) => {
          const res = await appContext.load(() =>
            findAllDevices(
              { queriesArr: [p.destHostname] },
              appContext.auth.credentials
            )
          )

          if (p.hops.length - 1 > longestPath) {
            longestPath = p.hops.length
          }

          const port = [`'${p.port}`, p.isPortActive ? 'UP' : 'DOWN']
          let destination = []
          if (res) {
            destination.push(
              p.destHostname,
              `'${p.destPort}`,
              p.destIsPortActive ? 'UP' : 'DOWN'
            )
          } else {
            destination.push(
              p.destHostname,
              res.devices[0].info.assetTag
                ? res.devices[0].info.assetTag
                : 'Not Found',
              `'${p.destPort}`,
              p.destIsPortActive ? 'UP' : 'DOWN'
            )
          }

          const row = [...port, ...getHops(p), ...destination]

          switch (index) {
            case 0:
              deviceArr[deviceArr.length - 1].push(...row)
              break
            case d.paths.length - 1:
              deviceArr.push(['', '', '', ...row])
              deviceArr.push([])
              break
            default:
              deviceArr.push(['', '', '', ...row])
          }
        })

        return deviceArr
      })

      const finalData = await Promise.all(promises)

      generateXlsxFile(triage.name, ...finalData)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const renameHandler = () => {
    setName(triage.name)
    toggleIsEditMode()
  }

  useEffect(() => {
    getTriage()
  }, [])

  return (
    <div className="TriageEdit">
      <header>
        <div>
          <Link to="/tools/triage-manager">← Back</Link>

          {triage && (
            <div>
              {isEditMode ? (
                <form
                  className="input-button-combine"
                  onSubmit={onRenameSubmit}
                >
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={onNameChange}
                    required
                  />
                  <button type="submit">Rename</button>
                  <button className="normalize" onClick={toggleIsEditMode}>
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="header-wrap">
                  <h1>{triage.name}</h1>
                  <button onClick={renameHandler}>Rename Triage</button>
                  <button onClick={handleDelete} className="danger-bg">
                    Delete Triage
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {triage && (
          <div className="inputs">
            <form className="input-button-combine" onSubmit={onDeviceSubmit}>
              <label htmlFor="hostname">Hostname</label>
              <input
                type="text"
                name="hostname"
                id="hostname"
                placeholder="Hostname"
                value={hostname}
                onChange={onHostnameChange}
                required
              />
              <button>Add Device</button>
            </form>

            <button onClick={handleDownload}>Download</button>
          </div>
        )}
      </header>

      <div>
        <div>
          {triage && triage.devices && triage.devices.length ? (
            triage.devices.map((d) => (
              <DeviceTriageCard
                key={d.id}
                triage={triage}
                setTriage={setTriage}
                device={d}
              />
            ))
          ) : (
            <p>There are no devices!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TriageNew

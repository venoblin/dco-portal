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
    try {
      let longestPath = 0
      triage.devices.forEach((device) => {
        device.paths.forEach((path) => {
          if (path.hops.length > longestPath) {
            longestPath = path.hops.length
          }
        })
      })

      const devicePromises = triage.devices.map(async (device) => {
        const deviceRows = []

        const sourceDeviceRes = await appContext.load(() =>
          findAllDevices(
            { queriesArr: [device.hostname] },
            appContext.auth.credentials
          )
        )

        const sourceDeviceInfo = sourceDeviceRes?.devices?.[0]?.info

        const baseDeviceInfo = [
          device.hostname,
          sourceDeviceInfo?.assetTag || 'Not Found',
          sourceDeviceInfo?.deployment?.rack || 'Not Found',
          sourceDeviceInfo?.deployment?.zPosition || 'Not Found'
        ]

        const pathPromises = device.paths.map(async (path, pathIndex) => {
          const destDeviceRes = await appContext.load(() =>
            findAllDevices(
              { queriesArr: [path.destHostname] },
              appContext.auth.credentials
            )
          )

          const destDeviceInfo = destDeviceRes?.devices?.[0]?.info

          const hops = path.hops.map((hop) => hop.hop)
          const hopsWithPadding = [...hops]

          while (hopsWithPadding.length < longestPath) {
            hopsWithPadding.push('')
          }

          const pathRow = [
            `'${path.port}`,
            path.isPortActive ? 'UP' : 'DOWN',
            ...hopsWithPadding,
            path.destHostname,
            destDeviceInfo?.assetTag || 'Not Found',
            `'${path.destPort}`,
            path.destIsPortActive ? 'UP' : 'DOWN'
          ]

          if (pathIndex === 0) {
            return [...baseDeviceInfo, ...pathRow]
          } else {
            return ['', '', '', '', ...pathRow]
          }
        })

        const pathRows = await Promise.all(pathPromises)

        if (pathRows.length > 0) {
          deviceRows.push(...pathRows, [])
        }

        return deviceRows
      })

      const allDeviceData = await Promise.all(devicePromises)

      const flattenedData = allDeviceData.flat()

      const hopHeaders = Array.from(
        { length: longestPath },
        (_, i) => `Hop ${i + 1}`
      )

      const headers = [
        'Hostname',
        'Asset Tag',
        'Rack',
        'Height',
        'Port',
        'Status',
        ...hopHeaders,
        'Destination Hostname',
        'Destination Tag',
        'Destination Port',
        'Destination Status'
      ]

      const finalData = [headers, ...flattenedData]

      generateXlsxFile(triage.name, finalData)
    } catch (error) {
      console.error('Download error:', error)
      appContext.showPopup('Failed to generate spreadsheet')
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
                    className="light"
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
                className="light"
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

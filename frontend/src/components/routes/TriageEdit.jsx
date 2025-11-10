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
import { constructQueries } from '../../utils'
import LoadingIcon from '../LoadingIcon'
import SvgButton from '../SvgButton'

const TriageEdit = () => {
  const appContext = useContext(AppContext)
  const [textData, handleTextDataChange, setTextData, resetTextData] =
    useFormState('')
  const [triage, setTriage] = useState(null)
  const [name, onNameChange, setName] = useFormState('')
  const [isEditMode, toggleIsEditMode] = useToggle(false)
  const [isDownloading, toggleIsDownloading] = useToggle(false)
  const [isPostingDevices, toggleIsPostingDevices] = useToggle(false)
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

    toggleIsPostingDevices()

    try {
      const queries = constructQueries(textData, 'assetName')

      const hostnamesPromises = queries.map(async (query) => {
        const res = await appContext.load(() =>
          postDevice({
            triageId: id,
            hostname: query.assetName
          })
        )

        if (res) {
          return res.device
        } else {
          throw new Error("Couldn't create device/s")
        }
      })

      const allDeviceData = await Promise.all(hostnamesPromises)

      const pathedDevices = allDeviceData.map((device) => {
        device.paths = []
        return device
      })

      resetTextData()

      const newDevices = [...triage.devices, ...pathedDevices]

      setTriage({
        ...triage,
        devices: newDevices
      })

      toggleIsPostingDevices()
    } catch (error) {
      toggleIsPostingDevices()
      appContext.showPopup(error.message)
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
    toggleIsDownloading()
    try {
      let longestPath = 0
      triage.devices.forEach((device) => {
        device.paths.forEach((path) => {
          if (path.hops.length > longestPath) {
            longestPath = path.hops.length
          }
        })
      })

      const baseHeaderStyles = {
        font: { bold: true, color: { rgb: '000000' } },
        alignment: { horizontal: 'center', vertical: 'center' }
      }
      const hostStyles = {
        ...baseHeaderStyles,
        fill: { fgColor: { rgb: '3A5683' } }
      }
      const destStyles = {
        ...baseHeaderStyles,
        fill: { fgColor: { rgb: '4F6D7A' } }
      }
      const hopStytles = {
        ...baseHeaderStyles,
        fill: { fgColor: { rgb: 'EEB868' } }
      }

      const devicePromises = triage.devices.map(async (device) => {
        const deviceRows = []

        const deviceQuery = constructQueries(device.hostname, 'assetName')

        const sourceDeviceRes = await appContext.load(() =>
          findAllDevices(
            { queriesArr: deviceQuery },
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
          const destDeviceQuery = constructQueries(
            path.destHostname,
            'assetName'
          )

          const destDeviceRes = await appContext.load(() =>
            findAllDevices(
              { queriesArr: destDeviceQuery },
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
            path.port,
            path.isPortActive ? 'UP' : 'DOWN',
            ...hopsWithPadding,
            path.destHostname,
            destDeviceInfo?.assetTag || 'Not Found',
            path.destPort,
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

      const hopHeaders = []
      for (let i = 0; i < longestPath; i++) {
        hopHeaders.push({
          v: `Hop ${i + 1}`,
          t: 's',
          s: hopStytles
        })
      }

      const headers = [
        { v: 'Hostname', t: 's', s: hostStyles },
        { v: 'Asset Tag', t: 's', s: hostStyles },
        { v: 'Rack', t: 's', s: hostStyles },
        { v: 'Height', t: 's', s: hostStyles },
        { v: 'Port', t: 's', s: hostStyles },
        { v: 'Port Status', t: 's', s: hostStyles },
        ...hopHeaders,
        { v: 'Destination', t: 's', s: destStyles },
        { v: 'Asset Tag', t: 's', s: destStyles },
        { v: 'Port', t: 's', s: destStyles },
        { v: 'Port Status', t: 's', s: destStyles }
      ]

      const finalData = [headers, ...flattenedData]

      generateXlsxFile(triage.name, finalData)

      toggleIsDownloading()
    } catch (error) {
      toggleIsDownloading()
      appContext.showPopup('Failed to generate spreadsheet')
    }
  }

  const renameHandler = () => {
    setName(triage.name)
    toggleIsEditMode()
  }

  useEffect(() => {
    appContext.checkToken({ isCheckingExpired: true })

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
                  <SvgButton onClick={renameHandler} type="edit" />
                  <SvgButton
                    className="danger"
                    onClick={handleDelete}
                    type="delete"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {triage && (
          <div className="inputs">
            <form className="input-button-combine" onSubmit={onDeviceSubmit}>
              <textarea
                disabled={isPostingDevices ? true : false}
                onChange={handleTextDataChange}
                className="light"
                name="textData"
                id="textData"
                value={textData}
                required
                placeholder={`Paste hostname/s here...`}
              ></textarea>

              <button disabled={isPostingDevices ? true : false}>
                Add Device/s
              </button>
            </form>

            {!isDownloading ? (
              <button
                onClick={handleDownload}
                disabled={isPostingDevices ? true : false}
              >
                Download
              </button>
            ) : (
              <button disabled>Downloading...</button>
            )}
          </div>
        )}
      </header>

      {!isDownloading ? (
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
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}

export default TriageEdit

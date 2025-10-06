import './DeviceLookup.css'
import { useState, useRef, useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useToggle from '../../hooks/useToggle'
import { sleep } from '../../utils'
import { findAllDevices } from '../../services/tools'
import useFormState from '../../hooks/useFormState'
import Spreadsheet from '../Spreadsheet'
import LoadingIcon from '../LoadingIcon'

const DeviceLookup = () => {
  const headerTypes = {
    regular: [
      {
        header: 'Hostname',
        accessorKey: 'hostname'
      },
      { header: 'Asset Tag', accessorKey: 'assetTag' },
      { header: 'Serial #', accessorKey: 'serialNum' },
      { header: 'Rack', accessorKey: 'rack' },
      { header: 'Height', accessorKey: 'height' },
      { header: 'Status', accessorKey: 'status' },
      { header: 'GPC', accessorKey: 'gpc' },
      { header: 'Model', accessorKey: 'model' },
      { header: 'Inventory #', accessorKey: 'inventoryNum' }
    ],
    barcodes: [
      {
        header: 'Hostname',
        accessorKey: 'hostname'
      },
      { header: 'Rack', accessorKey: 'rack' },
      { header: 'Height', accessorKey: 'height' },
      { header: 'Serial #', accessorKey: 'serialNum' },
      { header: 'Asset Tag', accessorKey: 'assetTag' },
      { header: 'GPC', accessorKey: 'gpc' }
    ]
  }

  const appContext = useContext(AppContext)
  const [hosts, handleHostsChange] = useFormState('')
  const [type, handleTypeChange] = useFormState('regular')
  const [rowData, setRowData] = useState([])
  const [headers, setHeaders] = useState(headerTypes.regular)
  const [isCopyClick, toggleIsCopyClick] = useToggle(false)
  const tableRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const hostsArr = hosts.split('\n')

    const res = await appContext.load(() =>
      findAllDevices(hostsArr, appContext.auth.credentials)
    )

    if (res) {
      const rowHostnames = []
      res.devices.forEach((d) => {
        rowHostnames.push({
          hostname: d.info.hostname,
          assetTag: d.info.assetTag,
          inventoryNum: d.info.invNo,
          rack: d.info.deployment.rack,
          height: d.info.deployment.zPosition,
          status: d.info.subStatus,
          serialNum: d.info.serialNo,
          model: d.info.model,
          gpc: d.info.catalogID
        })
      })

      setRowData(rowHostnames)
    } else {
      appContext.showPopup("Couldn't find devices")
    }
  }

  const switchHeaders = (state) => {
    setHeaders(headerTypes[state])
  }

  const handleCopy = async () => {
    const tableHtml = tableRef.current.innerText

    navigator.clipboard.writeText(tableHtml)
    toggleIsCopyClick()
    await sleep(1000)
    toggleIsCopyClick()
  }

  return (
    <div className="DeviceLookup">
      <header>
        <h1>Device Lookup</h1>
      </header>

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {!appContext.isLoading ? (
            <button type="submit">Search</button>
          ) : (
            <button type="submit" disabled>
              Search
            </button>
          )}

          <textarea
            onChange={handleHostsChange}
            name="hostnames"
            id="hostnames"
            value={hosts}
            required
            placeholder="Paste hostnames here..."
          ></textarea>
        </form>

        <div className="spreadsheet-wrapper">
          {!appContext.isLoading ? (
            <div className="inputs">
              <select
                value={type}
                onChange={(event) => handleTypeChange(event, switchHeaders)}
              >
                <option value="regular">Regular</option>
                <option value="barcodes">Barcodes</option>
              </select>
              {rowData.length > 0 && (
                <button type="button" onClick={handleCopy}>
                  Copy
                </button>
              )}
            </div>
          ) : (
            <div className="inputs">
              <select
                disabled
                value={type}
                onChange={(event) => handleTypeChange(event, switchHeaders)}
              >
                <option value="regular">Regular</option>
                <option value="barcodes">Barcodes</option>
              </select>
              {rowData.length > 0 && (
                <button disabled type="button" onClick={handleCopy}>
                  Copy
                </button>
              )}
            </div>
          )}

          {!appContext.isLoading ? (
            <Spreadsheet
              rowData={rowData}
              columns={headers}
              tableRef={tableRef}
              isCopyClick={isCopyClick}
            />
          ) : (
            <LoadingIcon />
          )}
        </div>
      </div>
    </div>
  )
}

export default DeviceLookup

import './DeviceLookup.css'
import { useState, useRef, useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useToggle from '../../hooks/useToggle'
import { sleep } from '../../utils'
import { findAllDevices } from '../../services/tools'
import useFormState from '../../hooks/useFormState'
import Spreadsheet from '../Spreadsheet'

const DeviceLookup = () => {
  const headerTypes = {
    regular: [
      {
        header: 'Hostname',
        accessorKey: 'hostname'
      },
      { header: 'Asset Tag', accessorKey: 'assetTag' },
      { header: 'Serial #', accessorKey: 'serialNum' },
      { header: 'Inventory #', accessorKey: 'inventoryNum' },
      { header: 'Rack', accessorKey: 'rack' },
      { header: 'Height', accessorKey: 'height' },
      { header: 'Status', accessorKey: 'status' },
      { header: 'Model', accessorKey: 'model' },
      { header: 'GPC', accessorKey: 'gpc' }
    ],
    barcodes: [
      {
        header: 'Hostname',
        accessorKey: 'hostname'
      },
      { header: 'Asset Tag', accessorKey: 'assetTag' },
      { header: 'GPC', accessorKey: 'gpc' }
    ]
  }

  const appContext = useContext(AppContext)
  const [hosts, handleHostsChange] = useFormState('')
  const [type, handleTypeChange] = useFormState('regular')
  const [rowData, setRowData] = useState([])
  const [headers, setHeaders] = useState(headerTypes[type])
  const [isCopyClick, toggleIsCopyClick] = useToggle(false)
  const tableRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const hostsArr = hosts.split('\n')

    const res = await appContext.load(() => findAllDevices(hostsArr))

    console.log(res)

    const rowHostnames = []
    hostsArr.forEach((h) => {
      rowHostnames.push({ hostname: h })
    })

    setRowData(rowHostnames)
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
          <button type="submit">Search</button>

          <textarea
            onChange={handleHostsChange}
            name="hostnames"
            id="hostnames"
            value={hosts}
            required
            placeholder="Paste hostnames here..."
          ></textarea>
        </form>

        <div>
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
          <Spreadsheet
            rowData={rowData}
            columns={headers}
            tableRef={tableRef}
            isCopyClick={isCopyClick}
          />
        </div>
      </div>
    </div>
  )
}

export default DeviceLookup

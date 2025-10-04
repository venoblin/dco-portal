import './DeviceLookup.css'
import { useState } from 'react'
import Spreadsheet from '../Spreadsheet'
import useFormState from '../../hooks/useFormState'

const DeviceLookup = () => {
  const [hosts, onHostsChange] = useFormState('')
  const [rowData, setRowData] = useState([])
  const [headers, setHeaders] = useState([
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
  ])

  const handleSubmit = (event) => {
    event.preventDefault()
    const hostsArr = hosts.split('\n')

    const rowHostnames = []
    hostsArr.forEach((h) => {
      rowHostnames.push({ hostname: h })
    })

    setRowData(rowHostnames)
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
            onChange={onHostsChange}
            name="hostnames"
            id="hostnames"
            value={hosts}
            required
            placeholder="Paste hostnames here..."
          ></textarea>
        </form>

        <div>
          <div className="inputs">
            <select>
              <option>Regular</option>
              <option>Barcodes</option>
            </select>
            {rowData.length > 0 && <button type="button">Copy</button>}
          </div>
          <Spreadsheet rowData={rowData} columns={headers} />
        </div>
      </div>
    </div>
  )
}

export default DeviceLookup

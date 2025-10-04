import './DeviceLookup.css'
import { useState } from 'react'
import Spreadsheet from '../Spreadsheet'
import useFormState from '../../hooks/useFormState'

const DeviceLookup = () => {
  const [hosts, onHostsChange] = useFormState('')

  const [rowData, setRowData] = useState([])

  const [headers, setHeaders] = useState([{ field: 'hostname' }])

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

        <Spreadsheet headers={headers} rowData={rowData} />
      </div>
    </div>
  )
}

export default DeviceLookup

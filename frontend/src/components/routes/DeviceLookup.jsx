import './DeviceLookup.css'
import { useState } from 'react'
import Spreadsheet from '../Spreadsheet'
import useFormState from '../../hooks/useFormState'

const DeviceLookup = () => {
  const [hosts, onHostsChange] = useFormState('')
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false }
  ])

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' }
  ])

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(hosts)
  }

  return (
    <div className="DeviceLookup">
      <header>
        <h1>Device Lookup</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Search</button>

          <textarea
            onChange={onHostsChange}
            name="hostnames"
            id="hostnames"
            value={hosts}
            required
          ></textarea>
        </form>
      </div>
    </div>
  )
}

export default DeviceLookup

import './IncidentManager.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { uploadCsv } from '../../services/tools'
import { storageSet, storageGet } from '../../utils/localStorage'
import Panel from '../ui/Panel'
import IncidentCard from '../IncidentCard'
import Search from '../Search'

const IncidentManager = () => {
  const appContext = useContext(AppContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const [incidents, setIncidents] = useState(null)

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    try {
      if (selectedFile.type !== 'text/csv') {
        throw new Error('File is not a CSV file')
      }

      const formData = new FormData()
      formData.append('csvFile', selectedFile)

      const res = await uploadCsv(formData)

      setIncidents(res.data)
      storageSet('incidents', res.data)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const onSearch = (search, filter) => {
    let searchedIncidents

    if (search !== '') {
      searchedIncidents = incidents.filter((i) =>
        i[filter].toLowerCase().includes(search.toLowerCase())
      )
      setIncidents(searchedIncidents)
    } else {
      populateIncidents()
    }
  }

  const populateIncidents = () => {
    const items = storageGet('incidents')

    if (items) {
      setIncidents(items)
    }
  }

  useEffect(() => {
    populateIncidents()
  }, [])

  return (
    <div className="IncidentManager">
      <header>
        <div>
          <h1>Incident Manager</h1>
        </div>

        <div className="filter-wrap">
          <Search onSearch={onSearch} filters={['assigned_to', 'incident']} />
        </div>

        <div>
          <div className="file-wrap">
            <label htmlFor="file" className="file-label">
              Select CSV File
            </label>
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <p className="muted-text">No file selected</p>
            )}
            <input
              id="file"
              type="file"
              onChange={onFileChange}
              accept=".csv"
            />
          </div>
          <button onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </button>
        </div>
      </header>

      <Panel>
        {incidents && incidents.length > 0 ? (
          incidents.map((i, idx) => <IncidentCard key={idx} incident={i} />)
        ) : (
          <p>There are no incidents!</p>
        )}
      </Panel>
    </div>
  )
}

export default IncidentManager

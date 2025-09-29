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
  const [searchedIncidents, setSearchedIncidents] = useState(null)
  const [checkedIncidents, setCheckedIncidents] = useState([])

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
      storageSet('incidents-file-name', selectedFile.name)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const onSearch = (search, filter) => {
    if (search !== '') {
      const searchedIncidents = incidents.filter((i) =>
        i[filter].toLowerCase().includes(search.toLowerCase())
      )
      setSearchedIncidents(searchedIncidents)
    } else {
      setSearchedIncidents(null)
    }
  }

  const onCheck = (incident, isChecked) => {
    if (isChecked) {
      setCheckedIncidents([...checkedIncidents, incident])
    } else {
      const updated = checkedIncidents.filter(
        (i) => i.number !== incident.number
      )

      setCheckedIncidents([...updated])
    }
  }

  const populateIncidents = () => {
    const items = storageGet('incidents')

    if (items) {
      setIncidents(items)
    }
  }

  const populateSelectedFile = () => {
    const name = storageGet('incidents-file-name')

    if (name) {
      setSelectedFile({ name: name })
    }
  }

  useEffect(() => {
    populateIncidents()
    populateSelectedFile()
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
        {incidents && incidents.length > 0 && !searchedIncidents ? (
          incidents.map((i, idx) => (
            <IncidentCard key={idx} incident={i} onCheck={onCheck} />
          ))
        ) : searchedIncidents && searchedIncidents.length > 0 ? (
          searchedIncidents.map((i, idx) => (
            <IncidentCard key={idx} incident={i} onCheck={onCheck} />
          ))
        ) : (
          <p>There are no incidents!</p>
        )}
      </Panel>
    </div>
  )
}

export default IncidentManager

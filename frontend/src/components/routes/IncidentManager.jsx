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
  const [allIncidents, setAllIncidents] = useState(null)
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

      let incidents = []
      res.data.forEach((incident) => {
        incidents.push({ ...incident, isChecked: false })
      })

      setAllIncidents(incidents)
      storageSet('incidents', incidents)
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

  const onCheckChange = (event, incident) => {
    let updatedIncidents = [...allIncidents]

    updatedIncidents.forEach((i) => {
      if (i.number === incident.number) {
        i.isChecked = event.target.checked
        return
      }
    })

    setAllIncidents(updatedIncidents)
  }

  const populateIncidents = () => {
    const items = storageGet('incidents')

    if (items) {
      setAllIncidents(items)
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
          {checkedIncidents.length > 0 ? (
            <div className="selection">
              <div className="inputs">
                <button>De-Select All</button>
                <button>Print All</button>
              </div>
              <p>Selected Incidents: {checkedIncidents.length}</p>
            </div>
          ) : (
            <Search onSearch={onSearch} filters={['assigned_to', 'incident']} />
          )}
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
        {allIncidents && allIncidents.length > 0 && !searchedIncidents ? (
          allIncidents.map((i, idx) => (
            <IncidentCard
              key={idx}
              incident={i}
              onCheckChange={onCheckChange}
            />
          ))
        ) : searchedIncidents && searchedIncidents.length > 0 ? (
          searchedIncidents.map((i, idx) => (
            <IncidentCard
              key={idx}
              incident={i}
              onCheckChange={onCheckChange}
            />
          ))
        ) : (
          <p>There are no incidents!</p>
        )}
      </Panel>
    </div>
  )
}

export default IncidentManager

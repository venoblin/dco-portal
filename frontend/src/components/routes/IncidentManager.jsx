import './IncidentManager.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { uploadCsv } from '../../services/tools'
import { storageSet, storageGet } from '../../utils/localStorage'
import Panel from '../ui/Panel'
import IncidentCard from '../IncidentCard'

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

  const checkOnMount = () => {
    const items = storageGet('incidents')

    if (items) {
      setIncidents(items)
    }
  }

  useEffect(() => {
    checkOnMount()
  }, [])

  return (
    <div className="IncidentManager">
      <header>
        <div>
          <h1>Incident Manager</h1>
        </div>

        <div>
          <div className="file-wrap">
            <label htmlFor="file" className="file-label">
              Select CSV File
            </label>
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <p>No file selected</p>
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
        {incidents ? (
          incidents.map((i, idx) => <IncidentCard key={idx} incident={i} />)
        ) : (
          <p>There are no incidents!</p>
        )}
      </Panel>
    </div>
  )
}

export default IncidentManager

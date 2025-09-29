import { useContext, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { uploadCsv } from '../../services/tools'

const IncidentManager = () => {
  const appContext = useContext(AppContext)
  const [selectedFile, setSelectedFile] = useState(null)

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

      console.log(res)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  return (
    <div>
      <header>
        <div>
          <h1>Incident Manager</h1>
        </div>

        <div>
          <input type="file" onChange={onFileChange} accept=".csv" />
          <button onClick={handleUpload} disabled={!selectedFile}>
            Upload File
          </button>
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
      </header>
    </div>
  )
}

export default IncidentManager

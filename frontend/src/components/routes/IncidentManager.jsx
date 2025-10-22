import './IncidentManager.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { uploadCsv } from '../../services/tools'
import { storageSet, storageGet, storageRemove } from '../../utils/localStorage'
import Panel from '../ui/Panel'
import IncidentCard from '../IncidentCard'
import Search from '../Search'
import IncidentPrint from '../IncidentPrint'
import LoadingIcon from '../LoadingIcon'
import Print from '../Print'

const IncidentManager = () => {
  const appContext = useContext(AppContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const [allIncidents, setAllIncidents] = useState([])
  const [checkedIncidents, setCheckedIncidents] = useState([])
  const [toPrint, setToPrint] = useState([])
  const [search, setSearch] = useState('')

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (storageGet('incidents')) {
      storageRemove('incidents')
    }

    try {
      if (selectedFile.type !== 'text/csv') {
        throw new Error('File is not a CSV file')
      }

      const formData = new FormData()
      formData.append('csvFile', selectedFile)

      const res = await appContext.load(() =>
        uploadCsv(formData, appContext.auth.credentials)
      )

      let incidents = []
      res.incidents.forEach((incident) => {
        incidents.push({ ...incident, isChecked: false })
      })

      setAllIncidents(incidents)
      storageSet('incidents', incidents)
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const onSearch = (search, filter) => {
    setSearch(search)

    if (allIncidents && checkedIncidents) {
      deselectAllIncidents()
    }

    if (search !== '') {
      const items = storageGet('incidents')

      if (items) {
        const searchedIncidents = items.filter((i) =>
          i[filter].toLowerCase().includes(search.toLowerCase())
        )
        setAllIncidents(searchedIncidents)
      }
    } else {
      populateIncidents()
    }
  }

  const onCheckChange = (event, incident) => {
    let updatedIncidents = [...allIncidents]
    updatedIncidents.forEach((i) => {
      if (i.number === incident.number) {
        i.isChecked = event.target.checked

        let updatedCheckedIncidents = [...checkedIncidents]
        if (event.target.checked) {
          updatedCheckedIncidents.push(incident)
        } else {
          updatedCheckedIncidents = updatedCheckedIncidents.filter(
            (i) => i.number !== incident.number
          )
        }

        setCheckedIncidents(updatedCheckedIncidents)

        return
      }
    })

    setAllIncidents(updatedIncidents)
  }

  const selectAllIncidents = () => {
    let updatedIncidents = [...allIncidents]

    updatedIncidents.forEach((i) => {
      i.isChecked = true
    })

    setCheckedIncidents(updatedIncidents)
    setAllIncidents(updatedIncidents)
  }

  const deselectAllIncidents = () => {
    let updatedIncidents = [...allIncidents]

    updatedIncidents.forEach((i) => {
      i.isChecked = false
    })

    setCheckedIncidents([])
    setAllIncidents(updatedIncidents)
  }

  const populateIncidents = () => {
    const items = storageGet('incidents')

    if (items) {
      setAllIncidents(items)
    }
  }

  const printSingle = (incident) => {
    setToPrint([incident])
  }

  const printAll = () => {
    setToPrint([...checkedIncidents])
  }

  useEffect(() => {
    appContext.checkToken({ isCheckingExpired: true })

    if (search === '') {
      populateIncidents()
    }

    if (toPrint.length > 0) {
      window.print()

      if (checkedIncidents.length > 0) deselectAllIncidents()
    }
  }, [toPrint])

  return (
    <div className="IncidentManager">
      <header>
        <div>
          <h1>Incident Manager</h1>
        </div>

        {storageGet('incidents') && (
          <div className="filter-wrap">
            {checkedIncidents && checkedIncidents.length > 0 ? (
              <div className="selection">
                <div className="inputs">
                  <button onClick={selectAllIncidents}>Select All</button>
                  <button onClick={deselectAllIncidents}>{`De-Select${
                    checkedIncidents.length > 1 ? ' All' : ''
                  }`}</button>
                  <button onClick={printAll}>{`Print${
                    checkedIncidents.length > 1 ? ' All' : ''
                  }`}</button>
                </div>
                <p>
                  <span className="muted-text">Selected Incidents:</span>{' '}
                  {checkedIncidents.length}
                </p>
              </div>
            ) : (
              <Search
                onSearch={onSearch}
                filters={['assigned_to', 'incident']}
              />
            )}
          </div>
        )}

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

      {!appContext.isLoading ? (
        <Panel>
          {allIncidents && allIncidents.length > 0 ? (
            allIncidents.map((i) => (
              <IncidentCard
                key={i.number}
                incident={i}
                onPrint={printSingle}
                onCheckChange={onCheckChange}
              />
            ))
          ) : (
            <p>There are no incidents!</p>
          )}
        </Panel>
      ) : (
        <LoadingIcon />
      )}

      {/* Only renders when printing */}
      <Print isHidden={true}>
        {toPrint &&
          toPrint.length > 0 &&
          toPrint.map((i) => <IncidentPrint key={i.number} incident={i} />)}
      </Print>
    </div>
  )
}

export default IncidentManager

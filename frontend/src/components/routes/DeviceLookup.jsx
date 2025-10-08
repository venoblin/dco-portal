import './DeviceLookup.css'
import { useState, useRef, useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { flexRender } from '@tanstack/react-table'
import useToggle from '../../hooks/useToggle'
import { sleep } from '../../utils'
import { findAllDevices } from '../../services/tools'
import useFormState from '../../hooks/useFormState'
import Spreadsheet from '../Spreadsheet'
import LoadingIcon from '../LoadingIcon'
import Barcode from '../Barcode'
import Print from '../Print'
import { storageGet, storageSet } from '../../utils/localStorage'

const DeviceLookup = () => {
  const headerTypes = {
    regular: [
      {
        header: 'Hostname',
        accessorKey: 'hostname'
      },
      { header: 'Asset Tag', accessorKey: 'assetTag' },
      { header: 'Serial #', accessorKey: 'serialNum' },
      { header: 'Rack', accessorKey: 'rack' },
      { header: 'Height', accessorKey: 'height' },
      { header: 'Status', accessorKey: 'status' },
      { header: 'GPC', accessorKey: 'gpc' },
      { header: 'Model', accessorKey: 'model' },
      { header: 'Inventory #', accessorKey: 'inventoryNum' }
    ],
    barcodes: [
      {
        header: 'Hostname',
        accessorKey: 'hostname'
      },
      {
        header: 'Asset Tag',
        accessorKey: 'assetTagBarcode',
        cell: (info) => flexRender(Barcode, { value: info.getValue() })
      },
      { header: 'Rack', accessorKey: 'rack' },
      { header: 'Height', accessorKey: 'height' },
      { header: 'Serial #', accessorKey: 'serialNum' },
      {
        header: 'GPC',
        accessorKey: 'gpcBarcode',
        cell: (info) => flexRender(Barcode, { value: info.getValue() })
      },
      { header: 'Status', accessorKey: 'status' }
    ]
  }

  const appContext = useContext(AppContext)
  const [textData, handleTextDataChange, setTextData] = useFormState('')
  const [type, handleTypeChange] = useFormState('regular')
  const [rowData, setRowData] = useState([])
  const [headers, setHeaders] = useState(headerTypes.regular)
  const [isCopyClick, toggleIsCopyClick] = useToggle(false)
  const [isPrinting, toggleIsPrinting] = useToggle(false)
  const [searchType, handleSearchTypeChange, setSearchType] =
    useFormState('assetName')
  const tableRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dataArr = textData.split('\n')
      const cleanedArr = dataArr.filter((data) => data !== '')

      const queries = cleanedArr.map((data) => {
        if (data !== '') {
          const newQuery = {}
          newQuery[searchType] = data

          return newQuery
        }
      })

      const res = await appContext.load(() =>
        findAllDevices({ queriesArr: queries }, appContext.auth.credentials)
      )

      if (res) {
        const devicesData = []
        res.devices.forEach((d) => {
          devicesData.push({
            hostname: d.info.assetName ? d.info.assetName : 'Not Found',
            assetTag: d.info.assetTag ? d.info.assetTag : 'Not Found',
            inventoryNum: d.info.invNo ? d.info.invNo : 'Not Found',
            rack: d.info.deployment.rack ? d.info.deployment.rack : 'Not Found',
            height: d.info.deployment.zPosition
              ? d.info.deployment.zPosition
              : 'Not Found',
            status: d.info.subStatus ? d.info.subStatus : 'Not Found',
            serialNum: d.info.serialNo ? d.info.serialNo : 'Not Found',
            model: d.info.model ? d.info.model : 'Not Found',
            gpc: d.info.catalogID ? d.info.catalogID : 'Not Found',
            assetTagBarcode: d.info.assetTag ? d.info.assetTag : 'Not Found',
            gpcBarcode: d.info.catalogID ? d.info.catalogID : 'Not Found'
          })
        })

        storageSet('devicesLookup', devicesData)
        setRowData(devicesData)
      } else {
        appContext.showPopup("Couldn't find devices")
      }
    } catch {
      appContext.showPopup(`Couln't find devices by ${searchType}`)
    }
  }

  const switchHeaders = (newHeader) => {
    setHeaders(headerTypes[newHeader])
  }

  const switchSearchType = (newSearchType) => {
    setTextData('')
    storageSet('deviceLookupSearchType', newSearchType)
  }

  const handleCopy = async () => {
    const tableHtml = tableRef.current.innerText

    navigator.clipboard.writeText(tableHtml)
    toggleIsCopyClick()
    await sleep(1000)
    toggleIsCopyClick()
  }

  const handlePrint = () => {
    toggleIsPrinting()
  }

  const checkSearchType = () => {
    const searchType = storageGet('deviceLookupSearchType')

    if (searchType) {
      setSearchType(searchType)
    }
  }

  const checkDevices = () => {
    const devices = storageGet('devicesLookup')

    if (devices) {
      setRowData(devices)
    }
  }

  const getCurrentSearchTypeName = () => {
    switch (searchType) {
      case 'assetName':
        return 'hostnames'
        break
      case 'assetTag':
        return 'asset tags'
        break
    }
  }

  useEffect(() => {
    checkDevices()
    checkSearchType()

    if (isPrinting) {
      window.print()

      toggleIsPrinting()
    }
  }, [isPrinting])

  return (
    <div className="DeviceLookup">
      <header>
        <h1>Device Lookup</h1>
      </header>

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {!appContext.isLoading ? (
            <div className="inputs">
              <select
                value={searchType}
                onChange={(event) =>
                  handleSearchTypeChange(event, switchSearchType)
                }
              >
                <option value="assetName">By Hostname</option>
                <option value="assetTag">By Asset Tag</option>
              </select>
              <button type="submit">Search</button>
            </div>
          ) : (
            <div className="inputs">
              <select
                disabled
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                <option value="assetName">By Hostname</option>
                <option value="assetTag">By Asset Tag</option>
              </select>
              <button disabled type="submit">
                Search
              </button>
            </div>
          )}

          <textarea
            onChange={handleTextDataChange}
            name="textData"
            id="textData"
            value={textData}
            required
            placeholder={`Paste ${getCurrentSearchTypeName()} here...`}
          ></textarea>
        </form>

        <div className="spreadsheet-wrapper">
          {!appContext.isLoading ? (
            <div className="inputs">
              <select
                value={type}
                onChange={(event) => handleTypeChange(event, switchHeaders)}
              >
                <option value="regular">Regular</option>
                <option value="barcodes">Barcodes</option>
              </select>
              {rowData.length > 0 && (
                <div>
                  <button type="button" onClick={handlePrint}>
                    Print
                  </button>

                  {type !== 'barcodes' && (
                    <button type="button" onClick={handleCopy}>
                      Copy
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="inputs">
              <select
                disabled
                value={type}
                onChange={(event) => handleTypeChange(event, switchHeaders)}
              >
                <option value="regular">Regular</option>
                <option value="barcodes">Barcodes</option>
              </select>
              {rowData.length > 0 && (
                <div>
                  <button type="button" onClick={handlePrint}>
                    Print
                  </button>

                  {type !== 'barcodes' && (
                    <button type="button" onClick={handleCopy}>
                      Copy
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {!appContext.isLoading ? (
            <Print isNoPadding={true}>
              <Spreadsheet
                className={rowData.length === 0 ? 'disabled' : ''}
                rowData={rowData}
                columns={headers}
                tableRef={tableRef}
                isCopyClick={isCopyClick}
              />
            </Print>
          ) : (
            <LoadingIcon />
          )}
        </div>
      </div>
    </div>
  )
}

export default DeviceLookup

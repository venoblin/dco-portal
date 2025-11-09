import './DeviceLookup.css'
import { useState, useRef, useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { flexRender } from '@tanstack/react-table'
import useToggle from '../../hooks/useToggle'
import { constructQueries, sleep } from '../../utils'
import { findAllDevices } from '../../services/tools'
import useFormState from '../../hooks/useFormState'
import SpreadsheetGrid from '../SpreadsheetGrid'
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
  const [isPrinting, toggleIsPrinting] = useToggle(false)
  const [searchType, handleSearchTypeChange, setSearchType] =
    useFormState('assetName')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const queries = constructQueries(textData, searchType)

      const res = await appContext.load(() =>
        findAllDevices({ queriesArr: queries }, appContext.auth.credentials)
      )

      if (res) {
        const devicesData = []
        res.devices.forEach((d) => {
          devicesData.push({
            hostname: d.info.assetName,
            assetTag: d.info.assetTag,
            inventoryNum: d.info.invNo,
            rack: d.info.deployment.rack,
            height: d.info.deployment.zPosition,
            status: d.info.subStatus,
            serialNum: d.info.serialNo,
            model: d.info.model,
            gpc: d.info.catalogID,
            assetTagBarcode: d.info.assetTag,
            gpcBarcode: d.info.catalogID
          })
        })

        storageSet('devicesLookup', devicesData)
        setRowData(devicesData)
      } else {
        throw new Error("Couldn't find devices")
      }
    } catch (error) {
      appContext.showPopup(error.message)
    }
  }

  const switchHeaders = (newHeader) => {
    setHeaders(headerTypes[newHeader])
  }

  const switchSearchType = (newSearchType) => {
    setTextData('')
    storageSet('deviceLookupSearchType', newSearchType)
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
        return 'hostname/s'
        break
      case 'assetTag':
        return 'asset tag/s'
        break
    }
  }

  useEffect(() => {
    appContext.checkToken({ isCheckingExpired: true })

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
          <div className="inputs">
            <select
              disabled={appContext.isLoading ? true : false}
              value={searchType}
              onChange={(event) =>
                handleSearchTypeChange(event, switchSearchType)
              }
            >
              <option value="assetName">By Hostname</option>
              <option value="assetTag">By Asset Tag</option>
            </select>
            <button
              type="submit"
              disabled={appContext.isLoading ? true : false}
            >
              Search
            </button>
          </div>

          <textarea
            disabled={appContext.isLoading ? true : false}
            onChange={handleTextDataChange}
            className="light"
            name="textData"
            id="textData"
            value={textData}
            required
            placeholder={`Paste ${getCurrentSearchTypeName()} here...`}
          ></textarea>
        </form>

        <div className="spreadsheet-wrapper">
          <div className="inputs">
            <select
              disabled={appContext.isLoading ? true : false}
              value={type}
              onChange={(event) => handleTypeChange(event, switchHeaders)}
            >
              <option value="regular">Regular</option>
              <option value="barcodes">Barcodes</option>
            </select>
            {rowData.length > 0 && (
              <div className="btns-wrap">
                <button type="button" onClick={handlePrint}>
                  Print
                </button>
              </div>
            )}
          </div>

          {!appContext.isLoading ? (
            <Print isNoPadding={true}>
              <SpreadsheetGrid
                className={rowData.length === 0 ? 'disabled' : ''}
                rowData={rowData}
                columns={headers}
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

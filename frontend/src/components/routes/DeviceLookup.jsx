import './DeviceLookup.css'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useToggle from '../../hooks/useToggle'
import { constructQueries, sleep } from '../../utils'
import { findAllDevices } from '../../services/tools'
import useFormState from '../../hooks/useFormState'
import SpreadsheetGrid from '../SpreadsheetGrid'
import LoadingIcon from '../LoadingIcon'
import Print from '../Print'
import { storageGet, storageSet } from '../../utils/localStorage'

const DeviceLookup = () => {
  const headerTypes = {
    regular: [
      { value: 'Hostname', identifier: 'hostname' },
      { value: 'Asset Tag', identifier: 'assetTag' },
      { value: 'Serial #', identifier: 'serialNum' },
      { value: 'Rack', identifier: 'rack' },
      { value: 'Height', identifier: 'height' },
      { value: 'Status', identifier: 'status' },
      { value: 'GPC', identifier: 'gpc' },
      { value: 'Model', identifier: 'model' },
      { value: 'Inventory #', identifier: 'inventoryNum' }
    ],
    barcodes: [
      { value: 'Hostname', identifier: 'hostname' },
      { value: 'Asset Tag', identifier: 'assetTagBarcode' },
      { value: 'Rack', identifier: 'rack' },
      { value: 'Height', identifier: 'height' },
      { value: 'Serial #', identifier: 'serialNum' },
      { value: 'GPC', identifier: 'gpcBarcode' },
      { value: 'Status', identifier: 'status' }
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
          // devicesData.push({
          //   hostname: d.info.assetName,
          //   assetTag: d.info.assetTag,
          //   inventoryNum: d.info.invNo,
          //   rack: d.info.deployment.rack,
          //   height: d.info.deployment.zPosition,
          //   status: d.info.subStatus,
          //   serialNum: d.info.serialNo,
          //   model: d.info.model,
          //   gpc: d.info.catalogID,
          //   assetTagBarcode: d.info.assetTag,
          //   gpcBarcode: d.info.catalogID
          // })
          devicesData.push({
            hostname: 'assetName',
            assetTag: 'assetTag',
            inventoryNum: 'invNo',
            rack: 'rack',
            height: 'height',
            status: 'subStatus',
            serialNum: 'serialNo',
            model: 'model',
            gpc: 'catalogID',
            assetTagBarcode: 'assetTagBarcode',
            gpcBarcode: 'gpcBarcode'
          })
        })

        storageSet('devicesLookup', devicesData)
        setRowData(devicesData)
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

                {type !== 'barcodes' && (
                  <div className="btns">
                    <button type="button" onClick={handleCopy}>
                      Copy
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {!appContext.isLoading ? (
            <Print isNoPadding={true}>
              <SpreadsheetGrid
                className={rowData.length === 0 ? 'disabled' : ''}
                data={rowData}
                headers={headers}
                isCopyClick={isCopyClick}
                readOnly={true}
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

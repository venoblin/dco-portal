import './SpreadsheetGrid.css'
import { Spreadsheet } from 'react-spreadsheet'
import { useMemo, useState } from 'react'
import Barcode from './Barcode'

const SpreadsheetGrid = (props) => {
  if (!props.data) {
    return null
  }

  const [selected, setSelected] = useState([])

  const classes = `SpreadsheetGrid to-print light${
    props.isCopyClick ? ' copied' : ''
  } ${props.className ? props.className : ''}`

  const CustomDataViewer = (dataViewerProps) => {
    const { cell, evaluatedCell } = dataViewerProps
    const cellData = cell || evaluatedCell

    const isBarcodeCell = cellData?.identifier && cellData.identifier.toLowerCase().includes('barcode')

    if (isBarcodeCell && cellData?.value && cellData.value !== 'Not Found') {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '2px 0'
        }}>
          <Barcode value={cellData.value} />
        </div>
      )
    }

    return <div style={{ padding: '4px' }}>{cellData?.value}</div>
  }

  const data = useMemo(() => {
    if (!props.headers || !Array.isArray(props.headers)) {
      let cleanedData = []
      if (props.data && Array.isArray(props.data) && props.data.length > 0) {
        cleanedData = props.data.map((row) => {
          if (!Array.isArray(row)) {
            if (typeof row === 'object' && row !== null) {
              return Object.keys(row).map((key) => ({
                value: row[key],
                identifier: key,
                readOnly: !!props.readOnly,
                className: 'cell'
              }))
            }
            return []
          }
          return row.map((item) => ({
            value: item,
            readOnly: !!props.readOnly,
            className: 'cell'
          }))
        })
      }
      return cleanedData
    }

    const headerMap = new Map()
    props.headers.forEach((header, index) => {
      headerMap.set(header.identifier, {
        index,
        value: header.value,
        readOnly: true,
        className: 'header-cell'
      })
    })

    const processedData = props.data.map((row) => {
      const newRow = Array(props.headers.length)
        .fill(null)
        .map(() => ({
          value: 'Not Found',
          readOnly: !!props.readOnly,
          className: 'cell not-found'
        }))

      if (Array.isArray(row)) {
        row.forEach((cell) => {
          if (cell && cell.identifier) {
            const headerInfo = headerMap.get(cell.identifier)
            if (headerInfo) {
              newRow[headerInfo.index] = {
                value: cell.value,
                identifier: cell.identifier,
                readOnly: !!props.readOnly,
                className: 'cell'
              }
            }
          }
        })
      } else if (typeof row === 'object' && row !== null) {
        Object.entries(row).forEach(([identifier, value]) => {
          const headerInfo = headerMap.get(identifier)
          if (headerInfo) {
            newRow[headerInfo.index] = {
              value: value,
              identifier: identifier,
              readOnly: !!props.readOnly,
              className: 'cell'
            }
          }
        })
      }

      return newRow
    })

    return processedData
  }, [props.headers, props.data, props.readOnly])

  const columnLabels = useMemo(() => {
    if (!props.headers || !Array.isArray(props.headers)) return undefined
    return props.headers.map(header => header.value)
  }, [props.headers])

  return (
    <div className={classes}>
      <Spreadsheet
        data={data}
        onSelect={setSelected}
        DataViewer={CustomDataViewer}
        columnLabels={columnLabels}
      />
    </div>
  )
}

export default SpreadsheetGrid

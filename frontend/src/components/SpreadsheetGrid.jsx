import './SpreadsheetGrid.css'
import { Spreadsheet } from 'react-spreadsheet'
import { useMemo, useState } from 'react'

const SpreadsheetGrid = (props) => {
  if (!props.data) {
    return null
  }

  const [selected, setSelected] = useState([])

  const classes = `SpreadsheetGrid to-print light${
    props.isCopyClick ? ' copied' : ''
  } ${props.className ? props.className : ''}`

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

    const headerRow = props.headers.map((header) => ({
      value: header.value,
      readOnly: true,
      className: 'header-cell'
    }))

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
              readOnly: !!props.readOnly,
              className: 'cell'
            }
          }
        })
      }

      return newRow
    })

    return [headerRow, ...processedData]
  }, [props.headers, props.data, props.readOnly])

  return (
    <div className={classes}>
      <Spreadsheet data={data} onSelect={setSelected} />
    </div>
  )
}

export default SpreadsheetGrid

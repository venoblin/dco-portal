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
    let cleanedData = []

    if (props.data && Array.isArray(props.data) && props.data.length > 0) {
      cleanedData = props.data.map((row) => {
        if (!Array.isArray(row)) {
          if (typeof row === 'object' && row !== null) {
            return Object.values(row).map((item) => ({
              value: item,
              readOnly: !!props.readOnly,
              className: 'header-cell'
            }))
          }
          return []
        }

        return row.map((item) => ({
          value: item,
          readOnly: !!props.readOnly,
          className: 'header-cell'
        }))
      })
    }

    if (props.headers && Array.isArray(props.headers)) {
      const cleanedHeaders = props.headers.map((h) => ({
        value: h,
        readOnly: true,
        className: 'header-cell'
      }))
      return [cleanedHeaders, ...cleanedData]
    }

    return cleanedData
  }, [props.headers, props.data, props.readOnly])

  return (
    <div className={classes}>
      <Spreadsheet data={data} onSelect={setSelected} />
    </div>
  )
}

export default SpreadsheetGrid

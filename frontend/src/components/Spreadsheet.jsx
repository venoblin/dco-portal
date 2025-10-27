import { Spreadsheet as ReactSpreadsheet } from 'react-spreadsheet'
import { useEffect, useState } from 'react'

const Spreadsheet = (props) => {
  if (!props.data) {
    return null
  }

  const [data, setData] = useState([])
  const [selected, setSelected] = useState([])

  const classes = `Spreadsheet to-print light${
    props.isCopyClick ? ' copied' : ''
  } ${props.className ? props.className : ''}`

  useEffect(() => {
    let cleanedData = []

    if (props.data.length > 0) {
      cleanedData = props.data.map((row) => {
        const cleanedRow = row.map((item) => {
          return {
            value: item,
            readOnly: props.readOnly ? true : false,
            className: 'header-cell'
          }
        })

        return cleanedRow
      })

      setData([...cleanedData])
    }

    if (props.headers) {
      const cleanedHeaders = props.headers.map((h) => {
        return {
          value: h,
          readOnly: true,
          className: 'header-cell'
        }
      })

      setData([cleanedHeaders, ...cleanedData])
    }

    console.log('hi')
  }, [])

  return (
    <div className={classes}>
      <ReactSpreadsheet data={data} onChange={setData} onSelect={setSelected} />
    </div>
  )
}

export default Spreadsheet

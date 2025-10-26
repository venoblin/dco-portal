import { Spreadsheet as ReactSpreadsheet } from 'react-spreadsheet'
import { useEffect, useState } from 'react'

const Spreadsheet = (props) => {
  if (!props.data) {
    return null
  }

  const [data, setData] = useState(props.data)

  const classes = `Spreadsheet to-print light${
    props.isCopyClick ? ' copied' : ''
  } ${props.className ? props.className : ''}`

  const [selected, setSelected] = useState([])

  return (
    <div className={classes}>
      <ReactSpreadsheet data={data} onChange={setData} onSelect={setSelected} />
    </div>
  )
}

export default Spreadsheet

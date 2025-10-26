import { Spreadsheet as ReactSpreadsheet } from 'react-spreadsheet'
import { useState } from 'react'

const Spreadsheet = (props) => {
  const [data, setData] = useState([
    [{ value: 'A1' }, { value: 'B1' }],
    [{ value: 'A2' }, { value: 'B2' }]
  ])

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

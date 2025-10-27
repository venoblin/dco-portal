import { Spreadsheet as ReactSpreadsheet } from 'react-spreadsheet'
import { useEffect, useState } from 'react'

const Spreadsheet = (props) => {
  if (!props.data) {
    return null
  }

  const [data, setData] = useState(props.data)
  const [selected, setSelected] = useState([])

  const classes = `Spreadsheet to-print light${
    props.isCopyClick ? ' copied' : ''
  } ${props.className ? props.className : ''}`

  useEffect(() => {
    if (props.headers) {
      setData([props.header, ...props.data])
    }
  }, [])

  return (
    <div className={classes}>
      <ReactSpreadsheet data={data} onChange={setData} onSelect={setSelected} />
    </div>
  )
}

export default Spreadsheet

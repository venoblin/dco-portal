import './Spreadsheet.css'

const Spreadsheet = (props) => {
  if (!props.rowData) {
    return null
  }

  return (
    <div className={`Spreadsheet${props.isCopyClick ? ' copied' : ''}`}>
      <table ref={props.tableRef}>
        {props.isCopyClick === true && (
          <div className="copy-msg">Successfully copied!</div>
        )}

        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>

      {props.rowData.length === 0 && (
        <p className="msg">No hostnames entered!</p>
      )}
    </div>
  )
}

export default Spreadsheet

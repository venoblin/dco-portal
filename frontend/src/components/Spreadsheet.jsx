import './Spreadsheet.css'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

const Spreadsheet = (props) => {
  if (!props.rowData) {
    return null
  }

  const table = useReactTable({
    data: props.rowData,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <div className={`Spreadsheet${props.isCopyClick ? ' copied' : ''}`}>
      {props.isCopyClick === true && (
        <div className="copy-msg">Successfully copied!</div>
      )}

      <table ref={props.tableRef}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {props.rowData.length === 0 && (
        <p className="msg">No hostnames entered!</p>
      )}
    </div>
  )
}

export default Spreadsheet

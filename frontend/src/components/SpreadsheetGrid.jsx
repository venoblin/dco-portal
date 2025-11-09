import './SpreadsheetGrid.css'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import { useState, useRef, useCallback, useEffect } from 'react'

const SpreadsheetGrid = (props) => {
  if (!props.rowData) {
    return null
  }

  const classes = `SpreadsheetGrid to-print light${
    props.isCopyClick ? ' copied' : ''
  } ${props.className ? props.className : ''}`

  const [selection, setSelection] = useState({
    selectedCells: new Set(),
    selectedRows: new Set(),
    selectedColumns: new Set(),
    isSelecting: false,
    startCell: null,
    currentCell: null,
    selectAll: false,
    startRow: null,
    startColumn: null
  })

  const isMouseDown = useRef(false)
  const startCellRef = useRef(null)
  const startRowRef = useRef(null)
  const startColumnRef = useRef(null)

  const table = useReactTable({
    data: props.rowData,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const getCellId = (rowIndex, columnId) => `${rowIndex}-${columnId}`

  const selectAll = useCallback(() => {
    const rows = table.getRowModel().rows
    const allColumns = table.getAllLeafColumns()
    const newSelectedCells = new Set()

    rows.forEach((row, rowIndex) => {
      allColumns.forEach((column) => {
        newSelectedCells.add(getCellId(rowIndex, column.id))
      })
    })

    const newSelectedColumns = new Set(allColumns.map((col) => col.id))

    setSelection((prev) => ({
      ...prev,
      selectedCells: newSelectedCells,
      selectedRows: new Set(),
      selectedColumns: newSelectedColumns,
      selectAll: true
    }))
  }, [table])

  const selectCell = useCallback((rowIndex, columnId) => {
    setSelection({
      selectedCells: new Set([getCellId(rowIndex, columnId)]),
      selectedRows: new Set(),
      selectedColumns: new Set(),
      selectAll: false,
      startCell: { rowIndex, columnId },
      currentCell: { rowIndex, columnId }
    })
  }, [])

  const selectRange = useCallback(
    (startRow, startCol, endRow, endCol) => {
      const newSelectedCells = new Set()

      const minRow = Math.min(startRow, endRow)
      const maxRow = Math.max(startRow, endRow)
      const minColIndex = Math.min(startCol, endCol)
      const maxColIndex = Math.max(startCol, endCol)

      const allColumns = table.getAllLeafColumns()
      const columnIds = allColumns.map((col) => col.id)

      for (let row = minRow; row <= maxRow; row++) {
        for (let colIndex = minColIndex; colIndex <= maxColIndex; colIndex++) {
          const columnId = columnIds[colIndex]
          if (columnId) {
            newSelectedCells.add(getCellId(row, columnId))
          }
        }
      }

      setSelection((prev) => ({
        ...prev,
        selectedCells: newSelectedCells,
        selectedRows: new Set(),
        selectedColumns: new Set(),
        selectAll: false,
        currentCell: { rowIndex: endRow, columnId: columnIds[endCol] }
      }))
    },
    [table]
  )

  const selectRow = useCallback(
    (rowIndex, extendSelection = false) => {
      const allColumns = table.getAllLeafColumns()
      const columnIds = allColumns.map((col) => col.id)

      setSelection((prev) => {
        const newSelectedRows = extendSelection
          ? new Set(prev.selectedRows)
          : new Set()
        const newSelectedCells = extendSelection
          ? new Set(prev.selectedCells)
          : new Set()

        newSelectedRows.add(rowIndex)

        columnIds.forEach((columnId) => {
          newSelectedCells.add(getCellId(rowIndex, columnId))
        })

        return {
          ...prev,
          selectedCells: newSelectedCells,
          selectedRows: newSelectedRows,
          selectedColumns: new Set(),
          selectAll: false,
          startRow: rowIndex
        }
      })
    },
    [table]
  )

  const selectRowRange = useCallback(
    (startRow, endRow) => {
      const allColumns = table.getAllLeafColumns()
      const columnIds = allColumns.map((col) => col.id)
      const newSelectedRows = new Set()
      const newSelectedCells = new Set()

      const minRow = Math.min(startRow, endRow)
      const maxRow = Math.max(startRow, endRow)

      for (let row = minRow; row <= maxRow; row++) {
        newSelectedRows.add(row)
        columnIds.forEach((columnId) => {
          newSelectedCells.add(getCellId(row, columnId))
        })
      }

      setSelection((prev) => ({
        ...prev,
        selectedCells: newSelectedCells,
        selectedRows: newSelectedRows,
        selectedColumns: new Set(),
        selectAll: false
      }))
    },
    [table]
  )

  const selectColumn = useCallback(
    (columnId, extendSelection = false) => {
      const rows = table.getRowModel().rows

      setSelection((prev) => {
        const newSelectedCells = extendSelection
          ? new Set(prev.selectedCells)
          : new Set()

        rows.forEach((row, rowIndex) => {
          newSelectedCells.add(getCellId(rowIndex, columnId))
        })

        return {
          ...prev,
          selectedCells: newSelectedCells,
          selectedColumns: new Set(),
          selectedRows: new Set(),
          selectAll: false,
          startColumn: columnId
        }
      })
    },
    [table]
  )

  const selectColumnRange = useCallback(
    (startColIndex, endColIndex) => {
      const rows = table.getRowModel().rows
      const allColumns = table.getAllLeafColumns()
      const newSelectedCells = new Set()

      const minColIndex = Math.min(startColIndex, endColIndex)
      const maxColIndex = Math.max(startColIndex, endColIndex)

      for (let colIndex = minColIndex; colIndex <= maxColIndex; colIndex++) {
        const columnId = allColumns[colIndex]?.id
        if (columnId) {
          rows.forEach((row, rowIndex) => {
            newSelectedCells.add(getCellId(rowIndex, columnId))
          })
        }
      }

      setSelection((prev) => ({
        ...prev,
        selectedCells: newSelectedCells,
        selectedColumns: new Set(),
        selectedRows: new Set(),
        selectAll: false
      }))
    },
    [table]
  )

  const handleCellMouseDown = (event, rowIndex, columnId) => {
    event.preventDefault()
    isMouseDown.current = true

    const columnIndex = table
      .getAllLeafColumns()
      .findIndex((col) => col.id === columnId)
    startCellRef.current = { rowIndex, columnId, columnIndex }

    if (event.shiftKey && selection.startCell) {
      const startColIndex = table
        .getAllLeafColumns()
        .findIndex((col) => col.id === selection.startCell.columnId)
      selectRange(
        selection.startCell.rowIndex,
        startColIndex,
        rowIndex,
        columnIndex
      )
    } else if (event.ctrlKey || event.metaKey) {
      const newSelectedCells = new Set(selection.selectedCells)
      newSelectedCells.add(getCellId(rowIndex, columnId))
      setSelection((prev) => ({
        ...prev,
        selectedCells: newSelectedCells,
        selectedRows: new Set(),
        selectedColumns: new Set(),
        selectAll: false,
        startCell: { rowIndex, columnId },
        currentCell: { rowIndex, columnId }
      }))
    } else {
      selectCell(rowIndex, columnId)
    }
  }

  const handleCellMouseEnter = (rowIndex, columnId) => {
    if (isMouseDown.current && startCellRef.current) {
      const currentColumnIndex = table
        .getAllLeafColumns()
        .findIndex((col) => col.id === columnId)
      selectRange(
        startCellRef.current.rowIndex,
        startCellRef.current.columnIndex,
        rowIndex,
        currentColumnIndex
      )
    }
  }

  const handleRowHeaderMouseDown = (event, rowIndex) => {
    event.preventDefault()
    isMouseDown.current = true
    startRowRef.current = rowIndex

    if (event.shiftKey && selection.startRow !== null) {
      selectRowRange(selection.startRow, rowIndex)
    } else if (event.ctrlKey || event.metaKey) {
      selectRow(rowIndex, true)
    } else {
      selectRow(rowIndex, false)
    }
  }

  const handleRowHeaderMouseEnter = (rowIndex) => {
    if (isMouseDown.current && startRowRef.current !== null) {
      selectRowRange(startRowRef.current, rowIndex)
    }
  }

  const handleColumnHeaderMouseDown = (event, columnId, columnIndex) => {
    event.preventDefault()
    isMouseDown.current = true
    startColumnRef.current = columnIndex

    if (event.shiftKey && selection.startColumn !== null) {
      const startColIndex = table
        .getAllLeafColumns()
        .findIndex((col) => col.id === selection.startColumn)
      selectColumnRange(startColIndex, columnIndex)
    } else if (event.ctrlKey || event.metaKey) {
      selectColumn(columnId, true)
    } else {
      selectColumn(columnId, false)
    }
  }

  const handleColumnHeaderMouseEnter = (columnIndex) => {
    if (isMouseDown.current && startColumnRef.current !== null) {
      selectColumnRange(startColumnRef.current, columnIndex)
    }
  }

  const handleMouseUp = () => {
    isMouseDown.current = false
    startCellRef.current = null
    startRowRef.current = null
    startColumnRef.current = null
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSelection((prev) => ({
        ...prev,
        selectedCells: new Set(),
        selectedRows: new Set(),
        selectedColumns: new Set(),
        selectAll: false
      }))
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      event.preventDefault()
      selectAll()
    }
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isMouseDown.current = false
      startCellRef.current = null
      startRowRef.current = null
      startColumnRef.current = null
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  const isCellSelected = (rowIndex, columnId) => {
    return (
      selection.selectAll ||
      selection.selectedCells.has(getCellId(rowIndex, columnId)) ||
      selection.selectedRows.has(rowIndex) ||
      selection.selectedColumns.has(columnId)
    )
  }

  const getCellClasses = (rowIndex, columnId) => {
    const classes = ['data-cell']
    if (isCellSelected(rowIndex, columnId)) {
      classes.push('selected')
    }
    if (
      selection.startCell &&
      selection.startCell.rowIndex === rowIndex &&
      selection.startCell.columnId === columnId
    ) {
      classes.push('active-cell')
    }
    return classes.join(' ')
  }

  const copySelectionToClipboard = useCallback(() => {
    if (selection.selectedCells.size === 0 && !selection.selectAll) return

    const rows = table.getRowModel().rows
    const columns = table.getAllLeafColumns()

    const shouldCopyHeaders = selection.selectAll

    let minRow = 0
    let maxRow = rows.length - 1
    let minCol = 0
    let maxCol = columns.length - 1

    if (!selection.selectAll) {
      minRow = Infinity
      maxRow = -Infinity
      minCol = Infinity
      maxCol = -Infinity

      selection.selectedCells.forEach((cellId) => {
        const [rowIndex, columnId] = cellId.split('-')
        const rowIdx = parseInt(rowIndex)
        const colIdx = columns.findIndex((col) => col.id === columnId)

        minRow = Math.min(minRow, rowIdx)
        maxRow = Math.max(maxRow, rowIdx)
        minCol = Math.min(minCol, colIdx)
        maxCol = Math.max(maxCol, colIdx)
      })
    }

    let tsvData = ''

    if (shouldCopyHeaders) {
      const headerRow = []
      for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
        const column = columns[colIdx]
        const headerValue = column.columnDef.header
        const headerText =
          typeof headerValue === 'function'
            ? headerValue({ column: column })
            : headerValue || ''
        headerRow.push(headerText)
      }
      tsvData += headerRow.join('\t') + '\n'
    }

    for (let rowIdx = minRow; rowIdx <= maxRow; rowIdx++) {
      const row = []
      for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
        const columnId = columns[colIdx]?.id
        const cellValue = rows[rowIdx]?.getValue(columnId) || ''
        row.push(cellValue)
      }
      tsvData += row.join('\t') + '\n'
    }

    navigator.clipboard.writeText(tsvData.trim())
  }, [selection.selectedCells, selection.selectAll, table])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault()
        copySelectionToClipboard()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [copySelectionToClipboard])

  const rows = table.getRowModel().rows
  const headerGroups = table.getHeaderGroups()

  return (
    <div className={classes} onKeyDown={handleKeyDown} tabIndex={0}>
      {props.isCopyClick === true && (
        <div className="copy-msg">Successfully copied!</div>
      )}

      <div className="table-wrap light">
        <table>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th
                  className={`row-header corner-header ${
                    selection.selectAll ? 'selected' : ''
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    selectAll()
                  }}
                ></th>

                {headerGroup.headers.map((header, columnIndex) => {
                  const columnId = header.column.id
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`column-header ${
                        selection.selectAll ? 'selected' : ''
                      }`}
                      onMouseDown={(e) =>
                        handleColumnHeaderMouseDown(e, columnId, columnIndex)
                      }
                      onMouseEnter={() =>
                        handleColumnHeaderMouseEnter(columnIndex)
                      }
                      onMouseUp={handleMouseUp}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td
                  className={`row-header`}
                  onMouseDown={(e) => handleRowHeaderMouseDown(e, rowIndex)}
                  onMouseEnter={() => handleRowHeaderMouseEnter(rowIndex)}
                  onMouseUp={handleMouseUp}
                >
                  {rowIndex + 1}
                </td>

                {row.getVisibleCells().map((cell) => {
                  const columnId = cell.column.id
                  return (
                    <td
                      key={cell.id}
                      className={getCellClasses(rowIndex, columnId)}
                      onMouseDown={(e) =>
                        handleCellMouseDown(e, rowIndex, columnId)
                      }
                      onMouseEnter={() =>
                        handleCellMouseEnter(rowIndex, columnId)
                      }
                      onMouseUp={handleMouseUp}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SpreadsheetGrid

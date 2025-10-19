import * as XLSX from 'xlsx-js-style'

const calculateOptimalColumnWidths = (data) => {
  if (!data || data.length === 0) return []

  const colCount = data[0].length
  const maxWidths = new Array(colCount).fill(10)

  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null || cell === undefined || cell === '') return

      const cellText = String(cell)
      let cellWidth = estimateTextWidth(cellText)

      if (rowIndex === 0) {
        cellWidth *= 1.1
      }

      cellWidth = Math.max(8, Math.min(cellWidth, 60))

      if (cellWidth > maxWidths[colIndex]) {
        maxWidths[colIndex] = cellWidth
      }
    })
  })

  return maxWidths.map((width) => ({ wch: width }))
}

const estimateTextWidth = (text) => {
  let width = text.length

  const wideChars = text.match(/[MW@]/g)
  if (wideChars) width += wideChars.length * 0.5

  const narrowChars = text.match(/[il1|]/g)
  if (narrowChars) width -= narrowChars.length * 0.3

  if (/^\d+$/.test(text)) {
    width *= 0.8
  }

  if (text.startsWith("'")) {
    width = Math.max(1, width - 1)
  }

  return Math.ceil(width)
}

export const generateXlsxFile = (name, data) => {
  const baseCellStyles = {
    border: {
      top: { style: 'thin', color: { rgb: '000000' } },
      bottom: { style: 'thin', color: { rgb: '000000' } },
      left: { style: 'thin', color: { rgb: '000000' } },
      right: { style: 'thin', color: { rgb: '000000' } }
    }
  }

  const worksheet = XLSX.utils.aoa_to_sheet(data)
  const workbook = XLSX.utils.book_new()

  const range = XLSX.utils.decode_range(worksheet['!ref'])

  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col })

      if (worksheet[cellRef]) {
        worksheet[cellRef].s = {
          ...worksheet[cellRef].s,
          ...baseCellStyles
        }
      } else {
        worksheet[cellRef] = {
          v: '',
          t: 's',
          s: baseCellStyles
        }
      }
    }
  }

  const colWidths = calculateOptimalColumnWidths(data)
  worksheet['!cols'] = colWidths

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, `${name}.xlsx`)
}

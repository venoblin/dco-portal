import * as XLSX from 'xlsx-js-style'

export const generateXlsxFile = (name, data) => {
  const worksheet = XLSX.utils.aoa_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  XLSX.writeFile(workbook, `${name}.xlsx`)
}

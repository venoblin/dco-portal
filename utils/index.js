import * as fs from 'fs'
import { parse } from 'csv-parse'

export const parseCsv = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const records = []

    const readStream = fs.createReadStream(csvFilePath).on('error', (err) => {
      reject(new Error(`File stream error: ${err.message}`))
    })

    const parser = readStream.pipe(
      parse({
        columns: true,
        delimiter: ',',
        skip_empty_lines: true,
        trim: true,
        bom: true,
        relax_column_count: true
      })
    )

    parser.on('readable', function () {
      let record
      while ((record = parser.read()) !== null) {
        records.push(record)
      }
    })

    parser.on('end', function () {
      resolve(records)
    })

    parser.on('error', function (error) {
      reject(new Error(`Parsing error: ${error.message}`))
    })
  })
}

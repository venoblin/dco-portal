import * as fs from 'fs'
import { parse } from 'csv-parse'

export const parseCsv = (csvFile) => {
  const records = []

  const parser = fs
    .createReadStream(csvFile)

    .pipe(
      parse({
        columns: true,
        delimiter: ','
      })
    )

  parser.on('readable', function () {
    let record
    while ((record = parser.read()) !== null) {
      records.push(record)
    }
  })

  parser.on('end', function () {
    console.log('CSV file successfully processed.')
    console.log('Total records:', records.length)
  })

  parser.on('error', function (error) {
    console.error('An error occurred during parsing:', error.message)
  })
}

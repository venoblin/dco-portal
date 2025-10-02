const fs = require('fs')
const { parse } = require('csv-parse')
const http = require('https')

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

export const filterHeaders = (rawHeaders, excludedHeaders) => {
  const exclusionSet = new Set(excludedHeaders.map((h) => h.toLowerCase()))

  return Object.entries(rawHeaders).reduce((acc, [key, value]) => {
    if (!exclusionSet.has(key.toLowerCase())) {
      acc[key] = value
    }

    return acc
  }, {})
}

export const requestPromise = (options, postBody) => {
  return new Promise((resolve, reject) => {
    const request = http.request(options, (res) => {
      const chunks = []

      res.on('data', (chunk) => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks).toString()
        resolve({ body: body })
      })
    })

    request.on('error', (err) => {
      reject(err)
    })

    request.write(postBody)
    request.end()
  })
}

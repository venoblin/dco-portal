export const execCommand = (command, commandArgs = null) => {
  return new Promise((resolve, reject) => {
    let exec = null
    let output = ''
    let errOutput = ''

    if (commandArgs) {
      exec = spawn(command, [...commandArgs])
    } else {
      exec = spawn(command, [])
    }

    exec.stdout.on('data', (data) => {
      output += data.toString()
    })
    exec.stderr.on('data', (data) => {
      errOutput += data.toString()
    })

    exec.on('close', (code) => {
      if (code === 0) {
        resolve(output.trim())
      } else {
        reject(new Error(`Error: Code ${code} - ${errOutput}`))
      }
    })

    exec.on('error', (err) => {
      reject(err)
    })
  })
}

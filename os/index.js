const { spawn } = require('child_process')

const execCommand = (command, commandArgs = null) => {
  return new Promise((resolve, reject) => {
    let exec = null
    let output = ''
    let errOutput = ''

    if (commandArgs) {
      exec = spawn(command, [...commandArgs], { shell: true })
    } else {
      exec = spawn(command, [], { shell: true })
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

module.exports = {
  execCommand
}

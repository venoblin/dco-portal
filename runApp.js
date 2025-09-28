import { execCommand } from './os/index.js'
import backPkgJson from './package.json' with { type: 'json' }
import frontPkgJson from './frontend/package.json' with { type: 'json' }

backPkgJson.dependencies = {}
backPkgJson.devDependencies = {}
frontPkgJson.dependencies = {}
frontPkgJson.devDependencies = {}

await execCommand('echo', [`${JSON.stringify(backPkgJson)}`, '>', 'package.json'])
await execCommand('echo', [`${JSON.stringify(frontPkgJson)}`, '>', 'frontend/package.json'])

await execCommand('npm', ['run', 'install:all'])
await execCommand('npm', ['start'])
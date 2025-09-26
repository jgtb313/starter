/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process')

const args = process.argv.slice(2)

if (args.length < 2) {
	console.error('Usage: pnpm c <workspace> <command> [...args]')
	process.exit(1)
}

const workspace = args[0]
const command = args[1]
const extraArgs = args.slice(2).join(' ')

// pnpm usa --filter em vez de workspace
execSync(`pnpm --filter @starter/${workspace} ${command} ${extraArgs}`, {
	stdio: 'inherit',
})

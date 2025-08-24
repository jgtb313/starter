/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process')

const args = process.argv.slice(2)

if (args.length < 2) {
	console.error('Usage: yarn c <workspace> <command> [...args]')
	process.exit(1)
}

const workspace = args[0]
const command = args[1]
const extraArgs = args.slice(2).join(' ')

execSync(`yarn workspace @starter/${workspace} ${command} ${extraArgs}`, {
	stdio: 'inherit',
})

import { execSync } from 'child_process'

const args = process.argv.slice(2)

const name = args[0]

if (!name) {
  console.error('Usage: yarn migration:create migrationName')
  process.exit(1)
}

execSync(`typeorm migration:create src/adapters/database/migrations/${name}`, { stdio: 'inherit' })

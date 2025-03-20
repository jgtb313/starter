const chokidar = require('chokidar')
const { exec } = require('child_process')

const execute = async () => {
  const chalk = (await import('chalk')).default

  const openapiPath = './openapi-spec.json'

  const build = () => {
    console.log(chalk.blue('Running build for client...'))

    exec('yarn command client build', (err) => {
      if (err) {
        console.error(chalk.red('Error during client build!'), err)
        return
      }

      console.log(chalk.green('Client has been successfully updated'))

      console.log(chalk.blue('Running build for store...'))

      exec('yarn command store build', (err) => {
        if (err) {
          console.error(chalk.red('Error during store build!'), err)
          return
        }

        console.log(chalk.green('Store has been successfully updated'))
      })
    })
  }

  const watcher = chokidar.watch(openapiPath, { persistent: true })

  watcher.on('change', (path) => {
    console.log(chalk.yellow(`OpenapiSpec has been changed at ${path}...`))

    build()
  })

  console.log(chalk.cyan('Starting to watch openapi-spec.json...'))
}

execute()

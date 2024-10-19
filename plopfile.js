const { exec } = require('child_process')

const createCommand = (template, values) =>
  Object.entries(values).reduce((result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value), template)

module.exports = function (plop) {
  plop.setActionType('shell', (answers, config) => {
    const command = createCommand(config.command, answers)

    console.log(config.message)

    exec(command)
  })

  plop.setGenerator('generate', {
    description: 'Generate schema, api client resource, and api module',
    prompts: async function (inquirer) {
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Schema name:',
          validate: (input) => (input ? true : 'Required'),
        },
      ])

      const defaultNamePlural = `${name}s`

      const { namePlural } = await inquirer.prompt([
        {
          type: 'input',
          name: 'namePlural',
          message: 'Plural:',
          default: defaultNamePlural,
          validate: (input) => (input ? true : 'Required'),
        },
      ])

      const form = { name, namePlural }

      return {
        ...form,
      }
    },
    actions: [
      {
        type: 'shell',
        message: 'Generating Schema...',
        command: 'yarn workspace @starter/schema generate:schema "{{name}}" "{{namePlural}}"',
      },
      {
        type: 'shell',
        message: 'Generating API Client Resource...',
        command: 'yarn workspace @starter/client generate:resource "{{name}}" "{{namePlural}}"',
      },
      {
        type: 'shell',
        message: 'Generating API Module...',
        command: 'yarn workspace @starter/api generate:module "{{name}}" "{{namePlural}}"',
      },
      {
        type: 'shell',
        message: 'Building...',
        command: 'yarn workspace @starter/shared build && yarn workspace @starter/schema build && yarn workspace @starter/client build',
      },
    ],
  })
}

const { exec } = require('child_process')

const createCommand = (template, values) =>
  Object.entries(values).reduce((result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value), template)

module.exports = function (plop) {
  plop.setActionType('shell', (answers, config) => {
    const command = createCommand(config.command, answers)
    exec(command)
  })

  plop.setGenerator('generate', {
    description: 'Generate schema, api client resource, and api module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
      {
        type: 'input',
        name: 'namePlural',
        message: 'Plural:',
      },
    ],
    actions: [
      {
        type: 'shell',
        command: 'yarn workspace @starter/schema generate:schema "{{name}}" "{{namePlural}}"',
      },
      {
        type: 'shell',
        command: 'yarn workspace @starter/client generate:resource "{{name}}" "{{namePlural}}"',
      },
      {
        type: 'shell',
        command: 'yarn workspace @starter/api generate:module "{{name}}" "{{namePlural}}"',
      },
      {
        type: 'shell',
        command: 'yarn workspace @starter/shared build && yarn workspace @starter/schema build && yarn workspace @starter/client build',
      },
    ],
  })
}

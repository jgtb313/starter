import { readFileSync, writeFileSync } from 'node:fs'
import Handlebars from 'handlebars'
import { upperFirst } from '@starter/common'

import openapi from '../../../openapi-spec.json' with { type: 'json' }

Handlebars.registerHelper('eq', (a, b) => {
  return a === b
})

const execute = () => {
  const { paths } = openapi

  const data = Object.entries(paths)
    .map(([_, methods]) => Object.entries(methods).map(([method, item]) => ({ ...item, method })))
    .flat()

  const hooks = data.map(({ operationId, method }) => {
    const [moduleName, resourceName] = operationId.split('.')

    const hookName = `use${upperFirst(resourceName)}`
    const hookMethod = method === 'get' ? 'useQuery' : 'useMutation'

    return { moduleName, resourceName, hookName, hookMethod }
  })

  const hooksUseQuery = hooks.filter((hook) => hook.hookMethod === 'useQuery')

  const templateFile = readFileSync('scripts/stores.template.hbs', 'utf-8')

  const template = Handlebars.compile(templateFile)

  const result = template({ hooks, hooksUseQuery })

  writeFileSync('src/stores.generated.ts', result)
}

execute()

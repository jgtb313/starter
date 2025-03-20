import { readFileSync, writeFileSync } from 'node:fs'
import Handlebars from 'handlebars'
import { jsonSchemaToZod } from 'json-schema-to-zod'
import { first, last, lowerFirst, upperFirst } from '@starter/common'

import openapi from '../../../openapi-spec.json' with { type: 'json' }

Handlebars.registerHelper('path', (value) => {
  return value.replace(/{(.*?)}/g, '${$1}')
})

Handlebars.registerHelper('or', (a, b) => {
  return a || b
})

Handlebars.registerHelper('eq', (a, b) => {
  return a === b
})

type Path = {
  operationId: string
  parameters: { in: 'path' | 'query'; name: string; schema: any; required: boolean }[]

  requestBody: any
  responses: any
}

const execute = async () => {
  const { paths, components } = openapi

  const resources = Object.entries(paths).reduce<any[]>((result, [url, value]) => {
    const internalPaths = (Object.values(value) as Path[]).map((path, index) => {
      const module = first(path.operationId.split('.'))?.toLowerCase()!
      const resource = lowerFirst(last(path.operationId.split('.')))

      const inputSchema = `${upperFirst(resource)}Schema`
      const outputSchema = `${upperFirst(resource)}SchemaOutput`

      const pathParameters = path.parameters ?? []

      const parametersSchemas = Object.fromEntries(
        pathParameters.filter((paramater) => paramater.schema).map((parameter) => [parameter.name, parameter.schema]),
      )
      const parametersRequired = pathParameters.filter((paramater) => paramater.schema && paramater.required).map((parameter) => parameter.name)

      const requestBody: any = Object.values(path.requestBody?.['content'] ?? {})[0]
      const requestBodySchema = requestBody ? requestBody.schema : undefined

      const response: any = Object.entries(path.responses)
        .filter(([statusCode]) => statusCode === '200' || statusCode === '201')
        .map(([_, value]) => value)[0]
      const responseSchema: any = response ? response?.content?.['application/json']?.schema : undefined

      const SchemaInput = requestBodySchema
        ? jsonSchemaToZod({
            type: 'object',
            properties: { ...requestBodySchema.properties, ...parametersSchemas },
            required: [...(requestBodySchema?.required ?? []), ...parametersRequired],
          })
        : parametersSchemas
          ? jsonSchemaToZod({
              type: 'object',
              properties: { ...parametersSchemas },
              required: [...parametersRequired],
            })
          : 'z.object({})'

      const SchemaOutput = responseSchema ? jsonSchemaToZod(responseSchema) : 'z.any()'

      const inputType = `${upperFirst(resource)}Input`
      const outputType = `${upperFirst(resource)}Output`

      const params = pathParameters.filter((paramater) => paramater.in === 'path').map((parameter) => parameter.name)
      const query = pathParameters.filter((paramater) => paramater.in === 'query').map((parameter) => parameter.name)

      return {
        method: Object.keys(value)[index],
        path: url,
        module,
        resource,
        SchemaInput,
        SchemaOutput,
        inputSchema,
        outputSchema,
        inputType,
        outputType,
        params,
        query,
      }
    })

    return [...result, ...internalPaths]
  }, [])

  const schemas = Object.entries(components.schemas).map(([name, schema]) => {
    return {
      name,
      schema: jsonSchemaToZod({ ...schema, type: 'object' }),
    }
  })

  const templateFile = readFileSync('scripts/resources.template.hbs', 'utf-8')

  const template = Handlebars.compile(templateFile)

  let result = template({ resources, schemas })

  result = result
    .replace(/\boptional\b/g, 'nullish')
    .replace(/z\.string\(\)\.datetime\(\{ offset: true \}\)/g, 'z.coerce.date()')
    .replace(/z\.any\(\)/g, 'z.void()')

  writeFileSync('src/resources.generated.ts', result)
}

execute()

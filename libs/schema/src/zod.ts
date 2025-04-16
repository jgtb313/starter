import { z, ZodSchema, ZodType } from 'zod'
import { extendZodWithOpenApi, generateSchema } from '@anatine/zod-openapi'
import { makeZodI18nMap } from 'zod-i18n-map'
import i18next from 'i18next'

import translations from './translations.json'

extendZodWithOpenApi(z)

i18next.init({
  compatibilityJSON: 'v4',
  lng: 'ptBR',
  resources: {
    ptBR: { zod: translations },
  },
})

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }))

const processOpenApiSchema = (schema: any): any => {
  if (!schema || typeof schema !== 'object') {
    return schema
  }

  // Handle the 'type' property
  if (schema.type && Array.isArray(schema.type) && schema.type.length === 1) {
    schema.type = schema.type[0] // Unwrap single-item array
  }

  // Recursively process properties (for objects)
  if (schema.properties && typeof schema.properties === 'object') {
    schema.properties = Object.fromEntries(Object.entries(schema.properties).map(([key, value]) => [key, processOpenApiSchema(value)]))
  }

  // Handle items in arrays
  if (schema.items) {
    schema.items = processOpenApiSchema(schema.items)
  }

  // Handle additionalProperties
  if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    schema.additionalProperties = processOpenApiSchema(schema.additionalProperties)
  }

  // Handle allOf, anyOf, oneOf
  for (const key of ['allOf', 'anyOf', 'oneOf']) {
    if (Array.isArray(schema[key])) {
      schema[key] = schema[key].map((item: any) => processOpenApiSchema(item))
    }
  }

  // Handle nested schemas in other fields (e.g., not, enum, etc.)
  for (const key in schema) {
    if (
      typeof schema[key] === 'object' &&
      schema[key] !== null &&
      !['properties', 'items', 'additionalProperties', 'allOf', 'anyOf', 'oneOf'].includes(key)
    ) {
      schema[key] = processOpenApiSchema(schema[key])
    }
  }

  return schema
}

export const zodSchemaToOpenAPi = (zodType: ZodType) => {
  const result = generateSchema(zodType)

  return processOpenApiSchema(result)
}

export { z, generateSchema, ZodSchema, ZodType }

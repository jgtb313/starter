import ScalarApiReference from '@scalar/fastify-api-reference'
import { sample } from 'openapi-sampler'
import { zodSchemaToInstance } from '@starter/schema'
import { omit } from '@starter/shared'

import { IDependencies } from '@/support/types'
import * as Modules from '@/ports/http/modules'
import { HttpResponses } from '@/ports/http'

type OpenApiSchema = any

export const httpResponsesDescriptions: Record<HttpResponses, string> = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server',
}

const normalizePath = (path: string) => {
  return path
    .replace(/(^|[^:]):([a-zA-Z0-9_]+)/g, '$1{$2}')
    .replace(/::/g, ':')
    .replace(/\(.*\)/, '')
}

const generateSchemaProperties = (schema: OpenApiSchema): OpenApiSchema => {
  if (schema.oneOf) {
    schema = {
      ...schema,
      type: [schema.oneOf[0].type, ...(schema?.type ?? [])],
    }

    delete schema.oneOf
  }

  if (schema.allOf) {
    schema = {
      type: ['object'],
      properties: schema.allOf.reduce((state: OpenApiSchema, s: OpenApiSchema) => {
        return {
          ...state,
          ...(s?.properties ?? {}),
        }
      }, {}),
      required: schema.allOf.map((s: OpenApiSchema) => [...(s?.required ?? [])]).flat(),
    }
  }

  if (!schema.type?.includes('object') && !schema.type?.includes('array')) {
    const properties = schema.type.includes('string') && schema.minLength === 1 ? omit(schema, 'minLength') : schema

    return {
      ...properties,
    }
  }

  if (schema.type[0] === 'array') {
    if (!schema.items.properties) {
      return {
        type: 'array',
        ...schema,
        ...schema.items,
      }
    }

    return {
      type: 'array',
      items: {
        type: 'object',
        description: schema.description,
        properties: Object.fromEntries(Object.entries(schema.items.properties).map(([key, value]) => [key, generateSchemaProperties(value)])),
        required: schema.items.required,
      },
    }
  }

  return {
    type: 'object',
    description: schema.description,
    properties: Object.fromEntries(Object.entries(schema.properties).map(([key, value]) => [key, generateSchemaProperties(value)])),
    required: schema.required,
  }
}

const Schemas = Object.values(Modules).map((module) => module({} as IDependencies))

const tags = Schemas.map((schema) => ({
  name: schema.name,
  description: schema.description,
}))

const paths = Schemas.reduce((state, schema) => {
  const formattedPaths = Object.entries(schema.paths).reduce((internalState, [_, value]) => {
    const { summary, description, path, method, parameters, responses } = value

    const skipParameters = ['body', 'bodyOptions']

    const formattedParameters = Object.entries(parameters)
      .filter(([key]) => !skipParameters.includes(key))
      .map(([key, value]) => {
        const parameter = key === 'params' ? 'path' : key
        const schema = generateSchemaProperties(zodSchemaToInstance(value))

        return Object.entries(schema.properties).map(([prop, value]) => {
          return {
            in: parameter,
            name: prop,
            schema: generateSchemaProperties(value),
            required: !!schema.required?.includes(prop),
          }
        })
      })
      .flat()

    const formattedResponses = Object.entries(responses).reduce((state, [response, value]) => {
      if (Array.isArray(value)) {
        return {
          ...state,
          [response]: {
            description: httpResponsesDescriptions[response as unknown as HttpResponses],
            content: {
              'application/json': {
                examples: Object.fromEntries(
                  value.map((item) => [
                    'description' in item ? item.description : httpResponsesDescriptions[response as unknown as HttpResponses],
                    'schema' in item ? sample(generateSchemaProperties(zodSchemaToInstance(item.schema))) : null,
                  ]),
                ),
              },
            },
          },
        }
      }

      return {
        ...state,
        [response]: {
          description: httpResponsesDescriptions[response as unknown as HttpResponses],
          content: {
            'application/json': {
              schema: 'schema' in value ? generateSchemaProperties(zodSchemaToInstance(value.schema)) : null,
            },
          },
        },
      }
    }, {})

    const requestBodyContentType = parameters.bodyOptions?.contentType ?? 'application/json'

    const formattedRequestBody = parameters.body
      ? {
          requestBody: {
            content: {
              [requestBodyContentType]: {
                schema: generateSchemaProperties(zodSchemaToInstance(parameters.body)),
              },
            },
          },
        }
      : null

    const normalizedPath = normalizePath(path)

    const previousPath: {} = internalState[normalizedPath as keyof typeof internalState]

    return {
      ...internalState,
      [normalizedPath]: {
        ...previousPath,
        [method.toLowerCase()]: {
          operationId: `${normalizedPath}-${method}`,
          tags: [schema.name],
          summary,
          description,

          parameters: formattedParameters,

          ...formattedRequestBody,

          responses: formattedResponses,
        },
      },
    }
  }, {})

  return {
    ...state,
    ...formattedPaths,
  }
}, {})

const schemas = Schemas.reduce((state, { schemas }) => {
  const formattedSchemas = Object.entries(schemas).reduce((internalState, [key, value]) => {
    const schema = zodSchemaToInstance(value.schema)

    const properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]) => {
        const formattedValue = generateSchemaProperties(value)
        return [key, formattedValue]
      }),
    )

    return {
      ...internalState,
      [key]: {
        ...schema,
        type: schema.type[0],
        properties,
        description: value.description,
      },
    }
  }, {})

  return {
    ...state,
    ...formattedSchemas,
  }
}, {})

const document = {
  openapi: '3.1.0',
  info: {
    title: 'Starter API',
    version: '1.0.0',
    description: '# Introduction',
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
    },
  ],

  security: [],

  tags,

  paths,

  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },

    schemas,
  },
}

export const Docs = {
  instance: ScalarApiReference,
  config: {
    routePrefix: 'reference',
    configuration: {
      hideDownloadButton: true,
      metaData: {
        title: 'Starter API',
      },
      defaultOpenAllTags: true,
      spec: {
        content: document,
      },
    },
  },
}

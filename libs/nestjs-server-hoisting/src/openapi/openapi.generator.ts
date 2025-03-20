import { OpenAPIV3_1 } from 'openapi-types'
import { sample } from 'openapi-sampler'
import { z, ZodSchema, zodSchemaToOpenapiSchema } from '@starter/schema'
import { get, omit, Required } from '@starter/common'

import { HttpStatus, HttpStatusErrorResponses, RouteOptions } from '@/interfaces'
import { State } from '@/nestjs-server-hoisting.state'

type OpenApiSchema = any

const httpResponsesDescriptions: Record<HttpStatus, string> = {
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

const ErrorSchema = {
  400: () =>
    z.object({
      statusCode: z.number().openapi({ example: 400 }),
      error: z.string().openapi({ example: 'Bad Request Error' }),
      issues: z.array(z.record(z.string(), z.string())).openapi({ example: JSON.stringify([{ propertyKey: 'errorMessage' }]) }),
    }),

  401: (message: string) =>
    z.object({
      statusCode: z.number().openapi({ example: 401 }),
      error: z.string().openapi({ example: 'Unauthorized Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  403: (message: string) =>
    z.object({
      statusCode: z.number().openapi({ example: 403 }),
      error: z.string().openapi({ example: 'Forbidden Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  404: (message: string) =>
    z.object({
      statusCode: z.number().openapi({ example: 404 }),
      error: z.string().openapi({ example: 'Not Found Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  409: (message: string) =>
    z.object({
      statusCode: z.number().openapi({ example: 409 }),
      error: z.string().openapi({ example: 'Confict Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  500: (message: string) =>
    z.object({
      statusCode: z.number().openapi({ example: 500 }),
      error: z.string().openapi({ example: 'Internal Server Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),
}

const isHttpResponseError = (value: HttpStatus): value is HttpStatusErrorResponses =>
  ['400', '401', '403', '404', '409', '500'].includes(value.toString())

const normalizePath = (path: string) => {
  return path
    .replace(/(^|[^:]):([a-zA-Z0-9_]+)/g, '$1{$2}')
    .replace(/::/g, ':')
    .replace(/\(.*\)/, '')
}

const generateSchema = (value: ReturnType<typeof zodSchemaToOpenapiSchema>): OpenAPIV3_1.SchemaObject => {
  let schema: OpenApiSchema = value

  if (schema.oneOf) {
    schema = {
      ...schema,
      type: [Array.isArray(schema.oneOf[0].type) ? schema.oneOf[0].type[0] : schema.oneOf[0].type, ...(schema.type ?? [])],
      format: schema.oneOf[1].format ? schema.oneOf[1].format : undefined,
    }

    delete schema.oneOf
  }

  if (schema.allOf) {
    schema = {
      type: 'object',
      properties: schema.allOf.reduce((state: OpenApiSchema, s: OpenApiSchema) => {
        return {
          ...state,
          ...(s.properties ?? {}),
        }
      }, {}),
      required: schema.allOf.map((s: OpenApiSchema) => [...(s.required ?? [])]).flat(),
    }
  }

  if (!schema.type?.includes('object') && !schema.type?.includes('array')) {
    const properties = schema.type.includes('string') && schema.minLength === 1 ? omit(schema, 'minLength') : schema

    return {
      ...properties,
      type: Array.isArray(schema.type) && !schema.type.includes('null') ? schema.type[0] : schema.type,
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
        properties: Object.fromEntries(Object.entries(schema.items.properties).map(([key, value]) => [key, generateSchema(value)])),
        required: schema.items.required,
      },
    }
  }

  return {
    type: 'object',
    description: schema.description,
    properties: Object.fromEntries(
      Object.entries(schema.properties ?? schema.additionalProperties).map(([key, value]) => [key, generateSchema(value)]),
    ),
    required: schema.required,
  }
}

const generateTags = ({ controllers }: State): OpenAPIV3_1.Document['tags'] => {
  const Controllers = Object.values(controllers)

  const tags: OpenAPIV3_1.Document['tags'] = Controllers.map((controller) => ({
    name: controller.name,
    description: controller.description,
  }))

  return tags
}

const genereateSchemas = ({ controllers }: State): Required<OpenAPIV3_1.Document['components']>['schemas'] => {
  const Controllers = Object.values(controllers)

  return Controllers.reduce((state, { schemas }) => {
    const formattedSchemas = Object.entries(schemas).reduce((internalState, [key, value]) => {
      const schema: Required<OpenAPIV3_1.SchemaObject> = zodSchemaToOpenapiSchema(value.schema)

      const properties = Object.fromEntries(
        Object.entries(schema.properties ?? {}).map(([key, value]) => {
          const formattedValue = generateSchema(value)
          return [key, formattedValue]
        }),
      )

      return {
        ...internalState,
        [key]: {
          ...schema,
          description: value.description,
          properties,
        },
      }
    }, {})

    return {
      ...state,
      ...formattedSchemas,
    }
  }, {})
}

const getDefaultResponses = () => {
  return {
    400: {
      description: httpResponsesDescriptions[400],
      content: {
        'application/json': {
          schema: generateSchema(zodSchemaToOpenapiSchema(ErrorSchema[400]())),
        },
      },
    },
    500: {
      description: httpResponsesDescriptions[500],
      content: {
        'application/json': {
          schema: generateSchema(zodSchemaToOpenapiSchema(ErrorSchema[500]('...'))),
        },
      },
    },
  }
}

const getRepsonses = (responses: RouteOptions['responses']) => {
  return Object.entries(responses).reduce((state, [response, value]) => {
    const httpResponse = response as unknown as HttpStatus

    if (Array.isArray(value)) {
      return {
        ...state,
        [httpResponse]: {
          description: httpResponsesDescriptions[httpResponse],
          content: {
            'application/json': {
              schema: isHttpResponseError(httpResponse)
                ? generateSchema(zodSchemaToOpenapiSchema(ErrorSchema[httpResponse](httpResponsesDescriptions[httpResponse])))
                : null,
              examples: Object.fromEntries(
                value.map((item) => [
                  'description' in item ? item.description : httpResponsesDescriptions[httpResponse],
                  'schema' in item
                    ? sample(generateSchema(zodSchemaToOpenapiSchema(item.schema)) as {})
                    : isHttpResponseError(httpResponse)
                      ? sample(generateSchema(zodSchemaToOpenapiSchema(ErrorSchema[httpResponse](item.description))) as {})
                      : null,
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
        description: httpResponse.toString() === '204' ? get(value, 'description') : httpResponsesDescriptions[httpResponse],
        content: {
          'application/json': {
            schema:
              'schema' in value
                ? generateSchema(zodSchemaToOpenapiSchema(value.schema))
                : isHttpResponseError(httpResponse)
                  ? generateSchema(zodSchemaToOpenapiSchema(ErrorSchema[httpResponse](value.description)))
                  : null,
          },
        },
      },
    }
  }, {})
}

const generatePaths = ({ controllers, routes }: State): OpenAPIV3_1.Document['paths'] => {
  const Controllers = Object.values(controllers)

  const paths = Controllers.reduce((state, controller) => {
    const internalPaths = routes[`${controller.name}Controller`] ?? {}

    const formattedPaths = Object.entries(internalPaths).reduce(
      (internalState, [_, value]) => {
        const {
          operationId,
          summary,
          description,
          path,
          version = 'v1',
          deprecated = false,
          method,
          parameters = {},
          bodyOptions,
          responses = {},
        } = value

        const formattedParameters = Object.entries(parameters)
          .filter(([key]) => key !== 'body')
          .filter(([_, value]) => !!value)
          .map(([key, value]) => {
            const parameter = key === 'params' ? 'path' : key
            const openapiSchema = zodSchemaToOpenapiSchema(value as ZodSchema)
            const schema = generateSchema(openapiSchema)

            return Object.entries(schema.properties ?? {}).map(([prop, value]) => {
              return {
                in: parameter,
                name: prop,
                schema: generateSchema(value),
                required: schema.required?.includes(prop),
              }
            })
          })
          .flat()
          .sort((a, b) => (a.name === 'filter' ? -1 : b.name === 'filter' ? 1 : 0))

        const defaultResponses = getDefaultResponses()

        const formattedResponses = getRepsonses(responses)

        const allResponses = {
          ...formattedResponses,
          ...defaultResponses,
        }

        const requestBodyContentType = bodyOptions?.contentType ?? 'application/json'

        const formattedRequestBody = parameters.body
          ? {
              requestBody: {
                content: {
                  [requestBodyContentType]: {
                    schema: generateSchema(zodSchemaToOpenapiSchema(parameters.body)),
                  },
                },
              },
            }
          : null

        const basePathNormalized = normalizePath(controller.basePath)

        const formattedOperationId = `${controller.name.toLowerCase()}.${operationId}`
        const normalizedPath = path ? normalizePath(path) : undefined

        const fullPath = normalizedPath ? `/${version}/${basePathNormalized}${normalizedPath}` : `/${version}/${basePathNormalized}`

        const previousPath = internalState[fullPath]

        return {
          ...internalState,
          [fullPath]: {
            ...previousPath,
            [method.toLowerCase()]: {
              operationId: formattedOperationId,
              tags: [controller.name],

              summary,
              description,
              deprecated,

              parameters: formattedParameters,

              ...formattedRequestBody,

              responses: allResponses,
            },
          },
        }
      },
      {} as Record<string, {}>,
    )

    return {
      ...state,
      ...formattedPaths,
    }
  }, {})

  return paths
}

export type OpenapiOptions = {
  title?: string
  description?: string
  favicon?: string
  server?: string
}

export const openapiGenerator = (state: State, options?: OpenapiOptions): OpenAPIV3_1.Document => {
  const tags: OpenAPIV3_1.Document['tags'] = generateTags(state)

  const schemas: OpenAPIV3_1.Document['components'] = genereateSchemas(state)

  const paths: OpenAPIV3_1.Document['paths'] = generatePaths(state)

  return {
    openapi: '3.1.0',

    tags,

    info: {
      title: options?.title ?? 'API',
      description: options?.description,
      version: '1.0.0',
    },

    paths,

    servers: [
      {
        url: options?.server ?? 'http://localhost:3000',
      },
    ],

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

    security: [],
  }
}

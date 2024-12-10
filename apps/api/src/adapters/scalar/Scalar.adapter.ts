import ScalarApiReference from '@scalar/fastify-api-reference'
import { sample } from 'openapi-sampler'
import { config, apiUrls, StageEnum } from '@starter/config'
import { zodSchemaToInstance, ZodSchema } from '@starter/schema'
import { ErrorSchema, IDependencies } from '@starter/domain'
import { get, omit } from '@starter/shared'

import { env } from '@/config'
import * as Modules from '@/ports/http/modules'
import { HttpErrorResponses, HttpResponses } from '@/ports/http'

const STAGE = env('STAGE')

type OpenApiSchema = any

const httpResponsesDescriptions: Record<HttpResponses, string> = {
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

const isHttpResponseError = (value: HttpResponses): value is HttpErrorResponses =>
  ['400', '401', '403', '404', '409', '500'].includes(value.toString())

const normalizePath = (path: string) => {
  return path
    .replace(/(^|[^:]):([a-zA-Z0-9_]+)/g, '$1{$2}')
    .replace(/::/g, ':')
    .replace(/\(.*\)/, '')
}

const generateSchema = (schema: ZodSchema) => generateSchemaProperties(zodSchemaToInstance(schema))

const generateSchemaProperties = (s: OpenApiSchema): OpenApiSchema => {
  let schema: OpenApiSchema = s

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
    properties: Object.fromEntries(
      Object.entries(schema.properties ?? schema.additionalProperties).map(([key, value]) => [key, generateSchemaProperties(value)]),
    ),
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
    const { summary, description, path, version = 'v1', deprecated = false, method, parameters, responses } = value

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

    const defaultResponses = {
      400: {
        description: httpResponsesDescriptions[400],
        content: {
          'application/json': {
            schema: generateSchema(ErrorSchema[400]('...')),
          },
        },
      },
      500: {
        description: httpResponsesDescriptions[500],
        content: {
          'application/json': {
            schema: generateSchema(ErrorSchema[500]('...')),
          },
        },
      },
    }

    const formattedResponses = Object.entries(responses).reduce((state, [response, value]) => {
      const httpResponse = response as unknown as HttpResponses

      if (Array.isArray(value)) {
        return {
          ...state,
          [httpResponse]: {
            description: httpResponsesDescriptions[httpResponse],
            content: {
              'application/json': {
                schema: isHttpResponseError(httpResponse) ? generateSchema(ErrorSchema[httpResponse](httpResponsesDescriptions[httpResponse])) : null,
                examples: Object.fromEntries(
                  value.map((item) => [
                    'description' in item ? item.description : httpResponsesDescriptions[httpResponse],
                    'schema' in item
                      ? sample(generateSchema(item.schema))
                      : isHttpResponseError(httpResponse)
                        ? sample(generateSchema(ErrorSchema[httpResponse](item.description)))
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
                  ? generateSchema(value.schema)
                  : isHttpResponseError(httpResponse)
                    ? generateSchema(ErrorSchema[httpResponse](value.description))
                    : null,
            },
          },
        },
      }
    }, {})

    const allResponses = {
      ...formattedResponses,
      ...defaultResponses,
    }

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

    const fullPath = `/${version}${normalizedPath}`

    const previousPath = internalState[fullPath as keyof typeof internalState] as Record<string, unknown>

    return {
      ...internalState,
      [fullPath]: {
        ...previousPath,
        [method.toLowerCase()]: {
          operationId: fullPath,
          tags: [schema.name],

          summary,
          description,
          deprecated,

          parameters: formattedParameters,

          ...formattedRequestBody,

          responses: allResponses,
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
    title: `${config.name} API`,
    version: '1.0.0',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    description: require('fs').readFileSync(require('path').join(__dirname, './Scalar.docs.mdx'), 'utf-8'),
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: apiUrls[STAGE as StageEnum],
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
      hideModels: false,
      hideDownloadButton: true,
      metaData: {
        title: `${config.name} API`,
      },
      favicon: config.logo.darkSymbol.svg,
      defaultOpenAllTags: true,
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'axios',
      },
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      spec: {
        content: document,
      },
      customCss: [
        '.open-api-client-button { display: none !important; }',
        '.badges { display: none !important; }',
        '.security-scheme-label { font-weight: var(--scalar-semibold); font-size: var(--scalar-mini); color: var(--scalar-color-3); text-transform: uppercase; display: block; }',
        '.scalar-card-header-actions { display: none !important; }',
        '.models-list-item .schema-properties { margin-bottom: 0px !important; }',
        '.darklight-reference-promo { display: none !important; }',
      ].join(''),
    },
  },
}

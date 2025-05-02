import { Reflector } from '@nestjs/core'
import { HttpCode, Get, Post, Put, Patch, Delete, Version, applyDecorators } from '@nestjs/common'
import { GUARDS_METADATA } from '@nestjs/common/constants'
import { ApiOperation, ApiBearerAuth, ApiParam, ApiQuery, ApiBody, ApiResponse, ApiParamOptions } from '@nestjs/swagger'
import { sample } from 'openapi-sampler'
import { z } from '@starter/schema'
import { get } from '@starter/common'

import { RouteOptions, HttpStatus, HttpStatusErrorResponses } from '@/interfaces'
import { UseZodGuard } from '@/guards'
import { StateManager } from '@/nestjs-server-hoisting.state'

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
      statusCode: z.number().meta({ example: 400 }),
      error: z.string().meta({ example: 'Bad Request Error' }),
      issues: z.array(z.record(z.string(), z.string())).meta({ example: [{ propertyKey: 'errorMessage' }] }),
    }),

  401: (message: string) =>
    z.object({
      statusCode: z.number().meta({ example: 401 }),
      error: z.string().meta({ example: 'Unauthorized Error' }),
      message: z.string().meta({ example: message }),
      metadata: z.record(z.string(), z.string()).optional(),
    }),

  403: (message: string) =>
    z.object({
      statusCode: z.number().meta({ example: 403 }),
      error: z.string().meta({ example: 'Forbidden Error' }),
      message: z.string().meta({ example: message }),
      metadata: z.record(z.string(), z.string()).optional(),
    }),

  404: (message: string) =>
    z.object({
      statusCode: z.number().meta({ example: 404 }),
      error: z.string().meta({ example: 'Not Found Error' }),
      message: z.string().meta({ example: message }),
      metadata: z.record(z.string(), z.string()).optional(),
    }),

  409: (message: string) =>
    z.object({
      statusCode: z.number().meta({ example: 409 }),
      error: z.string().meta({ example: 'Conflict Error' }),
      message: z.string().meta({ example: message }),
      metadata: z.record(z.string(), z.string()).optional(),
    }),

  500: (message: string) =>
    z.object({
      statusCode: z.number().meta({ example: 500 }),
      error: z.string().meta({ example: 'Internal Server Error' }),
      message: z.string().meta({ example: message }),
      metadata: z.record(z.string(), z.string()).optional(),
    }),
}

export const zodSchemaToJSONSchema = (zodType: z.ZodType): any => {
  return z.toJSONSchema(zodType, {
    io: 'input',
    override: (ctx) => {
      if (ctx.jsonSchema.minLength === 1 || ctx.jsonSchema.minimum === 1) {
        ctx.jsonSchema.minLength = undefined
        ctx.jsonSchema.minimum = undefined
      }

      if (ctx.jsonSchema.enum || ctx.jsonSchema.const) {
        ctx.jsonSchema.type = 'string'
      }

      ctx.jsonSchema.pattern = undefined
    },
  })
}

const getMergedProperties = (jsonSchema: any): any => {
  if (jsonSchema.properties) {
    return Object.entries(jsonSchema.properties).map(([name, props]: any) => ({
      ...props,
      name,
      required: jsonSchema?.required?.includes(name),
    }))
  }

  if (jsonSchema.allOf) {
    return jsonSchema.allOf
      .map((schema: any) =>
        Object.entries(schema.properties).map(([name, props]: any) => ({
          ...props,
          name,
          required: schema?.required?.includes(name),
        })),
      )
      .flat()
  }

  return []
}

const isHttpResponseError = (value: HttpStatus): value is HttpStatusErrorResponses =>
  ['400', '401', '403', '404', '409', '500'].includes(value.toString())

export const Route = (options: RouteOptions): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = []

    const version = options.version ?? 'v1'

    const reflector = new Reflector()
    const guards = reflector.get(GUARDS_METADATA, target.constructor.prototype[propertyKey as keyof typeof target]) ?? []

    const authenticated = !!guards.length

    decorators.push(
      ApiOperation({
        operationId: propertyKey.toString(),
        summary: options.summary,
        description: options.description,
        deprecated: options.deprecated,
      }),
    )

    if (options.method === 'GET') decorators.push(Get(options.path))
    if (options.method === 'POST') decorators.push(Post(options.path))
    if (options.method === 'PUT') decorators.push(Put(options.path))
    if (options.method === 'PATCH') decorators.push(Patch(options.path))
    if (options.method === 'DELETE') decorators.push(Delete(options.path))

    decorators.push(
      UseZodGuard({
        query: options.parameters.query,
        params: options.parameters.params,
        body: options.parameters.body,
      }),
    )

    decorators.push(
      ApiQuery({
        name: 'fields',
        type: 'string',
        description: 'Comma-separated list of fields to return in the response.',
        example: 'id,name,email',
        required: false,
      }),
    )

    if (options.parameters.query) {
      const openApiSchema = zodSchemaToJSONSchema(options.parameters.query)

      const properties = getMergedProperties(openApiSchema)

      properties.forEach((prop: any) => {
        decorators.push(ApiQuery(prop))
      })
    }
    if (options.parameters.params) {
      const openApiSchema = zodSchemaToJSONSchema(options.parameters.params)

      const properties = getMergedProperties(openApiSchema)

      properties.forEach((prop: any) => {
        decorators.push(ApiParam(prop))
      })
    }
    if (options.parameters.body) {
      const openApiSchema = zodSchemaToJSONSchema(options.parameters.body)

      decorators.push(
        ApiBody({
          schema: {
            ...openApiSchema,
            properties: Object.fromEntries(
              Object.entries(openApiSchema.properties ?? {}).map(([name, prop]) => [
                name,
                {
                  ...(prop as {}),
                  name,
                  required: get(prop, 'required'),
                },
              ]),
            ),
          },
          required: true,
        }),
      )
    }

    Object.entries(options.responses).forEach(([response, value]) => {
      const httpResponse = Number(response) as HttpStatus
      if (Array.isArray(value)) {
        decorators.push(
          ApiResponse({
            status: httpResponse,
            description: httpResponsesDescriptions[httpResponse],
            content: {
              'application/json': {
                schema: isHttpResponseError(httpResponse)
                  ? zodSchemaToJSONSchema(ErrorSchema[httpResponse](httpResponsesDescriptions[httpResponse]))
                  : undefined,
                examples: Object.fromEntries(
                  value.map((item) => {
                    const description = 'description' in item ? item.description : httpResponsesDescriptions[httpResponse]

                    return [
                      description,
                      {
                        summary: description,
                        value:
                          'schema' in item
                            ? sample(zodSchemaToJSONSchema(item.schema))
                            : isHttpResponseError(httpResponse)
                              ? sample(zodSchemaToJSONSchema(ErrorSchema[httpResponse](item.description)))
                              : {},
                      },
                    ]
                  }),
                ),
              },
            },
          }),
        )
      } else {
        decorators.push(
          ApiResponse({
            status: httpResponse,
            description: httpResponse.toString() === '204' ? get(value, 'description') : httpResponsesDescriptions[httpResponse],
            content: {
              'application/json': {
                schema:
                  'schema' in value
                    ? zodSchemaToJSONSchema(value.schema)
                    : isHttpResponseError(httpResponse)
                      ? zodSchemaToJSONSchema(ErrorSchema[httpResponse](value.description))
                      : undefined,
              },
            },
          }),
        )
      }
    })

    decorators.push(
      ApiResponse({
        status: 400,
        description: httpResponsesDescriptions[400],
        content: {
          'application/json': {
            schema: zodSchemaToJSONSchema(ErrorSchema[400]()),
          },
        },
      }),
    )
    decorators.push(
      ApiResponse({
        status: 500,
        description: httpResponsesDescriptions[500],
        content: {
          'application/json': {
            schema: zodSchemaToJSONSchema(ErrorSchema[500]('...')),
          },
        },
      }),
    )

    const statusCode = Object.keys(options.responses).map(String)

    if (statusCode.includes('201')) {
      decorators.push(HttpCode(201))
    } else if (statusCode.includes('204')) {
      decorators.push(HttpCode(204))
    } else {
      decorators.push(HttpCode(200))
    }

    decorators.push(Version(version.replace('v', '')))

    if (authenticated) {
      decorators.push(ApiBearerAuth('Bearer'))
    }

    applyDecorators(...decorators)(target, propertyKey, descriptor)

    StateManager.addRoute(target.constructor.name, {
      ...options,
      operationId: propertyKey.toString(),
    })
  }
}

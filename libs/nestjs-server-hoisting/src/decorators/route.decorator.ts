import { Reflector } from '@nestjs/core'
import { HttpCode, Get, Post, Put, Patch, Delete, Version, applyDecorators } from '@nestjs/common'
import { GUARDS_METADATA } from '@nestjs/common/constants'
import { ApiOperation, ApiBearerAuth, ApiHeader, ApiParam, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger'
import { UseZodGuard } from 'nestjs-zod'
import { z } from '@starter/schema'
import { get } from '@starter/common'

import { RouteOptions, HttpStatus, HttpStatusErrorResponses } from '@/interfaces'
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
      error: z.string().meta({ example: 'Confict Error' }),
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

const zodSchemaToJSONSchema = (zodType: z.ZodType) => {
  return z.toJSONSchema(zodType, {
    io: 'input',
    override: (ctx) => {
      if (ctx.jsonSchema.minLength === 1 || ctx.jsonSchema.minimum === 1) {
        ctx.jsonSchema.minLength = undefined
      }

      ctx.jsonSchema.pattern = undefined
    },
  })
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

    if (options.parameters.query) decorators.push(UseZodGuard('query', options.parameters.query))
    if (options.parameters.params) decorators.push(UseZodGuard('params', options.parameters.params))
    if (options.parameters.body) decorators.push(UseZodGuard('body', options.parameters.body))

    if (options.parameters.query) {
      const openApiSchema = zodSchemaToJSONSchema(options.parameters.query)

      Object.entries(openApiSchema.properties ?? {})
        .sort(([a], [b]) => (a === 'filter' ? -1 : b === 'filter' ? 1 : 0))
        .forEach(([name, prop]) => {
          decorators.push(
            ApiQuery({
              ...(prop as {}),
              name,
              // required: !!openApiSchema.required?.includes(name),
            }),
          )
        })
    }
    if (options.parameters.params) {
      const openApiSchema = zodSchemaToJSONSchema(options.parameters.params)

      Object.entries(openApiSchema.properties ?? {}).forEach(([name, prop]) => {
        decorators.push(
          ApiParam({
            ...(prop as {}),
            name,
            // required: !!openApiSchema.required?.includes(name),
          }),
        )
      })
    }
    if (options.parameters.body) {
      const openApiSchema = zodSchemaToJSONSchema(options.parameters.body)

      decorators.push(
        ApiBody({
          schema: {
            ...openApiSchema,
            // properties: Object.fromEntries(
            //   Object.entries(openApiSchema.properties ?? {}).map(([name, prop]) => [
            //     name,
            //     {
            //       ...(prop as {}),
            //       name,
            //       required: get(prop, 'required'),
            //     },
            //   ]),
            // ),
          },
          required: true,
        }),
      )
    }

    decorators.push(
      ApiQuery({
        name: 'fields',
        type: 'string',
        description: 'Comma-separated list of fields to return in the response.',
        example: 'id,name,email',
        required: false,
      }),
    )

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
                  value.map((item) => [
                    'description' in item ? item.description : httpResponsesDescriptions[httpResponse],
                    'schema' in item
                      ? zodSchemaToJSONSchema(item.schema)
                      : isHttpResponseError(httpResponse)
                        ? zodSchemaToJSONSchema(ErrorSchema[httpResponse](item.description))
                        : {},
                  ]),
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
      decorators.push(ApiBearerAuth())
      decorators.push(
        ApiHeader({
          name: 'authorization',
          description: 'The authorization token for user authentication.',
          example: 'Bearer <your_token_here>',
          required: true,
        }),
      )
    }

    applyDecorators(...decorators)(target, propertyKey, descriptor)

    StateManager.addRoute(target.constructor.name, {
      ...options,
      operationId: propertyKey.toString(),
    })
  }
}

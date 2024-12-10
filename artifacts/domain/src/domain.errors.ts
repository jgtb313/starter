import { z, ZodSchema } from '@starter/schema'

type DefaultErrorInput = {
  name: string
  code: number
  message: string
  metadata?: Record<string, any>
  issues?: Record<string, string>[]
}

type BadRequestErrorInput = Omit<DefaultErrorInput, 'metadata'>

type HttpErrorResponses = 400 | 401 | 403 | 404 | 409 | 500

export const ErrorSchema: Record<HttpErrorResponses, (message: string) => ZodSchema> = {
  400: () =>
    z.object({
      statusCode: z.number().openapi({ example: 400 }),
      error: z.string().openapi({ example: 'Bad Request Error' }),
      issues: z.array(z.record(z.string(), z.string())).openapi({ example: JSON.stringify([{ email: 'Invalid email' }]) }),
    }),

  401: (message) =>
    z.object({
      statusCode: z.number().openapi({ example: 401 }),
      error: z.string().openapi({ example: 'Unauthorized Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  403: (message) =>
    z.object({
      statusCode: z.number().openapi({ example: 403 }),
      error: z.string().openapi({ example: 'Forbidden Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  404: (message) =>
    z.object({
      statusCode: z.number().openapi({ example: 404 }),
      error: z.string().openapi({ example: 'Not Found Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  409: (message) =>
    z.object({
      statusCode: z.number().openapi({ example: 409 }),
      error: z.string().openapi({ example: 'Confict Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),

  500: (message) =>
    z.object({
      statusCode: z.number().openapi({ example: 500 }),
      error: z.string().openapi({ example: 'Internal Server Error' }),
      message: z.string().openapi({ example: message }),
      // metadata: z.record(z.string(), z.string()).optional(),
    }),
}

export class DefaultError extends Error {
  code: number
  error: string
  metadata?: DefaultErrorInput['metadata']
  issues?: Record<string, string>[]

  constructor({ name, code, message, metadata, issues }: DefaultErrorInput) {
    super(message)
    this.name = name
    this.code = code
    this.error = name.split(/(?=[A-Z])/).join(' ')
    this.metadata = metadata
    this.issues = issues
  }
}

export class AuthError extends DefaultError {
  constructor(message = 'Unauthorized', metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'AuthError', code: 401, message, metadata })
  }
}

export class ForbiddenError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'ForbiddenError', code: 403, message, metadata })
  }
}

export class BadRequestError extends DefaultError {
  constructor({ issues }: Pick<BadRequestErrorInput, 'issues'>) {
    super({ name: 'BadRequestError', code: 400, message: 'Invalid input', issues })
  }
}

export class NotFoundError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'NotFoundError', code: 404, message, metadata })
  }
}

export class ConflictError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'ConflictError', code: 409, message, metadata })
  }
}

export class UnknownError extends DefaultError {
  constructor() {
    super({ name: 'UnknownError', code: 418, message: 'Unknown error' })
  }
}

export class InternalServerError extends DefaultError {
  constructor(message: string) {
    super({ name: 'InternalServerError', code: 500, message })
  }
}

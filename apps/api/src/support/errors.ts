import { z } from '@starter/schema'

import { HttpResponses } from '@/ports/http'

export const ErrorSchema = ({ statusCode, message }: { statusCode: HttpResponses; message: string }) =>
  z.object({
    statusCode: z.number().openapi({ example: statusCode }),
    error: z.string().openapi({ example: 'Bad Request Error' }),
    message: z.string().openapi({ example: message }),
    // metadata: z.record(z.string(), z.any()).nullish(),
  })

type DefaultErrorInput = {
  name: string
  code: number
  message: string
  metadata?: Record<string, any>
}

export class DefaultError extends Error {
  code: number
  error: string
  metadata?: DefaultErrorInput['metadata']

  constructor({ name, code, message, metadata }: DefaultErrorInput) {
    super(message)
    this.name = name
    this.code = code
    this.error = name.split(/(?=[A-Z])/).join(' ')
    this.metadata = metadata
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
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'BadRequestError', code: 400, message, metadata })
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

export class ValidationError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'ValidationError', code: 400, message, metadata })
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

type DefaultErrorInput = {
  name: string
  code: number
  message: string
  metadata?: Record<string, any>
  issues?: Record<string, string>[]
}

type BadRequestErrorInput = Omit<DefaultErrorInput, 'metadata'>

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
    super({ name: 'BadRequestError', code: 400, message: 'Validation Failed', issues })
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

import { describe, it, expect } from 'vitest'

import {
  DefaultError,
  AuthError,
  ForbiddenError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  ValidationError,
  UnknownError,
  InternalServerError,
} from './errors'

describe('Error Classes', () => {
  it('should create DefaultError with correct properties', () => {
    const error = new DefaultError({
      name: 'CustomError',
      code: 400,
      message: 'This is a custom error message',
      metadata: { additional: 'info' },
    })

    expect(error).toBeInstanceOf(DefaultError)
    expect(error.name).toBe(error.name)
    expect(error.code).toBe(error.code)
    expect(error.message).toBe(error.message)
    expect(error.metadata).toEqual(error.metadata)
  })

  it('should create AuthError with correct properties', () => {
    const error = new AuthError('Unauthorized', { userId: '123' })

    expect(error.name).toBe('AuthError')
    expect(error.code).toBe(401)
    expect(error.message).toBe('Unauthorized')
    expect(error.metadata).toEqual({ userId: '123' })
  })

  it('should create ForbiddenError with correct properties', () => {
    const error = new ForbiddenError('You do not have permission', { userId: '123' })

    expect(error.name).toBe('ForbiddenError')
    expect(error.code).toBe(403)
    expect(error.message).toBe('You do not have permission')
    expect(error.metadata).toEqual({ userId: '123' })
  })

  it('should create BadRequestError with correct properties', () => {
    const error = new BadRequestError('Invalid input', { field: 'email' })

    expect(error.name).toBe('BadRequestError')
    expect(error.code).toBe(400)
    expect(error.message).toBe('Invalid input')
    expect(error.metadata).toEqual({ field: 'email' })
  })

  it('should create NotFoundError with correct properties', () => {
    const error = new NotFoundError('Resource not found', { resourceId: '456' })

    expect(error.name).toBe('NotFoundError')
    expect(error.code).toBe(404)
    expect(error.message).toBe('Resource not found')
    expect(error.metadata).toEqual({ resourceId: '456' })
  })

  it('should create ConflictError with correct properties', () => {
    const error = new ConflictError('Resource already exists', { resourceId: '456' })

    expect(error.name).toBe('ConflictError')
    expect(error.code).toBe(409)
    expect(error.message).toBe('Resource already exists')
    expect(error.metadata).toEqual({ resourceId: '456' })
  })

  it('should create ValidationError with correct properties', () => {
    const error = new ValidationError('Validation failed', { field: 'password' })

    expect(error.name).toBe('ValidationError')
    expect(error.code).toBe(400)
    expect(error.message).toBe('Validation failed')
    expect(error.metadata).toEqual({ field: 'password' })
  })

  it('should create UnknownError with correct properties', () => {
    const error = new UnknownError()

    expect(error.name).toBe('UnknownError')
    expect(error.code).toBe(418)
    expect(error.message).toBe('Unknown error')
  })

  it('should create InternalServerError with correct properties', () => {
    const error = new InternalServerError('Something went wrong')

    expect(error.name).toBe('InternalServerError')
    expect(error.code).toBe(500)
    expect(error.message).toBe('Something went wrong')
  })
})

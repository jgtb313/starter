import { z } from '@starter/schema'
import { AuthError, DefaultError } from '@starter/domain'
import { deepPick, deepOmit, isString } from '@starter/shared'

import { Auth } from '@/support/auth'
import { IContext } from '@/support/types'

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type HttpContentTypes = 'application/json' | 'multipart/form-data'

export type HttpResponses = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500

export type HttpSuccessResponses = 200 | 201 | 204

export type HttpErrorResponses = 400 | 401 | 403 | 404 | 409 | 500

export type HttpMapErrorResponses = 200 | 201 | 204 | 401 | 403 | 404 | 409

export const withResponse = (data: any, fields: string) => {
  if (!fields) {
    return deepOmit(data, ['password'])
  }

  const parsedFields = fields.replace(/\s+/g, '')

  const formatResponse = (value: any) => deepPick(parsedFields, deepOmit(value, ['password']))

  if (data.items) {
    return {
      ...data,
      items: data.items.map(formatResponse),
    }
  }

  if (Array.isArray(data)) {
    return data.map(formatResponse)
  }

  const [first] = Object.values(data)

  if (Array.isArray(first)) {
    const [key] = Object.keys(data)
    return (
      key && {
        [key]: first.map(formatResponse),
      }
    )
  }

  return formatResponse(data)
}

export const withError = (error: Error) => {
  if (error instanceof z.ZodError) {
    return {
      error: {
        code: 400,
        error: {
          statusCode: 400,
          error: 'Bad Request Error',
          issues: error.issues.map((issue) => ({ [isString(issue.path) ? issue.path : issue.path.join('.')]: issue.message })),
        },
      },
    }
  }

  if (error instanceof DefaultError) {
    return {
      error: {
        code: error.code,
        error: {
          statusCode: Number(error.code),
          error: error.error,
          message: error.message,
          metadata: error.metadata,
          issues: error.issues,
        },
      },
    }
  }

  return {
    error: {
      code: 500,
      error: {
        statusCode: 500,
        error: 'Internal Server Error',
        message: error.message,
      },
    },
  }
}

export const requiresAuthorization: (value: IContext) => asserts value is IContext & { auth: Auth; authorization: string } = ({ auth }) => {
  if (!auth) {
    throw new AuthError()
  }
}

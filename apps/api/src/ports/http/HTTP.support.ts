import { z } from '@starter/schema'
import { deepPick, deepOmit, first, isNumber } from '@starter/shared'

import { AuthError, DefaultError } from '@/support/errors'
import { Auth } from '@/support/auth'
import { IContext } from '@/core/shared/types'

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type HttpContentTypes = 'application/json' | 'multipart/form-data'

export type HttpResponses = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500

export type FieldsInput = {
  fields: string
}

export type WithFieldsInput<T> = {
  fields: string
} & T

export const withResponse = (data: any, fields: string) => {
  if (!fields) {
    return deepOmit(data, ['password'])
  }

  const parseFields = fields.replace(/\s+/g, '')

  const formatResponse = (value: any) => deepPick(parseFields, deepOmit(value, ['password']))

  if (data.docs) {
    return {
      ...data,
      docs: data.docs.map(formatResponse),
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

export const extractPath = (issue: z.ZodIssue) => {
  const isPathArray = issue.path.some((path) => isNumber(path))

  if (isPathArray) {
    const path = issue.path.reduce((result, path) => {
      const isPathNumber = isNumber(path)

      if (isPathNumber) {
        return `${result}[${path}]`
      }

      return result ? `${result}.${path}` : path
    }, '')

    return `${path}`
  }

  const isPathObject = issue.path.length >= 2

  if (isPathObject) {
    return issue.path.join('.').toString()
  }

  return `${first(issue.path)}`
}

export const formatZodErrors = (error: z.ZodError) => {
  const getIssuePath = (issue: z.ZodIssue) => {
    if (issue.code === z.ZodIssueCode.invalid_string && issue.validation !== 'uuid') {
      return (issue.validation as string).toString()
    }

    const path = extractPath(issue)

    return path
  }

  const getIssueMessage = (issue: z.ZodIssue) => {
    if (issue.code === 'custom') {
      return issue.message
    }

    const message =
      issue.message === 'String must contain at least 1 character(s)' || issue.message === 'Array must contain at least 1 element(s)'
        ? 'Campo obrigatório'
        : issue.message

    return message
  }

  const issues = new Set<string>()

  error.issues.forEach((issue) => {
    const path = getIssuePath(issue)
    const message = getIssueMessage(issue)

    issues.add(`${path}:${message}`)
  })

  return Array.from(issues).map((issue) => {
    const [path = '', message = ''] = issue.split(':')

    return {
      [path]: message,
    }
  })
}

export const withError = (error: Error) => {
  if (error instanceof z.ZodError) {
    return {
      error: {
        code: 400,
        error: {
          message: 'validationFailed',
          errors: formatZodErrors(error),
        },
      },
    }
  }

  if (error instanceof DefaultError) {
    return {
      error: {
        code: error.code,
        error: {
          message: error.message,
          metadata: error.metadata,
        },
      },
    }
  }

  return {
    error: {
      code: 400,
      error: {
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

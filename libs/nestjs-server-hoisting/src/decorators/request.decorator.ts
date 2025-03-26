import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { RequestSchemaInput, RequestInput } from '@/interfaces'

export const createRequestSchema = <T extends RequestSchemaInput>(schemas: T) => schemas

export const Request = <T extends RequestSchemaInput>() =>
  createParamDecorator((_, ctx: ExecutionContext): RequestInput<T> => {
    const request = ctx.switchToHttp().getRequest()

    const { query, params, body } = request

    return { query, params, body }
  })()

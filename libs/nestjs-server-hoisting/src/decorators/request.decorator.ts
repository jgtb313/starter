import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { RequestInput } from '@/interfaces'

export const Request = createParamDecorator((_, ctx: ExecutionContext): RequestInput => {
  const request = ctx.switchToHttp().getRequest()

  const { query, params, body } = request

  return { query, params, body }
})

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@starter/domain'

export const AuthenticatedUser = createParamDecorator((_: unknown, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest()
  return request.user
})

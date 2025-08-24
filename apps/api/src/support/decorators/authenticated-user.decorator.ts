import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { User } from '@starter/domain'

export const AuthenticatedUser = createParamDecorator(
	(_: unknown, context: ExecutionContext): User => {
		const request = context.switchToHttp().getRequest()
		return request.user
	},
)

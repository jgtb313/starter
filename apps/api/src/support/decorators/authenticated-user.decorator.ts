import type { User } from '@starter/domain'

import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const AuthenticatedUser = createParamDecorator(
	(_: unknown, context: ExecutionContext): User => {
		const request = context.switchToHttp().getRequest()
		return request.user
	},
)

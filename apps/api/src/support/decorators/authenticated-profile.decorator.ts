import type { Profile } from '@starter/domain'

import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const AuthenticatedProfile = createParamDecorator(
	(_: unknown, context: ExecutionContext): Profile => {
		const request = context.switchToHttp().getRequest()
		return request.user
	},
)

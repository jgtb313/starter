import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

import type { RequestInput, RequestSchemaInput } from '@/interfaces'

export const createRequestSchema = <T extends RequestSchemaInput>(schemas: T) =>
	schemas

export const Request = <T extends RequestSchemaInput>() =>
	createParamDecorator((_, ctx: ExecutionContext): RequestInput<T> => {
		const request = ctx.switchToHttp().getRequest()

		const { requestZodData, pagination } = request

		return {
			...requestZodData,
			pagination,
		}
	})()

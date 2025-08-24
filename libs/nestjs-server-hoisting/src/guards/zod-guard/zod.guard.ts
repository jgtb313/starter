import {
	type CanActivate,
	type ExecutionContext,
	UseGuards,
} from '@nestjs/common'
import { get, set } from '@starter/common'
import { BadRequestException } from '@starter/nestjs-error-handling'
import type { z } from '@starter/schema'

export type ZodSchemaMap = {
	query?: z.ZodType
	params?: z.ZodType
	body?: z.ZodType
}

export class ZodGuard implements CanActivate {
	constructor(private readonly schema: ZodSchemaMap) {}

	canActivate(context: ExecutionContext): boolean {
		const request: Request = context.switchToHttp().getRequest()

		const sources: (keyof ZodSchemaMap)[] = [
			'query',
			'params',
			'body',
		]
		const issues: z.core.$ZodIssue[] = []
		const requestZodData = {}

		for (const key of sources) {
			const schema = this.schema[key]

			if (!schema) {
				continue
			}

			const value = get(request, key)

			const result = schema.safeParse(value)

			if (!result.success) {
				issues.push(...result.error.issues)
			} else {
				set(requestZodData, key, result.data)
			}
		}

		if (issues.length) {
			throw new BadRequestException({
				message: 'Validation failed',
				issues,
			})
		}

		set(request, 'requestZodData', requestZodData)

		return true
	}
}

export const UseZodGuard = (schema: ZodSchemaMap) => {
	return UseGuards(new ZodGuard(schema))
}

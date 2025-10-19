import { deepOmit, deepPick } from '@starter/common'

import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common'
import type { Request } from 'express'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	private readonly OMIT = [
		'password',
	]

	intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest<Request>()

		const { fields } = request.query

		if (!fields) {
			return next.handle().pipe(map((data) => deepOmit(data, this.OMIT)))
		}

		const parsedFields = fields.toString().replace(/\s+/g, '')

		const formatResponse = <T extends {}>(value: T) =>
			deepPick(parsedFields, deepOmit(value, this.OMIT))

		return next.handle().pipe(
			map((data) => {
				if (Array.isArray(data.values)) {
					return {
						...data,
						values: data.values.map(formatResponse),
					}
				}

				if (Array.isArray(data)) {
					return data.map(formatResponse)
				}

				return formatResponse(data)
			}),
		)
	}
}

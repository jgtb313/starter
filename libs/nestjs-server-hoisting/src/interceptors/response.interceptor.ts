import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common'
import { deepOmit, deepPick } from '@starter/common'
import type { Request } from 'express'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest<Request>()

		const { fields } = request.query

		if (!fields) {
			return next.handle().pipe(map((data) => deepOmit(data, 'password')))
		}

		const parsedFields = fields.toString().replace(/\s+/g, '')

		const formatResponse = <T extends {}>(value: T) =>
			deepPick(
				parsedFields,
				deepOmit(value, [
					'password',
				]),
			)

		return next.handle().pipe(
			map((data) => {
				if (data.values) {
					return {
						...data,
						values: data.values.map(formatResponse),
					}
				}

				return formatResponse(data)
			}),
		)
	}
}

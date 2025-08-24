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

	private baseOmit(value: any) {
		return deepOmit(value, this.OMIT)
	}
}

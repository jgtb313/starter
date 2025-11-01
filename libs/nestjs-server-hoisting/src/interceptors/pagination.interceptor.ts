import { type Pagination, PaginationSchemaTransform } from '@starter/schema'

import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common'
import type { Request } from 'express'
import type { Observable } from 'rxjs'

declare module 'express' {
	interface Request {
		pagination?: Pagination
	}
}

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest<Request>()

		try {
			const pagination = PaginationSchemaTransform.parse(request.query)

			request.pagination = {
				cursor: pagination.cursor ?? undefined,
				limit: pagination.limit ?? 10,
			}
		} catch (error) {}

		return next.handle()
	}
}

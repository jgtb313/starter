import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
} from '@nestjs/common'
import { get, isString } from '@starter/common'
import type { z } from '@starter/schema'

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp()
		const response = context.getResponse()
		const status = exception.getStatus()

		const result = exception.getResponse()

		if (isString(result)) {
			return response.status(status).json({
				statusCode: 500,
				error: 'Internal Server Error',
				message: 'Unknown Error',
			})
		}

		const message = get(result, 'message') as string | undefined
		const error = get(result, 'error') as string | undefined
		const issues = get(result, 'issues')

		if (message === 'Validation failed') {
			const issues = get(result, 'issues') as unknown as z.ZodError['issues']

			return response.status(status).json({
				statusCode: 400,
				error: 'Bad Request Error',
				issues: issues.map((issue) => ({
					[isString(issue.path) ? issue.path : issue.path.join('.')]:
						issue.message,
				})),
			})
		}

		return response.status(status).json({
			statusCode: status,
			error: error ? `${error} Error` : 'Bad Request Error',
			message,
			issues,
		})
	}
}

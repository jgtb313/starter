import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
} from '@nestjs/common'
import { get, isString } from '@starter/common'
import {
	getLocaleHandler,
	type Locale,
	LocaleSchema,
	type z,
} from '@starter/schema'

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp()
		const request = context.getRequest()
		const response = context.getResponse()
		const status = exception.getStatus()

		const result = exception.getResponse()

		const acceptLanguage = request.headers['accept-language']
		const parsedAcceptLanguage = LocaleSchema.safeParse(acceptLanguage)
		const locale: Locale = parsedAcceptLanguage.success
			? parsedAcceptLanguage.data
			: 'en'

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
			const localeHandler = getLocaleHandler(locale)
			const issues = get(result, 'issues') as unknown as z.core.$ZodRawIssue[]

			return response.status(status).json({
				statusCode: 400,
				error: 'Bad Request Error',
				issues: issues.map((issue) => {
					const path = isString(issue.path)
						? issue.path
						: (issue.path?.join('.') ?? '')

					const message = localeHandler(issue)

					return {
						[path]: message,
					}
				}),
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

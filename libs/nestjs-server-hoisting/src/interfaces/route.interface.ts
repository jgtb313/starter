import { type ZodSchema, z } from '@starter/schema'

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type HttpContentTypes = 'application/json' | 'multipart/form-data'

export type HttpStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500

export type HttpStatusResponses = 200 | 201 | 204 | 401 | 403 | 404 | 409

export type HttpStatusErrorResponses = 400 | 401 | 403 | 404 | 409 | 500

export type RoutePathResponses<
	T extends 200 | 201 | 204 | 401 | 403 | 404 | 409,
> = T extends 200 | 201
	? {
			schema: ZodSchema
		}
	: {
			description: string
		}

export type RouteResponses<T extends HttpStatusResponses> = T extends 204
	? RoutePathResponses<T>
	: RoutePathResponses<T> | RoutePathResponses<T>[]

export type RouteOptions = {
	summary: string
	description: string

	path?: `/${string}`
	version?: `v${number}`
	deprecated?: boolean

	method: HTTPMethods

	parameters: {
		query?: ZodSchema
		params?: ZodSchema
		body?: ZodSchema
		headers?: ZodSchema
	}

	bodyOptions?: {
		contentType?: HttpContentTypes
	}

	responses: {
		[T in HttpStatusResponses]?: RouteResponses<T>
	}
}

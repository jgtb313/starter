import { z } from '@/zod'

export const PaginationSchema = z.object({
	cursor: z
		.string()
		.meta({
			description: 'The cursor to paginate the results by.',
			example: '96738ebc-7da1-48e2-8685-705c7b9268cb',
		})
		.optional(),
	limit: z.coerce
		.number()
		.meta({
			description: 'The limit of results to return.',
			example: 10,
		})
		.optional(),
})

export const PaginationSchemaTransform = PaginationSchema.transform(
	(pagination) => ({
		cursor: pagination.cursor ?? null,
		limit: pagination.limit
			? Number(pagination.limit) > 0
				? Number(pagination.limit) > 100
					? 100
					: Number(pagination.limit)
				: 10
			: 10,
	}),
)

const PaginationMeta = z.object({
	nextCursor: z.string().nullable().default(null),
	limit: z.number().default(0),
	total: z.number().default(0),
})

export const BasePaginationSchemaOutput = z.object({
	values: z.array(z.unknown()).default([]),
	meta: PaginationMeta.default({
		nextCursor: null,
		limit: 0,
		total: 0,
	}),
})

export type Pagination = Partial<z.infer<typeof PaginationSchema>>
export type PaginationOutput<T> = {
	values: T[]
	meta: z.infer<typeof PaginationMeta>
}

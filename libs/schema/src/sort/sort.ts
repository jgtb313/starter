import { z } from 'zod'

export const SortEnum = {
	asc: 'ASC',
	desc: 'DESC',
} as const

export const SortSchema = (allowedFields: string[]) =>
	z
		.string()
		.nullish()
		.refine(
			(value) => {
				if (!value) {
					return true
				}

				return value.includes(':')
			},
			{
				params: {
					code: 'sort.invalid_format',
				},
			},
		)
		.refine(
			(value) => {
				if (!value) {
					return true
				}

				return value.split(',').every((fieldValue) => {
					const [field] = fieldValue.split(':')
					return allowedFields.includes(field)
				})
			},
			{
				params: {
					code: 'sort.invalid_field',
					expected: allowedFields.join(', '),
				},
			},
		)
		.refine(
			(value) => {
				if (!value) {
					return true
				}

				return value.split(',').every((fieldValue) => {
					const [, order] = fieldValue.split(':')
					return [
						'asc',
						'desc',
					].includes(order)
				})
			},
			{
				params: {
					code: 'sort.invalid_order',
					expected: allowedFields.join(', '),
				},
			},
		)
		.transform((value) => {
			if (!value) {
				return {}
			}

			const fields = value.split(',').map((fieldValue) => {
				const [field, order] = fieldValue.split(':')
				return [
					field,
					SortEnum[order as keyof typeof SortEnum],
				]
			})

			return Object.fromEntries(fields)
		})
		.meta({
			description: `Sort the results by the given field and order.`,
			examples: 'field:asc,otherField:desc',
		})

export type Sort<K extends string> = {
	sort?: Partial<Record<K, (typeof SortEnum)[keyof typeof SortEnum]>>
}

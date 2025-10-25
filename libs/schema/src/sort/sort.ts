import { z } from 'zod'

export const SortEnum = {
	asc: 'ASC',
	desc: 'DESC',
} as const

export const SortSchema = (allowedFields: string[]) =>
	z
		.string()
		.optional()
		.refine(
			(value) => {
				if (!value) {
					return true
				}

				return value.includes(':')
			},
			{
				params: {
					code: 'sortInvalidFormat',
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
					code: 'sortInvalidField',
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
					code: 'sortInvalidOrder',
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
			description: 'Sort the results by the given field and order.',
			example: 'field:asc,otherField:desc',
		})

export type Sort<K extends string> = {
	sort?: Partial<Record<K, (typeof SortEnum)[keyof typeof SortEnum]>>
}

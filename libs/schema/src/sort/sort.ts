import { z } from 'zod'

export const SortEnum = {
	asc: 'ASC',
	desc: 'DESC',
} as const

export const SortSchema = (allowedFields: string[]) =>
	z
		.union([
			z.string().trim(),
			z.null(),
			z.undefined(),
		])
		.transform((value) => (value === '' || value == null ? undefined : value))
		.refine((value) => value === undefined || value.includes(':'))
		.refine((value) => {
			if (value === undefined) return true
			const [field] = value.split(':')
			return allowedFields.includes(field)
		})
		.refine((value) => {
			if (value === undefined) return true
			const [, order] = value.split(':')
			return [
				'asc',
				'desc',
			].includes(order)
		})
		.transform((value) => {
			if (value === undefined) return {}
			const [field, order] = value.split(':')
			return {
				[field]: SortEnum[order as keyof typeof SortEnum],
			}
		})

export type Sort<K extends string> = {
	sort?: Partial<Record<K, (typeof SortEnum)[keyof typeof SortEnum]>>
}

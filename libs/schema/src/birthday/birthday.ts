import { isAfter, isValidDate, setHours } from '@starter/common'

import { z } from '@/zod'

const parseLocalDate = (value: Date | string): Date => {
	if (value instanceof Date) {
		return value
	}

	const [year, month, day] = value.split('-').map(Number)

	return new Date(year, month - 1, day)
}

export const BirthdaySchema = z.preprocess(
	(value) => {
		if (value instanceof Date) {
			return value.toISOString().split('T')[0]
		}
		if (typeof value === 'string' && value.includes('T')) {
			return value.split('T')[0]
		}
		return value
	},
	z
		.union([
			z.string(),
			z.iso.datetime().transform((value) => new Date(value)),
		])
		.refine(isValidDate, {
			params: {
				code: 'dateInvalid',
			},
		})
		.refine(
			(value) => {
				return isAfter(parseLocalDate(value), new Date(1900, 0, 0))
			},
			{
				params: {
					code: 'birthdayInvalidRange',
				},
			},
		)
		.transform((value) => setHours(parseLocalDate(value), 12)),
)

export const BirthdayOptionalSchema = z.preprocess(
	(value) => {
		if (value instanceof Date) {
			return value.toISOString().split('T')[0]
		}
		if (typeof value === 'string' && value.includes('T')) {
			return value.split('T')[0]
		}
		return value
	},
	z
		.union([
			z.string(),
			z.iso.datetime().transform((value) => new Date(value)),
		])
		.nullish()
		.refine((value) => (value ? isValidDate(value) : true), {
			params: {
				code: 'dateInvalid',
			},
		})
		.refine(
			(value) =>
				value ? isAfter(parseLocalDate(value), new Date(1900, 0, 0)) : true,
			{
				params: {
					code: 'birthdayInvalidRange',
				},
			},
		)
		.transform((value) => (value ? setHours(parseLocalDate(value), 12) : null)),
)

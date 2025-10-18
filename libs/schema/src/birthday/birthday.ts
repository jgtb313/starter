import { isAfter, isValidDate, setHours } from '@starter/common'

import { z } from '@/zod'

const parseLocalDate = (value: Date | string): Date => {
	if (value instanceof Date) {
		return value
	}

	const [year, month, day] = value.split('-').map(Number)
	return new Date(year, month - 1, day)
}

export const BirthdaySchema = z
	.string()
	.or(z.iso.datetime().transform((value) => new Date(value)))
	.refine(isValidDate, {
		params: {
			code: 'date.invalid',
		},
	})
	.refine(
		(value) => {
			return isAfter(parseLocalDate(value), new Date(1900, 0, 0))
		},
		{
			params: {
				code: 'birthday.invalid_range',
			},
		},
	)
	.transform((value) => setHours(parseLocalDate(value), 12))

export const BirthdayOptionalSchema = z
	.string()
	.or(z.iso.datetime().transform((value) => new Date(value)))
	.nullish()
	.refine((value) => (value ? isValidDate(value) : true), {
		params: {
			code: 'date.invalid',
		},
	})
	.refine(
		(value) =>
			value ? isAfter(parseLocalDate(value), new Date(1900, 0, 0)) : true,
		{
			params: {
				code: 'birthday.invalid_range',
			},
		},
	)
	.transform((value) => (value ? setHours(parseLocalDate(value), 12) : null))

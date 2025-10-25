import { getDate, isValidDate } from '@starter/common'

import { z } from '@/zod'

export const DateSchema = z
	.string()
	.or(z.iso.datetime().transform((value) => new Date(value)))
	.refine(isValidDate, {
		params: {
			code: 'dateInvalid',
		},
	})
	.transform((value) => getDate(value))

export const DateOptionalSchema = z
	.string()
	.or(z.iso.datetime().transform((value) => new Date(value)))
	.nullish()
	.refine((value) => (value ? isValidDate(value) : true), {
		params: {
			code: 'dateInvalid',
		},
	})
	.transform((value) => {
		if (!value) {
			return null
		}

		return getDate(value)
	})

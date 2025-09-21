import { getDate, isAfter, setHours } from '@starter/common'

import { DateOptionalSchema, DateSchema } from '../date'

export const BirthdaySchema = DateSchema.refine(
	(value) => isAfter(getDate(value), getDate(new Date(1900, 0, 0))),
	{
		params: {
			code: 'birthday.invalid_range',
		},
	},
).transform((value) => setHours(getDate(value), 12))

export const BirthdayOptionalSchema = DateOptionalSchema.refine(
	(value) =>
		value ? isAfter(getDate(value), getDate(new Date(1900, 0, 0))) : true,
	{
		params: {
			code: 'birthday.invalid_range',
		},
	},
).transform((value) => (value ? setHours(getDate(value), 12) : null))

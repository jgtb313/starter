import { isAfter, getDate, setHours } from '@starter/common'

import { DateSchema, DateOptionalSchema } from '../date'

export const BirthdaySchema = DateSchema.refine((value) => isAfter(getDate(value), getDate(new Date(1900, 0, 0))), {
  params: { i18n: 'invalid_birth_date' },
}).transform((value) => setHours(getDate(value), 12))

export const BirthdayOptionalSchema = DateOptionalSchema.refine((value) => (value ? isAfter(getDate(value), getDate(new Date(1900, 0, 0))) : true), {
  params: { i18n: 'invalid_birth_date' },
}).transform((value) => (value ? setHours(getDate(value), 12) : null))

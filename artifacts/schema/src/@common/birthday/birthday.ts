import { z } from '@/zod'
import { isAfter, setHours } from '@starter/shared'

import { DateSchema, DateOptionalSchema } from '../date'

export const BirthdaySchema = DateSchema.refine((value) => (value ? isAfter(new Date(value), new Date(1900, 0, 0)) : true), {
  message: 'Data de nascimento inválida'
}).transform((value) => (value ? setHours(new Date(value), 12) : null))
export type BirthdayInput = z.infer<typeof BirthdaySchema>

export const BirthdayOptionalSchema = DateOptionalSchema.nullish()
  .refine((value) => (value ? isAfter(new Date(value), new Date(1900, 0, 0)) : true), {
    message: 'Data de nascimento inválida'
  })
  .transform((value) => (value ? setHours(new Date(value), 12) : null))
export type BirthdayOptionalInput = z.infer<typeof BirthdayOptionalSchema>

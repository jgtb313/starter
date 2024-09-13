import { z } from '@/zod'
import { isString, isValidDate } from '@starter/shared'

export const DateSchema = z
  .string()
  .or(z.date())
  .refine(isValidDate)
  .transform((value) => {
    if (isString(value)) {
      return value.includes('/') ? new Date(value.split('/').reverse().join('-')) : new Date(value)
    }

    return new Date(value)
  })
export type DateInput = z.infer<typeof DateSchema>

export const DateOptionalSchema = z
  .string()
  .or(z.date())
  .nullish()
  .refine((value) => (value ? isValidDate(value) : true))
  .transform((value) => {
    if (!value) {
      return null
    }

    if (isString(value)) {
      return value.includes('/') ? new Date(value.split('/').reverse().join('-')) : new Date(value)
    }

    return new Date(value)
  })
export type DateOptionalInput = z.infer<typeof DateOptionalSchema>

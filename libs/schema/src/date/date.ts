import { z } from '@/zod'
import { isValidDate, getDate } from '@starter/common'

export const DateSchema = z
  .string()
  .or(z.iso.datetime().transform((value) => new Date(value)))
  .refine(isValidDate)
  .transform(getDate)

export const DateOptionalSchema = z
  .string()
  .or(z.iso.datetime().transform((value) => new Date(value)))
  .nullish()
  .refine((value) => (value ? isValidDate(value) : true))
  .transform((value) => {
    if (!value) {
      return null
    }

    return getDate(value)
  })

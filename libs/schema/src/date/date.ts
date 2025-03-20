import { z } from '@/zod'
import { isValidDate, getDate } from '@starter/common'

export const DateSchema = z.string().or(z.date()).refine(isValidDate).transform(getDate)

export const DateOptionalSchema = z
  .string()
  .or(z.date())
  .nullish()
  .refine((value) => (value ? isValidDate(value) : true), { params: { i18n: 'invalid_date' } })
  .transform((value) => {
    if (!value) {
      return null
    }

    return getDate(value)
  })

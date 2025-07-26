import { z } from 'zod'

export const SortEnum = {
  asc: 1,
  desc: -1,
} as const

export const SortSchema = (allowedFields: string[]) =>
  z
    .union([z.string().trim(), z.null(), z.undefined()])
    .transform((value) => (value === '' || value == null ? undefined : value))
    .refine((value) => value === undefined || value.includes(':'))
    .refine((value) => {
      if (value === undefined) return true
      const [field] = value.split(':')
      return allowedFields.includes(field)
    })
    .refine((value) => {
      if (value === undefined) return true
      const [_, order] = value.split(':')
      return ['asc', 'desc'].includes(order)
    })
    .transform((value) => {
      if (value === undefined) return undefined
      const [field, order] = value.split(':')
      return { [field]: SortEnum[order as keyof typeof SortEnum] }
    })

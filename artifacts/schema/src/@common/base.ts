import { isString } from '@starter/shared'

import { z } from '@/zod'

export const ID = z.string().openapi({
  description: 'Unique identifier for the resource',
  example: '2i27UIp5E4Wz6ZI8bfpBcgaRiez'
})

export const FilterableSchema = (fields: string[], options: { example: string }) =>
  z
    .string()
    .optional()
    .openapi({
      description: `Generic filter that can match against \n ${fields.map((field) => '- '.concat(field)).join('\n')}`,
      example: options.example
    })

export const BooleanSchema = z
  .boolean()
  .or(z.string())
  .default(false)
  .transform((value) => (isString(value) ? value === 'true' : value))

export const CreatedAtSchema = z.date()

export const UpdatedAtSchema = z.date()

export const DeletedAtSchema = z
  .date()
  .nullish()
  .transform((value) => (value === undefined ? null : value))

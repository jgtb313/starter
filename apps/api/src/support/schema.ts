import { z } from '@starter/schema'

export const FilterSchema = (fields: string[], options?: { example: string }) =>
  z
    .string()
    .optional()
    .meta({
      description: `Generic filter that can match against \n ${fields.map((field) => '- '.concat(field)).join('\n')}`,
      example: options?.example,
    })
export type Filter = {
  filter?: z.infer<ReturnType<typeof FilterSchema>>
}

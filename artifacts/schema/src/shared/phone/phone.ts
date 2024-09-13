import { z } from '@/zod'
import { clearSpecialChars, isPhone } from '@starter/shared'

export const PhoneSchema = z
  .object({
    iso: z.string().min(1).openapi({ description: 'The ISO 3166-1 country code.', example: 'BR' }),
    ddi: z.string().min(1).openapi({ description: 'The international dialing code for the country, prefixed by the plus sign (+).', example: '+55' }),
    number: z
      .string()
      .min(1)
      .transform((value) => clearSpecialChars(value).trim())
  })
  .refine((value) => isPhone(value), { path: ['number'] })
export type PhoneInput = z.infer<typeof PhoneSchema>

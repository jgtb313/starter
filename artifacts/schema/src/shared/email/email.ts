import { z } from '@/zod'

export const EmailSchema = z
  .string()
  .min(1)
  .email()
  .transform((value) => value.toLowerCase())
  .openapi({
    example: 'example@email.com'
  })
export type EmailInput = z.infer<typeof EmailSchema>

import { z } from '@/zod'

export const RecaptchaSchema = z.object({
  recaptcha: z.string().min(1)
})

export type RecaptchaInput = z.infer<typeof RecaptchaSchema>
export type WithRecaptcha<T> = T & z.infer<typeof RecaptchaSchema>

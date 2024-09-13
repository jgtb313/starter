import { z } from '@/zod'

export const PasswordSchema = z.string().min(8).trim()
export type PasswordInput = z.infer<typeof PasswordSchema>

import { z } from '@/zod'

import { PasswordSchema } from '@/common'
import { UserSchema } from '../user/User.schema'
import { SocialAuthEnum } from './Auth.enums'

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})
export const SignInSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SignInInput = z.infer<typeof SignInSchema>
export type SignInOutput = z.infer<typeof SignInSchemaOutput>

export const SocialSignOnSchema = z.object({
  context: z.nativeEnum(SocialAuthEnum),
  providerToken: z.string().min(1),
})
export const SocialSignOnSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SocialSignOnInput = z.infer<typeof SocialSignOnSchema>
export type SocialSignOnOutput = z.infer<typeof SocialSignOnSchemaOutput>

export const SignUpSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
})
export const SignUpSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignUpOutput = z.infer<typeof SignUpSchemaOutput>

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1).email(),
  password: PasswordSchema,
})
export const ForgotPasswordSchemaOutput = z.object({
  accessToken: z.string(),
})
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>
export type ForgotPasswordOutput = z.infer<typeof ForgotPasswordSchemaOutput>

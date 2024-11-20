import { z } from '@/zod'

import { PasswordSchema } from '@/common'
import { UserSchema } from '../user/User.schema'
import { SocialSignInEnum } from './Auth.enums'

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})
export const SignInSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SignInInput = z.infer<typeof SignInSchema>
export type SignInOutput = z.infer<typeof SignInSchemaOutput>

export const SocialSignInSchema = z.object({
  context: z.nativeEnum(SocialSignInEnum),
  providerToken: z.string().min(1),
})
export const SocialSignInSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SocialSignInInput = z.infer<typeof SocialSignInSchema>
export type SocialSignInOutput = z.infer<typeof SocialSignInSchemaOutput>

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

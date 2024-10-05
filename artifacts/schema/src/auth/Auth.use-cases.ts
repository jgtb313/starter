import { z } from '@/zod'

import { UserSchema } from '../user/User.schema'
import { SocialSignInEnum } from './Auth.enums'

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1)
})
export const SignInSchemaOutput = z.object({
  token: z.string()
})
export type SignInInput = z.infer<typeof SignInSchema>
export type SignInOutput = z.infer<typeof SignInSchemaOutput>

export const SocialSignInSchema = z.object({
  context: z.nativeEnum(SocialSignInEnum),
  token: z.string().min(1)
})
export const SocialSignInSchemaOutput = z.object({
  token: z.string()
})
export type SocialSignInInput = z.infer<typeof SocialSignInSchema>
export type SocialSignInOutput = z.infer<typeof SocialSignInSchemaOutput>

export const SignUpSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true
})
export const SignUpSchemaOutput = z.object({
  token: z.string()
})
export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignUpOutput = z.infer<typeof SignUpSchemaOutput>

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1).email()
})
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>
export type ForgotPasswordOutput = void

export const RecoverPasswordSchema = z.object({
  recoverPasswordToken: z.string().min(1),
  password: z.string().min(1)
})
export type RecoverPasswordInput = z.infer<typeof RecoverPasswordSchema>
export type RecoverPasswordOutput = void

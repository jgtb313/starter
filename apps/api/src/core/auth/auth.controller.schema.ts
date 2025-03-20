import { z, PasswordSchema } from '@starter/schema'
import { UserSchema, OTPSchema } from '@starter/domain'

import { SocialAuthEnum } from '@/ports/social-auth'

export const OTPVerificationSchema = z.object({
  otpVerification: OTPSchema.pick({
    otpId: true,
  }).and(
    z.object({
      code: z.string().min(4).max(4),
    }),
  ),
})

export const SignInBodySchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})
export const SignInSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SignInBodyInput = z.infer<typeof SignInBodySchema>

export const PasswordLessBodySchema = z
  .object({
    email: z.string().min(1).email(),
  })
  .merge(OTPVerificationSchema)
export const PasswordLessSchemaOutput = z.object({
  accessToken: z.string(),
})
export type PasswordLessBodyInput = z.infer<typeof PasswordLessBodySchema>

export const SocialSignOnBodySchema = z.object({
  context: z.nativeEnum(SocialAuthEnum),
  providerToken: z.string().min(1),
})
export const SocialSignOnSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SocialSignOnBodyInput = z.infer<typeof SocialSignOnBodySchema>

export const SignUpBodySchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
})
export const SignUpSchemaOutput = z.object({
  accessToken: z.string(),
})
export type SignUpBodyInput = z.infer<typeof SignUpBodySchema>

export const ForgotPasswordBodySchema = z
  .object({
    email: z.string().min(1).email(),
    password: PasswordSchema,
  })
  .merge(OTPVerificationSchema)
export const ForgotPasswordSchemaOutput = z.object({
  accessToken: z.string(),
})
export type ForgotPasswordBodyInput = z.infer<typeof ForgotPasswordBodySchema>

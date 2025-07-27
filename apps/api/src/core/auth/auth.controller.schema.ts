import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { UserSchema, OTPSchema } from '@starter/domain'
import { z, PasswordSchema, EmailSchema } from '@starter/schema'

import { SocialAuthEnum } from '@/ports/social-auth'

const OTPVerificationSchema = z.object({
  otpVerification: OTPSchema.pick({
    otpId: true,
  }).and(
    z.object({
      code: z.string().min(4).max(4).meta({ example: '0000' }),
    }),
  ),
})

export const SignInSchema = createRequestSchema({
  body: z.object({
    email: EmailSchema,
    password: z.string().min(1),
  }),
  output: z.object({
    accessToken: z.string(),
  }),
})
export type SignInRequest = RequestInput<typeof SignInSchema>

export const PasswordLessSchema = createRequestSchema({
  body: z
    .object({
      email: EmailSchema,
    })
    .and(OTPVerificationSchema),
  output: z.object({
    accessToken: z.string(),
  }),
})
export type PasswordLessRequest = RequestInput<typeof PasswordLessSchema>

export const SocialSignOnSchema = createRequestSchema({
  body: z.object({
    context: z.nativeEnum(SocialAuthEnum),
    providerToken: z.string().min(1),
  }),
  output: z.object({
    accessToken: z.string(),
  }),
})
export type SocialSignOnRequest = RequestInput<typeof SocialSignOnSchema>

export const SignUpSchema = createRequestSchema({
  body: UserSchema.pick({
    name: true,
    email: true,
    password: true,
  }),
  output: z.object({
    accessToken: z.string(),
  }),
})
export type SignUpRequest = RequestInput<typeof SignUpSchema>

export const ForgotPasswordSchema = createRequestSchema({
  body: z
    .object({
      email: EmailSchema,
      password: PasswordSchema,
    })
    .and(OTPVerificationSchema),
  output: z.object({
    accessToken: z.string(),
  }),
})
export type ForgotPasswordRequest = RequestInput<typeof ForgotPasswordSchema>

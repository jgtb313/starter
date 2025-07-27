import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { UserSchema, OTPSchema } from '@starter/domain'
import { z, PhoneSchema } from '@starter/schema'

export const ProfileSchema = UserSchema.omit({ password: true })

const OTPVerificationSchema = z.object({
  otpVerification: OTPSchema.pick({
    otpId: true,
  }).and(
    z.object({
      code: z.string().min(4).max(4),
    }),
  ),
})

export const GetProfileSchema = createRequestSchema({
  query: z.object({}),
  output: ProfileSchema,
})
export type GetProfileRequest = RequestInput<typeof GetProfileSchema>

export const UpdateProfileSchema = createRequestSchema({
  body: ProfileSchema.pick({
    name: true,
    avatar: true,
  }).partial(),
  output: ProfileSchema,
})
export type UpdateProfileRequest = RequestInput<typeof UpdateProfileSchema>

export const UpdateProfileEmailSchema = createRequestSchema({
  body: ProfileSchema.pick({
    email: true,
  }).and(OTPVerificationSchema),
  output: ProfileSchema,
})
export type UpdateProfileEmailRequest = RequestInput<typeof UpdateProfileEmailSchema>

export const UpdateProfilePhoneSchema = createRequestSchema({
  body: z
    .object({
      phone: PhoneSchema,
    })
    .and(OTPVerificationSchema),
  output: ProfileSchema,
})
export type UpdateProfilePhoneRequest = RequestInput<typeof UpdateProfilePhoneSchema>

export const UpdateProfilePasswordSchema = createRequestSchema({
  body: UserSchema.pick({
    password: true,
  }).and(
    z.object({
      currentPassword: z.string().min(1),
    }),
  ),
})
export type UpdateProfilePasswordRequest = RequestInput<typeof UpdateProfilePasswordSchema>

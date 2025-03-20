import { z, PhoneSchema } from '@starter/schema'
import { UserSchema, OTPSchema } from '@starter/domain'

export const ProfileSchema = UserSchema.omit({ password: true })

export const OTPVerificationSchema = z.object({
  otpVerification: OTPSchema.pick({
    otpId: true,
  }).and(
    z.object({
      code: z.string().min(4).max(4),
    }),
  ),
})

export const GetProfileSchemaOutput = ProfileSchema

export const UpdateProfileSchema = ProfileSchema.pick({
  name: true,
  avatar: true,
}).partial()
export const UpdateProfileSchemaOutput = ProfileSchema
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>

export const UpdateProfileEmailSchema = ProfileSchema.pick({
  email: true,
}).merge(OTPVerificationSchema)
export const UpdateProfileEmailSchemaOutput = ProfileSchema
export type UpdateProfileEmailInput = z.infer<typeof UpdateProfileEmailSchema>

export const UpdateProfilePhoneSchema = z
  .object({
    phone: PhoneSchema,
  })
  .merge(OTPVerificationSchema)
export const UpdateProfilePhoneSchemaOutput = ProfileSchema
export type UpdateProfilePhoneInput = z.infer<typeof UpdateProfilePhoneSchema>

export const UpdateProfilePasswordSchema = UserSchema.pick({
  password: true,
}).merge(
  z.object({
    currentPassword: z.string().min(1),
  }),
)
export type UpdateProfilePasswordInput = z.infer<typeof UpdateProfilePasswordSchema>

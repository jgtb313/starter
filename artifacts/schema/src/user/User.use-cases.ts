import { z } from '@/zod'

import { PhoneSchema } from '@/common'
import { UserSchema, ProfileSchema } from './User.schema'

export const GetUserByIdSchema = UserSchema.pick({
  id: true,
})
export const GetUserByIdSchemaOutput = ProfileSchema
export type GetUserByIdInput = z.infer<typeof GetUserByIdSchema>
export type GetUserByIdOutput = z.infer<typeof GetUserByIdSchemaOutput>

export const GetUserByEmailSchema = UserSchema.pick({
  email: true,
})
export const GetUserByEmailSchemaOutput = ProfileSchema.optional()
export type GetUserByEmailInput = z.infer<typeof GetUserByEmailSchema>
export type GetUserByEmailOutput = z.infer<typeof GetUserByEmailSchemaOutput>

export const UpdateUserSchema = UserSchema.pick({
  id: true,
}).merge(
  UserSchema.pick({
    name: true,
    avatar: true,
  }).partial(),
)
export const UpdateUserSchemaOutput = ProfileSchema
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type UpdateUserOutput = z.infer<typeof UpdateUserSchemaOutput>

export const UpdateUserEmailSchema = UserSchema.pick({
  id: true,
  email: true,
})
export const UpdateUserEmailSchemaOutput = ProfileSchema
export type UpdateUserEmailInput = z.infer<typeof UpdateUserEmailSchema>
export type UpdateUserEmailOutput = z.infer<typeof UpdateUserEmailSchemaOutput>

export const UpdateUserPhoneSchema = UserSchema.pick({
  id: true,
}).merge(
  z.object({
    phone: PhoneSchema,
  }),
)
export const UpdateUserPhoneSchemaOutput = ProfileSchema
export type UpdateUserPhoneInput = z.infer<typeof UpdateUserPhoneSchema>
export type UpdateUserPhoneOutput = z.infer<typeof UpdateUserPhoneSchemaOutput>

export const UpdateUserPasswordSchema = UserSchema.pick({
  id: true,
  password: true,
}).merge(
  z.object({
    currentPassword: z.string().min(1),
  }),
)
export type UpdateUserPasswordInput = z.infer<typeof UpdateUserPasswordSchema>
export type UpdateUserPasswordOutput = void

export const UserPasswordVerificationSchema = UserSchema.pick({
  id: true,
}).merge(
  z.object({
    password: z.string().min(1),
  }),
)
export type UserPasswordVerificationInput = z.infer<typeof UserPasswordVerificationSchema>
export type UserPasswordVerificationOutput = void

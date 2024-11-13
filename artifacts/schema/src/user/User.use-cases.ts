import { z } from '@/zod'

import { PhoneSchema } from '@/common'
import { UserSchema } from './User.schema'

export const GetUserByEmailSchema = UserSchema.pick({
  email: true,
})
export const GetUserByEmailSchemaOutput = UserSchema.pick({ id: true, email: true })
export type GetUserByEmailInput = z.infer<typeof GetUserByEmailSchema>
export type GetUserByEmailOutput = z.infer<typeof GetUserByEmailSchemaOutput> | undefined

export const GetUserByIdSchema = UserSchema.pick({
  id: true,
})
export const GetUserByIdSchemaOutput = UserSchema
export type GetUserByIdInput = z.infer<typeof GetUserByIdSchema>
export type GetUserByIdOutput = z.infer<typeof GetUserByIdSchemaOutput>

export const UpdateUserSchema = UserSchema.pick({
  id: true,
}).merge(
  UserSchema.pick({
    name: true,
    avatar: true,
  }).partial(),
)
export const UpdateUserSchemaOutput = UserSchema
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type UpdateUserOutput = z.infer<typeof UpdateUserSchemaOutput>

export const UpdateUserEmailSchema = UserSchema.pick({
  id: true,
  email: true,
})
export type UpdateUserEmailInput = z.infer<typeof UpdateUserEmailSchema>
export type UpdateUserEmailOutput = void

export const UpdateUserPhoneSchema = UserSchema.pick({
  id: true,
}).merge(
  z.object({
    phone: PhoneSchema,
  }),
)
export type UpdateUserPhoneInput = z.infer<typeof UpdateUserPhoneSchema>
export type UpdateUserPhoneOutput = void

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

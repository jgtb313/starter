import { z } from '@/zod'

import { PaginationSchema, BasePaginationSchemaOutput, PhoneSchema } from '@/common'
import { UserSchema } from './User.schema'

export const ListUserSchema = UserSchema.pick({}).and(PaginationSchema)
export const ListUserSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(UserSchema).default([]) })
export type ListUserInput = z.infer<typeof ListUserSchema>
export type ListUserOutput = z.infer<typeof ListUserSchemaOutput>

export const GetUserMeSchema = UserSchema.pick({
  id: true,
})
export const GetUserMeSchemaOutput = UserSchema
export type GetUserMeInput = z.infer<typeof GetUserMeSchema>
export type GetUserMeOutput = z.infer<typeof GetUserMeSchemaOutput>

export const UpdateUserMeSchema = UserSchema.pick({
  id: true,
}).merge(
  UserSchema.pick({
    name: true,
  }).partial(),
)
export const UpdateUserMeSchemaOutput = UserSchema
export type UpdateUserMeInput = z.infer<typeof UpdateUserMeSchema>
export type UpdateUserMeOutput = z.infer<typeof UpdateUserMeSchemaOutput>

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

import { z } from '@/zod'

import { ID, PaginationSchema, BasePaginationSchemaOutput, PhoneSchema } from '@/common'
import { WorkspaceSchema } from '../workspace/Workspace.schema'
import { UserSchema } from './User.schema'

export const ListUserSchema = UserSchema.pick({}).and(PaginationSchema)
export const ListUserSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(UserSchema).default([]) })
export type ListUserInput = z.infer<typeof ListUserSchema>
export type ListUserOutput = z.infer<typeof ListUserSchemaOutput>

export const GetUserSchema = UserSchema.pick({
  id: true,
})
export const GetUserSchemaOutput = UserSchema
export type GetUserInput = z.infer<typeof GetUserSchema>
export type GetUserOutput = z.infer<typeof GetUserSchemaOutput>

export const GetUserMeSchema = UserSchema.pick({
  id: true,
})
export const GetUserMeSchemaOutput = z.object({
  workspace: WorkspaceSchema,
  user: UserSchema,
})
export type GetUserMeInput = z.infer<typeof GetUserMeSchema>
export type GetUserMeOutput = z.infer<typeof GetUserMeSchemaOutput>

export const CreateUserSchema = UserSchema.pick({
  name: true,
  email: true,
}).merge(
  z.object({
    relationships: z.array(z.object({ roleId: ID, storeId: ID })),
  }),
)
export const CreateUserSchemaOutput = UserSchema
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type CreateUserOutput = z.infer<typeof CreateUserSchemaOutput>

export const UpdateUserSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
}).merge(
  z.object({
    relationships: z.array(z.object({ roleId: ID, storeId: ID })),
  }),
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

export const DeleteUserSchema = UserSchema.pick({
  id: true,
})
export type DeleteUserInput = z.infer<typeof DeleteUserSchema>
export type DeleteUserOutput = void

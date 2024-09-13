import { z } from '@/zod'

import { ID, PaginationSchema, BasePaginationSchemaOutput } from '@/@common'
import { StoreSchema } from '..//store/Store.schema'
import { UserSchema } from './User.schema'

export const ListUserSchema = UserSchema.pick({}).and(PaginationSchema)
export const ListUserSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(UserSchema).default([]) })
export type ListUserInput = z.infer<typeof ListUserSchema>
export type ListUserOutput = z.infer<typeof ListUserSchemaOutput>

export const GetUserSchema = UserSchema.pick({
  id: true
})
export const GetUserSchemaOutput = UserSchema
export type GetUserInput = z.infer<typeof GetUserSchema>
export type GetUserOutput = z.infer<typeof GetUserSchemaOutput>

export const GetUserMeSchema = UserSchema.pick({
  id: true
})
export const GetUserMeSchemaOutput = z.object({
  store: StoreSchema,
  user: UserSchema
})
export type GetUserMeInput = z.infer<typeof GetUserMeSchema>
export type GetUserMeOutput = z.infer<typeof GetUserMeSchemaOutput>

export const CreateUserSchema = UserSchema.pick({
  name: true,
  email: true
}).merge(
  z.object({
    relationships: z.array(z.object({ roleId: ID, storeId: ID }))
  })
)
export const CreateUserSchemaOutput = UserSchema
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type CreateUserOutput = z.infer<typeof CreateUserSchemaOutput>

export const UpdateUserSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true
}).merge(
  z.object({
    relationships: z.array(z.object({ roleId: ID, storeId: ID }))
  })
)
export const UpdateUserSchemaOutput = UserSchema
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type UpdateUserOutput = z.infer<typeof UpdateUserSchemaOutput>

export const DeleteUserSchema = UserSchema.pick({
  id: true
})
export type DeleteUserInput = z.infer<typeof DeleteUserSchema>
export type DeleteUserOutput = void

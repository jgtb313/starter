import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'
import { UserSchema } from '@starter/domain'

import { FilterSchema } from '@/support/schema'

export const ListUsersParamsSchema = z.object({
  workspaceId: z.string().uuid(),
})
export const ListUsersQuerySchema = UserSchema.pick({
  name: true,
  status: true,
})
  .partial()
  .merge(
    z
      .object({
        filter: FilterSchema(['name', 'email'], { example: 'John Doe' }),
      })
      .partial(),
  )
  .merge(PaginationSchema)
export const ListUsersSchemaOutput = BasePaginationSchemaOutput.merge(z.object({ values: z.array(UserSchema) }))
export type ListUsersParamsInput = z.infer<typeof ListUsersParamsSchema>
export type ListUsersQueryInput = z.infer<typeof ListUsersQuerySchema>

export const GetUserParamsSchema = UserSchema.pick({
  userId: true,
}).and(
  z.object({
    workspaceId: z.string().uuid(),
  }),
)
export const GetUserSchemaOutput = UserSchema
export type GetUserParamsInput = z.infer<typeof GetUserParamsSchema>

export const CreateUserParamsSchema = z.object({
  workspaceId: z.string().uuid(),
})
export const CreateUserBodySchema = UserSchema.pick({
  roleIds: true,
  permissions: true,
  name: true,
  email: true,
  phone: true,
  avatar: true,
  password: true,
})
export const CreateUserSchemaOutput = UserSchema
export type CreateUserParamsInput = z.infer<typeof CreateUserParamsSchema>
export type CreateUserBodyInput = z.infer<typeof CreateUserBodySchema>

export const UpdateUserParamsSchema = UserSchema.pick({ userId: true }).and(
  z.object({
    workspaceId: z.string().uuid(),
  }),
)
export const UpdateUserBodySchema = UserSchema.pick({
  name: true,
  status: true,
}).partial()
export const UpdateUserSchemaOutput = UserSchema
export type UpdateUserParamsInput = z.infer<typeof UpdateUserParamsSchema>
export type UpdateUserBodyInput = z.infer<typeof UpdateUserBodySchema>

export const DeleteUserParamsSchema = UserSchema.pick({
  userId: true,
}).and(
  z.object({
    workspaceId: z.string().uuid(),
  }),
)
export type DeleteUserParamsInput = z.infer<typeof DeleteUserParamsSchema>

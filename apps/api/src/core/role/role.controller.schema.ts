import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'
import { RoleSchema } from '@starter/domain'

import { FilterSchema } from '@/support/schema'

export const ListRolesParamsSchema = RoleSchema.pick({
  workspaceId: true,
})
export const ListRolesQuerySchema = RoleSchema.pick({
  name: true,
  status: true,
})
  .partial()
  .merge(
    z
      .object({
        filter: FilterSchema(['name', 'status'], { example: 'Acme' }),
      })
      .partial(),
  )
  .merge(PaginationSchema)
export const ListRolesSchemaOutput = BasePaginationSchemaOutput.merge(z.object({ values: z.array(RoleSchema) }))
export type ListRolesParamsInput = z.infer<typeof ListRolesParamsSchema>
export type ListRolesQueryInput = z.infer<typeof ListRolesQuerySchema>

export const GetRoleParamsSchema = RoleSchema.pick({
  workspaceId: true,
  roleId: true,
})
export const GetRoleSchemaOutput = RoleSchema
export type GetRoleParamsInput = z.infer<typeof GetRoleParamsSchema>

export const CreateRoleParamsSchema = RoleSchema.pick({
  workspaceId: true,
})
export const CreateRoleBodySchema = RoleSchema.pick({
  name: true,
  tags: true,
  permissions: true,
  status: true,
})
export const CreateRoleSchemaOutput = RoleSchema
export type CreateRoleParamsInput = z.infer<typeof CreateRoleParamsSchema>
export type CreateRoleBodyInput = z.infer<typeof CreateRoleBodySchema>

export const UpdateRoleParamsSchema = RoleSchema.pick({ workspaceId: true, roleId: true })
export const UpdateRoleBodySchema = RoleSchema.pick({
  name: true,
  tags: true,
  permissions: true,
}).partial()
export const UpdateRoleSchemaOutput = RoleSchema
export type UpdateRoleParamsInput = z.infer<typeof UpdateRoleParamsSchema>
export type UpdateRoleBodyInput = z.infer<typeof UpdateRoleBodySchema>

export const DeleteRoleParamsSchema = RoleSchema.pick({
  workspaceId: true,
  roleId: true,
})
export type DeleteRoleParamsInput = z.infer<typeof DeleteRoleParamsSchema>

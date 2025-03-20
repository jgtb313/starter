import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'
import { OrganizationSchema } from '@starter/domain'

import { FilterSchema } from '@/support/schema'

export const ListOrganizationsParamsSchema = OrganizationSchema.pick({
  workspaceId: true,
})
export const ListOrganizationsQuerySchema = OrganizationSchema.pick({
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
export const ListOrganizationsSchemaOutput = BasePaginationSchemaOutput.merge(z.object({ values: z.array(OrganizationSchema) }))
export type ListOrganizationsParamsInput = z.infer<typeof ListOrganizationsParamsSchema>
export type ListOrganizationsQueryInput = z.infer<typeof ListOrganizationsQuerySchema>

export const GetOrganizationParamsSchema = OrganizationSchema.pick({
  workspaceId: true,
  organizationId: true,
})
export const GetOrganizationSchemaOutput = OrganizationSchema
export type GetOrganizationParamsInput = z.infer<typeof GetOrganizationParamsSchema>

export const CreateOrganizationParamsSchema = OrganizationSchema.pick({
  workspaceId: true,
})
export const CreateOrganizationBodySchema = OrganizationSchema.pick({
  name: true,
  status: true,
})
export const CreateOrganizationSchemaOutput = OrganizationSchema
export type CreateOrganizationParamsInput = z.infer<typeof CreateOrganizationParamsSchema>
export type CreateOrganizationBodyInput = z.infer<typeof CreateOrganizationBodySchema>

export const UpdateOrganizationParamsSchema = OrganizationSchema.pick({ workspaceId: true, organizationId: true })
export const UpdateOrganizationBodySchema = OrganizationSchema.pick({
  name: true,
  status: true,
}).partial()
export const UpdateOrganizationSchemaOutput = OrganizationSchema
export type UpdateOrganizationParamsInput = z.infer<typeof UpdateOrganizationParamsSchema>
export type UpdateOrganizationBodyInput = z.infer<typeof UpdateOrganizationBodySchema>

export const DeleteOrganizationParamsSchema = OrganizationSchema.pick({
  workspaceId: true,
  organizationId: true,
})
export type DeleteOrganizationParamsInput = z.infer<typeof DeleteOrganizationParamsSchema>

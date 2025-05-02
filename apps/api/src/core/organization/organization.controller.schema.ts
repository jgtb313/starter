import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { OrganizationSchema } from '@starter/domain'
import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'

import { FilterSchema } from '@/support/schema'

export const ListOrganizationsSchema = createRequestSchema({
  params: OrganizationSchema.pick({
    workspaceId: true,
  }),
  query: OrganizationSchema.pick({
    name: true,
    status: true,
  })
    .partial()
    .extend(
      z
        .object({
          filter: FilterSchema(['name', 'status'], { example: 'Acme' }),
        })
        .partial(),
    )
    .and(PaginationSchema),
  output: BasePaginationSchemaOutput.extend(z.object({ values: z.array(OrganizationSchema) })),
})
export type ListOrganizationsRequest = RequestInput<typeof ListOrganizationsSchema>

export const GetOrganizationSchema = createRequestSchema({
  params: OrganizationSchema.pick({
    workspaceId: true,
    organizationId: true,
  }),
  output: OrganizationSchema,
})
export type GetOrganizationRequest = RequestInput<typeof GetOrganizationSchema>

export const CreateOrganizationSchema = createRequestSchema({
  params: OrganizationSchema.pick({
    workspaceId: true,
  }),
  body: OrganizationSchema.pick({
    name: true,
    status: true,
  }),
  output: OrganizationSchema,
})
export type CreateOrganizationRequest = RequestInput<typeof CreateOrganizationSchema>

export const UpdateOrganizationSchema = createRequestSchema({
  params: OrganizationSchema.pick({
    workspaceId: true,
    organizationId: true,
  }),
  body: OrganizationSchema.pick({
    name: true,
    status: true,
  }).partial(),
  output: OrganizationSchema,
})
export type UpdateOrganizationRequest = RequestInput<typeof UpdateOrganizationSchema>

export const DeleteOrganizationSchema = createRequestSchema({
  params: OrganizationSchema.pick({
    workspaceId: true,
    organizationId: true,
  }),
})
export type DeleteOrganizationRequest = RequestInput<typeof DeleteOrganizationSchema>

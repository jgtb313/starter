import { z } from '@/zod'

import { FilterableSchema, PaginationSchema, BasePaginationSchemaOutput, SortSchema } from '@/common'
import { OrganizationSchema } from './Organization.schema'

export const IndexOrganizationsSchema = OrganizationSchema.pick({})
  .partial()
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name', 'slug'], { example: 'FutureTech Solutions' })
      })
      .partial()
  )
export const IndexOrganizationsSchemaOutput = z.array(OrganizationSchema)
export type IndexOrganizationsInput = z.infer<typeof IndexOrganizationsSchema>
export type IndexOrganizationsOutput = Promise<z.infer<typeof IndexOrganizationsSchemaOutput>>

export const ListOrganizationsSchema = OrganizationSchema.pick({})
  .and(PaginationSchema)
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name', 'slug'], { example: 'FutureTech Solutions' })
      })
      .partial()
  )
export const ListOrganizationsSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(OrganizationSchema).default([]) })
export type ListOrganizationsInput = z.infer<typeof ListOrganizationsSchema>
export type ListOrganizationsOutput = Promise<z.infer<typeof ListOrganizationsSchemaOutput>>

export const GetOrganizationByIdSchema = OrganizationSchema.pick({
  id: true
})
export const GetOrganizationByIdSchemaOutput = OrganizationSchema
export type GetOrganizationByIdInput = z.infer<typeof GetOrganizationByIdSchema>
export type GetOrganizationByIdOutput = Promise<z.infer<typeof GetOrganizationByIdSchemaOutput>>

export const CreateOrganizationSchema = OrganizationSchema.pick({
  workspaceId: true,
  name: true,
  slug: true
})
export const CreateOrganizationSchemaOutput = OrganizationSchema
export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>
export type CreateOrganizationOutput = Promise<z.infer<typeof CreateOrganizationSchemaOutput>>

export const UpdateOrganizationSchema = OrganizationSchema.pick({
  id: true
}).and(
  OrganizationSchema.pick({
    workspaceId: true,
    name: true,
    slug: true
  }).partial()
)
export const UpdateOrganizationSchemaOutput = OrganizationSchema
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>
export type UpdateOrganizationOutput = Promise<z.infer<typeof UpdateOrganizationSchemaOutput>>

export const ActiveOrganizationSchema = OrganizationSchema.pick({
  id: true
})
export const ActiveOrganizationSchemaOutput = OrganizationSchema
export type ActiveOrganizationInput = z.infer<typeof ActiveOrganizationSchema>
export type ActiveOrganizationOutput = Promise<z.infer<typeof ActiveOrganizationSchemaOutput>>

export const InactiveOrganizationSchema = OrganizationSchema.pick({
  id: true
})
export const InactiveOrganizationSchemaOutput = OrganizationSchema
export type InactiveOrganizationInput = z.infer<typeof InactiveOrganizationSchema>
export type InactiveOrganizationOutput = Promise<z.infer<typeof InactiveOrganizationSchema>>

export const DeleteOrganizationSchema = OrganizationSchema.pick({
  id: true
})
export const DeleteOrganizationSchemaOutput = OrganizationSchema
export type DeleteOrganizationInput = z.infer<typeof DeleteOrganizationSchema>
export type DeleteOrganizationOutput = Promise<z.infer<typeof DeleteOrganizationSchema>>

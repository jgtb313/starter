import { z } from '@/zod'

import { FilterableSchema, PaginationSchema, BasePaginationSchemaOutput, SortSchema } from '@/common'
import { WorkspaceSchema } from './Workspace.schema'

export const IndexWorkspacesSchema = WorkspaceSchema.pick({})
  .partial()
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name', 'domain'], { example: 'Global Innovations Alliance' })
      })
      .partial()
  )
export const IndexWorkspacesSchemaOutput = z.array(WorkspaceSchema)
export type IndexWorkspacesInput = z.infer<typeof IndexWorkspacesSchema>
export type IndexWorkspacesOutput = Promise<z.infer<typeof IndexWorkspacesSchemaOutput>>

export const ListWorkspacesSchema = WorkspaceSchema.pick({})
  .and(PaginationSchema)
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name', 'domain'], { example: 'Global Innovations Alliance' })
      })
      .partial()
  )
export const ListWorkspacesSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(WorkspaceSchema).default([]) })
export type ListWorkspacesInput = z.infer<typeof ListWorkspacesSchema>
export type ListWorkspacesOutput = Promise<z.infer<typeof ListWorkspacesSchemaOutput>>

export const GetWorkspaceByIdSchema = WorkspaceSchema.pick({
  id: true
})
export const GetWorkspaceByIdSchemaOutput = WorkspaceSchema
export type GetWorkspaceByIdInput = z.infer<typeof GetWorkspaceByIdSchema>
export type GetWorkspaceByIdOutput = Promise<z.infer<typeof GetWorkspaceByIdSchemaOutput>>

export const CreateWorkspaceSchema = WorkspaceSchema.pick({})
export const CreateWorkspaceSchemaOutput = WorkspaceSchema
export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>
export type CreateWorkspaceOutput = Promise<z.infer<typeof CreateWorkspaceSchemaOutput>>

export const UpdateWorkspaceSchema = WorkspaceSchema.pick({
  id: true
}).and(WorkspaceSchema.pick({}).partial())
export const UpdateWorkspaceSchemaOutput = WorkspaceSchema
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>
export type UpdateWorkspaceOutput = Promise<z.infer<typeof UpdateWorkspaceSchemaOutput>>

export const ActiveWorkspaceSchema = WorkspaceSchema.pick({
  id: true
})
export const ActiveWorkspaceSchemaOutput = WorkspaceSchema
export type ActiveWorkspaceInput = z.infer<typeof ActiveWorkspaceSchema>
export type ActiveWorkspaceOutput = Promise<z.infer<typeof ActiveWorkspaceSchemaOutput>>

export const InactiveWorkspaceSchema = WorkspaceSchema.pick({
  id: true
})
export const InactiveWorkspaceSchemaOutput = WorkspaceSchema
export type InactiveWorkspaceInput = z.infer<typeof InactiveWorkspaceSchema>
export type InactiveWorkspaceOutput = Promise<z.infer<typeof InactiveWorkspaceSchema>>

export const DeleteWorkspaceSchema = WorkspaceSchema.pick({
  id: true
})
export const DeleteWorkspaceSchemaOutput = WorkspaceSchema
export type DeleteWorkspaceInput = z.infer<typeof DeleteWorkspaceSchema>
export type DeleteWorkspaceOutput = Promise<z.infer<typeof DeleteWorkspaceSchema>>

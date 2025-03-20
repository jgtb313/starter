import { z } from '@starter/schema'
import { WorkspaceSchema } from '@starter/domain'

export const GetWorkspaceParamsSchema = WorkspaceSchema.pick({
  workspaceId: true,
})
export const GetWorkspaceSchemaOutput = WorkspaceSchema
export type GetWorkspaceParamsInput = z.infer<typeof GetWorkspaceParamsSchema>

export const CreateWorkspaceBodySchema = WorkspaceSchema.pick({
  name: true,
})
export const CreateWorkspaceSchemaOutput = WorkspaceSchema
export type CreateWorkspaceBodyInput = z.infer<typeof CreateWorkspaceBodySchema>

export const UpdateWorkspaceParamsSchema = WorkspaceSchema.pick({ workspaceId: true })
export const UpdateWorkspaceBodySchema = WorkspaceSchema.pick({
  name: true,
  status: true,
}).partial()
export const UpdateWorkspaceSchemaOutput = WorkspaceSchema
export type UpdateWorkspaceParamsInput = z.infer<typeof UpdateWorkspaceParamsSchema>
export type UpdateWorkspaceBodyInput = z.infer<typeof UpdateWorkspaceBodySchema>

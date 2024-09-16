import { z } from '@/zod'

import { WorkspaceSchema } from './Workspace.schema'

export const UpdateWorkspaceSchema = WorkspaceSchema.pick({
  id: true
}).merge(WorkspaceSchema.pick({ name: true, domain: true }).partial())
export const UpdateWorkspaceSchemaOutput = WorkspaceSchema
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>
export type UpdateWorkspaceOutput = Promise<z.infer<typeof UpdateWorkspaceSchemaOutput>>

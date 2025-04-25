import { z } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

export enum WorkspaceStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

const WorkspaceId = ID('workspace')

const Name = z.string().min(1)

const Status = z.enum(WorkspaceStatusEnum).default(WorkspaceStatusEnum.ACTIVE)

export const WorkspaceSchema = z.object({
  workspaceId: WorkspaceId,
  name: Name,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Workspace = z.infer<typeof WorkspaceSchema>
export type BaseWorkspace = BaseSchema<'workspaceId', Workspace>

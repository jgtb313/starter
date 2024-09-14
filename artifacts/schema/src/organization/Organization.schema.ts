import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { WorkspaceSchema } from '../workspace/Workspace.schema'
import { OrganizationStatusEnum } from './Organization.enums'

const WorkspaceId = ID

const Workspace = WorkspaceSchema

const Name = z.string().min(1)

const Slug = z.string().min(1)

const Status = z.nativeEnum(OrganizationStatusEnum)

export const OrganizationSchema = z.object({
  id: ID,
  workspaceId: WorkspaceId,
  workspace: Workspace,
  name: Name,
  slug: Slug,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Organization = z.infer<typeof OrganizationSchema>

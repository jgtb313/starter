import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { WorkspaceStatusEnum } from './Workspace.enums'

const Name = z.string().min(1)

const Domain = z.string().min(1).url()

const Onboarding = z.boolean().default(false)

const Status = z.nativeEnum(WorkspaceStatusEnum)

export const WorkspaceSchema = z.object({
  id: ID,
  name: Name,
  domain: Domain,
  onboarding: Onboarding,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Workspace = z.infer<typeof WorkspaceSchema>

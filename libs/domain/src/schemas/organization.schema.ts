import { z } from '@starter/schema'

import { ID, DeletedAt, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

export enum OrganizationStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

const OrganizationId = ID('organization')

const WorkspaceId = ID('workspace')

const Name = z.string().min(1)

const Status = z.nativeEnum(OrganizationStatusEnum).default(OrganizationStatusEnum.ACTIVE)

export const OrganizationSchema = z.object({
  organizationId: OrganizationId,
  workspaceId: WorkspaceId,
  name: Name,
  status: Status,
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Organization = z.infer<typeof OrganizationSchema>
export type BaseOrganization = BaseSchema<'organizationId', Organization>

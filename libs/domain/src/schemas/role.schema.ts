import { z } from '@starter/schema'
import { formatToCapitalized } from '@starter/common'

import { ID, DeletedAt, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'
import { PermissionsSchema } from './permission.schema'

export enum RoleStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

const RoleId = ID('role')

const WorkspaceId = ID('workspace')

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Tags = z
  .array(z.string())
  .nullish()
  .transform((value) => value ?? null)

const Permissions = PermissionsSchema

const Status = z.nativeEnum(RoleStatusEnum).default(RoleStatusEnum.ACTIVE)

export const RoleSchema = z.object({
  roleId: RoleId,
  workspaceId: WorkspaceId,
  name: Name,
  permissions: Permissions,
  tags: Tags,
  status: Status,
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Role = z.infer<typeof RoleSchema>
export type BaseRole = BaseSchema<'roleId', Role>

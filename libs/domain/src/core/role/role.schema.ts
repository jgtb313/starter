import { z } from '@starter/schema'
import { formatToCapitalized } from '@starter/common'

import { ID, DeletedAt, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'
import { OrganizationSchema } from '@/core/organization/organization.schema'
import { PermissionSchema } from '@/core/permission/permission.schema'

export enum RoleStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

const RoleId = ID('role')

const WorkspaceId = ID('workspace')

const Organization = z.array(OrganizationSchema).default([])

const Permission = z.array(PermissionSchema).default([])

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Tags = z
  .array(z.string())
  .nullish()
  .transform((value) => value ?? null)

const Status = z.enum(RoleStatusEnum).default(RoleStatusEnum.ACTIVE)

export const RoleSchema = z.object({
  roleId: RoleId,
  workspaceId: WorkspaceId,
  organizations: Organization,
  permissions: Permission,
  name: Name,
  tags: Tags,
  status: Status,
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Role = z.infer<typeof RoleSchema>
export type RoleInput = z.input<typeof RoleSchema>
export type BaseRole = BaseSchema<'roleId' | 'workspaceId', Role>

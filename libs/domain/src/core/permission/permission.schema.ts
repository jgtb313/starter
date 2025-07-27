import { z } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

export enum PermissionGroupEnum {
  'USER' = 'USER',
  'WORKSPACE' = 'WORKSPACE',
  'ORGANIZATION' = 'ORGANIZATION',
  'PLAN' = 'PLAN',
  'SUBSCRIPTION' = 'SUBSCRIPTION',
  'INVOICE' = 'INVOICE',
}

export enum PermissionActionEnum {
  'MANAGE' = 'MANAGE',
  'READ' = 'READ',
  'CREATE' = 'CREATE',
  'UPDATE' = 'UPDATE',
  'DELETE' = 'DELETE',
}

const PermissionId = ID('permission')

const Group = z.enum(PermissionGroupEnum)

const Action = z.enum(PermissionActionEnum)

const Name = z.string().min(1)

const Description = z.string().min(1)

export const PermissionSchema = z.object({
  permissionId: PermissionId,
  group: Group,
  action: Action,
  name: Name,
  description: Description,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Permission = z.infer<typeof PermissionSchema>
export type PermissionInput = z.input<typeof PermissionSchema>
export type BasePermission = BaseSchema<'permissionId', Permission>

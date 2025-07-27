import { z } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

export enum PermissionGroupEnum {
  'USER' = 'USER',
  'WORKSPACE' = 'WORKSPACE',
  'ORGANIZATION' = 'ORGANIZATION',
  'PLAN' = 'PLAN',
  'INVOICE' = 'INVOICE',
  'SUBSCRIPTION' = 'SUBSCRIPTION',
}

const PermissionId = ID('permission')

const Group = z.enum(PermissionGroupEnum)

const Name = z.string().min(1)

const Description = z.string().min(1)

export const PermissionSchema = z.object({
  permissionId: PermissionId,
  group: Group,
  name: Name,
  description: Description,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Permission = z.infer<typeof PermissionSchema>
export type PermissionInput = z.input<typeof PermissionSchema>
export type BasePermission = BaseSchema<'permissionId', Permission>

import { z } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

const PermissionId = ID('permission')

const Action = z.string().min(1)

const Name = z.string().min(1)

const Description = z.string().min(1)

export const PermissionSchema = z.object({
  permissionId: PermissionId,
  action: Action,
  name: Name,
  description: Description,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Permission = z.infer<typeof PermissionSchema>
export type PermissionInput = z.input<typeof PermissionSchema>
export type BasePermission = BaseSchema<'permissionId', Permission>

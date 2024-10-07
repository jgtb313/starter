import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { Permissions as PermissionsData } from '../permission/Permission.data'
import { RoleStatusEnum } from './Role.enums'

const WorkspaceId = ID

const Name = z.string().min(1)

const Description = z.string().min(1)

const Permissions = z.array(z.string()).refine(
  (values) => {
    const invalidPermissions = values.filter((value) => !PermissionsData.some((permission) => permission.name === value))

    if (invalidPermissions.length) {
      throw new z.ZodError([
        {
          path: ['permissions'],
          code: 'custom',
          message: `The following permissions are invalid: ${invalidPermissions.join(', ')}. Valid permissions are: ${PermissionsData.map(
            (permission) => permission.name
          ).join(', ')}`
        }
      ])
    }

    return true
  },
  {
    message: 'Permissions must contain only valid permission names.'
  }
)

const Status = z.nativeEnum(RoleStatusEnum)

export const RoleSchema = z.object({
  id: ID,
  workspaceId: WorkspaceId,
  name: Name,
  description: Description,
  permissions: Permissions,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Role = z.infer<typeof RoleSchema>

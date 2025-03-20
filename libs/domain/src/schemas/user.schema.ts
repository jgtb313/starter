import { z, EmailSchema, PhoneSchema, PasswordSchema } from '@starter/schema'
import { formatToCapitalized } from '@starter/common'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'
import { RoleSchema } from './role.schema'
import { PermissionsSchema } from './permission.schema'

export enum UserStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

const UserId = ID('user')

const WorkspaceId = ID('workspaceId').nullish()

const RoleIds = z.array(ID('role'))

const Roles = z.array(RoleSchema).default([])

const Permissions = PermissionsSchema

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Email = EmailSchema

const Phone = PhoneSchema.nullish().transform((value) => value ?? null)

const Avatar = z
  .string()
  .nullish()
  .transform((value) => value ?? null)

const Social = z
  .object({
    googleId: z
      .string()
      .nullish()
      .transform((value) => value ?? null),
    facebookId: z
      .string()
      .nullish()
      .transform((value) => value ?? null),
  })
  .default({
    googleId: null,
    facebookId: null,
  })
  .nullish()
  .transform((value) => value ?? null)

const Password = PasswordSchema

const Status = z.nativeEnum(UserStatusEnum).default(UserStatusEnum.ACTIVE)

export const UserSchema = z.object({
  userId: UserId,
  workspaceId: WorkspaceId,
  roleIds: RoleIds,
  roles: Roles,
  permissions: Permissions,
  name: Name,
  email: Email,
  phone: Phone,
  avatar: Avatar,
  social: Social,
  password: Password,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type User = z.infer<typeof UserSchema>
export type BaseUser = BaseSchema<'userId' | 'roles', User>

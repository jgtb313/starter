import { z } from '@/zod'
import { formatToCapitalized } from '@starter/shared'

import { ID, EmailSchema, PasswordSchema, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { StoreSchema } from '../store/Store.schema'
import { RoleSchema } from '../role/Role.schema'
import { UserStatusEnum } from './User.enums'

const Roles = z
  .array(
    z.object({
      id: ID,
      storeId: ID,
      store: StoreSchema,
      roleId: ID,
      role: RoleSchema
    })
  )
  .min(1)

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Email = EmailSchema

const Social = z
  .object({
    google: z
      .object({
        id: ID,
        lastSignIn: z.date()
      })
      .nullish()
      .transform((value) => value ?? null),
    facebook: z
      .object({
        id: ID,
        lastSignIn: z.date()
      })
      .nullish()
      .transform((value) => value ?? null)
  })
  .default({
    google: null,
    facebook: null
  })

const Password = PasswordSchema

const Onboarding = z.boolean().default(false)

const Status = z.nativeEnum(UserStatusEnum).default(UserStatusEnum.ACTIVE)

export const UserSchema = z.object({
  id: ID,
  roles: Roles,
  name: Name,
  email: Email,
  social: Social,
  password: Password,
  onboarding: Onboarding,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type User = z.infer<typeof UserSchema>

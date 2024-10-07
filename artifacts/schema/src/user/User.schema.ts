import { z } from '@/zod'
import { formatToCapitalized } from '@starter/shared'

import { ID, EmailSchema, PasswordSchema, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { UserStatusEnum } from './User.enums'

const WorkspaceId = ID

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Email = EmailSchema

const Social = z
  .object({
    google: z
      .object({
        id: ID
      })
      .nullish()
      .transform((value) => value ?? null),
    facebook: z
      .object({
        id: ID
      })
      .nullish()
      .transform((value) => value ?? null)
  })
  .default({
    google: null,
    facebook: null
  })

const RecoverPassword = z
  .object({
    token: z.string(),
    expiresIn: z.date()
  })
  .nullish()
  .transform((value) => value ?? null)

const Password = PasswordSchema

const Status = z.nativeEnum(UserStatusEnum).default(UserStatusEnum.ACTIVE)

export const UserSchema = z.object({
  id: ID,
  workspaceId: WorkspaceId,
  name: Name,
  email: Email,
  social: Social,
  recoverPassword: RecoverPassword,
  password: Password,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type User = z.infer<typeof UserSchema>

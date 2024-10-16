import { z } from '@/zod'
import { formatToCapitalized } from '@starter/shared'

import { ID, EmailSchema, PhoneSchema, PasswordSchema, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { UserStatusEnum } from './User.enums'

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Email = EmailSchema

const Phone = PhoneSchema.nullish()

const Social = z
  .object({
    google: z
      .object({
        id: ID,
      })
      .nullish()
      .transform((value) => value ?? null),
    facebook: z
      .object({
        id: ID,
      })
      .nullish()
      .transform((value) => value ?? null),
  })
  .default({
    google: null,
    facebook: null,
  })

const RecoverPassword = z
  .object({
    token: z.string(),
    expiresIn: z.date(),
  })
  .nullish()
  .transform((value) => value ?? null)

const Password = PasswordSchema

const Status = z.nativeEnum(UserStatusEnum).default(UserStatusEnum.ACTIVE)

export const UserSchema = z.object({
  id: ID,
  name: Name,
  email: Email,
  phone: Phone,
  social: Social,
  recoverPassword: RecoverPassword,
  password: Password,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema,
})
export type User = z.infer<typeof UserSchema>

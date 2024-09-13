import { z } from '@/zod'

import { ID, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { RoleTypeEnum } from './Role.enums'

const Name = z.string().min(1)

const Type = z.nativeEnum(RoleTypeEnum)

export const RoleSchema = z.object({
  id: ID,
  name: Name,
  type: Type,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Role = z.infer<typeof RoleSchema>

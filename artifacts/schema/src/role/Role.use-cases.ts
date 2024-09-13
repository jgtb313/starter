import { z } from '@/zod'

import { RoleSchema } from './Role.schema'

export const IndexRoleSchema = RoleSchema.pick({})
export const IndexRoleSchemaOutput = z.array(RoleSchema)
export type IndexRoleInput = z.infer<typeof IndexRoleSchema>
export type IndexRoleOutput = z.infer<typeof IndexRoleSchemaOutput>

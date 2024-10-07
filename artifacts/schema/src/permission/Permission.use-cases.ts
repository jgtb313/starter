import { z } from '@/zod'
import { PermissionSchema } from './Permission.schema'

export const ListPermissionsSchema = PermissionSchema.pick({})
export const ListPermissionsSchemaOutput = z.array(PermissionSchema)
export type ListPermissionsInput = z.infer<typeof ListPermissionsSchema>
export type ListPermissionsOutput = Promise<z.infer<typeof ListPermissionsSchemaOutput>>

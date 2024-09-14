import { z } from '@/zod'
import { PermissionSchema } from './Permission.schema'

export const IndexPermissionsSchema = PermissionSchema.pick({})
export const IndexPermissionsSchemaOutput = z.array(PermissionSchema)
export type IndexPermissionsInput = z.infer<typeof IndexPermissionsSchema>
export type IndexPermissionsOutput = Promise<z.infer<typeof IndexPermissionsSchemaOutput>>

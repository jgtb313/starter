import { z } from '@/zod'

const Module = z.string().min(1)

const Name = z.string().min(1)

export const PermissionSchema = z.object({
  module: Module,
  name: Name
})
export type Permission = z.infer<typeof PermissionSchema>

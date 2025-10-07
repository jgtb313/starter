import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const PermissionId = BaseSchema.id('permission')

const Action = z.string().min(1)

const Name = z.string().min(1)

const Description = z.string().min(1)

export const PermissionSchema = z.object({
	permissionId: PermissionId,
	action: Action,
	name: Name,
	description: Description,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type Permission = z.infer<typeof PermissionSchema>
export type PermissionInput = z.input<typeof PermissionSchema>
export type BasePermission = BaseSchema<
	Permission,
	{
		optional: [
			'permissionId',
		]
	}
>

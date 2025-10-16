import { BaseDomain } from '@/support/base-domain'
import {
	type Permission,
	PermissionSchema,
} from '@/core/permission/permission.schema'

export class PermissionDomain extends BaseDomain<Permission> {
	constructor(permission: Permission) {
		super(PermissionSchema, permission)
	}
}

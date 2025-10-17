import { BaseDomain } from '@/support/base-domain'
import {
	type Permission,
	type PermissionInput,
	PermissionSchema,
} from '@/core/permission/permission.schema'

export class PermissionDomain extends BaseDomain<Permission, PermissionInput> {
	constructor(permission: PermissionInput) {
		super(PermissionSchema, permission)
	}
}

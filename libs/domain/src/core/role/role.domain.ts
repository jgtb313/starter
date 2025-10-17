import { Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type Role, type RoleInput, RoleSchema } from '@/core/role/role.schema'

@Injectable()
export class RoleDomain extends BaseDomain<Role, RoleInput> {
	constructor(role: RoleInput) {
		super(RoleSchema, role)
	}
}

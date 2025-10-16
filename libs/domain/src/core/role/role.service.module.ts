import { forwardRef, Module } from '@nestjs/common'

import { OrganizationServiceModule } from '@/core/organization/organization.service.module'
import { PermissionServiceModule } from '@/core/permission/permission.service.module'
import { RoleService } from '@/core/role/role.service'
import { RoleRepositoryModule } from '@/adapters/database/role'

@Module({
	imports: [
		RoleRepositoryModule,
		forwardRef(() => OrganizationServiceModule),
		forwardRef(() => PermissionServiceModule),
	],
	providers: [
		RoleService,
	],
	exports: [
		RoleService,
	],
})
export class RoleServiceModule {}

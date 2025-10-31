import { forwardRef, Module } from '@nestjs/common'

import { OrganizationServiceModule } from '@/core/organization/organization.service.module'
import { PermissionServiceModule } from '@/core/permission/permission.service.module'
import { RoleService } from '@/core/role/role.service'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { RoleRepositoryModule } from '@/adapters/database/role/role.repository.module'

@Module({
	imports: [
		RoleRepositoryModule,
		forwardRef(() => WorkspaceServiceModule),
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

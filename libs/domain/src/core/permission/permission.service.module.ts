import { Module } from '@nestjs/common'

import { PermissionService } from '@/core/permission/permission.service'
import { PermissionRepositoryModule } from '@/adapters/database/permission/permission.repository.module'

@Module({
	imports: [
		PermissionRepositoryModule,
	],
	providers: [
		PermissionService,
	],
	exports: [
		PermissionService,
	],
})
export class PermissionServiceModule {}

import { Module } from '@nestjs/common'

import { PermissionService } from '@/core/permission/permission.service'
import { PermissionRepositoryModule } from '@/adapters/database/permission'

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

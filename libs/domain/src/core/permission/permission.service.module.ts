import { Module } from '@nestjs/common'

import { PermissionRepositoryModule } from '@/adapters/database/permission'
import { PermissionService } from '@/core/permission/permission.service'

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

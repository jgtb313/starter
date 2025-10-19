import { Module } from '@nestjs/common'

import { PermissionService } from '@/core/permission/permission.service'

@Module({
	providers: [
		PermissionService,
	],
	exports: [
		PermissionService,
	],
})
export class PermissionServiceModule {}

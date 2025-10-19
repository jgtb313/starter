import { PermissionServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { PermissionController } from '@/core/permission/permission.controller'

@Module({
	imports: [
		PermissionServiceModule,
	],
	controllers: [
		PermissionController,
	],
})
export class PermissionModule {}

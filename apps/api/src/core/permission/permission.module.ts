import { UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { PermissionController } from '@/core/permission/permission.controller'

@Module({
	imports: [
		UserServiceModule,
	],
	controllers: [
		PermissionController,
	],
})
export class PermissionModule {}

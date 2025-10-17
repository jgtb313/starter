import { RoleServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { RoleController } from './role.controller'

@Module({
	imports: [
		UserServiceModule,
		RoleServiceModule,
	],
	controllers: [
		RoleController,
	],
})
export class RoleModule {}

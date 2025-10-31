import { RoleServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { RoleController } from './role.controller'

@Module({
	imports: [
		RoleServiceModule,
	],
	controllers: [
		RoleController,
	],
})
export class RoleModule {}

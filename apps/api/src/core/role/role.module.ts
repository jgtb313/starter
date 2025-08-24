import { Module } from '@nestjs/common'
import { RoleServiceModule, UserServiceModule } from '@starter/domain'

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

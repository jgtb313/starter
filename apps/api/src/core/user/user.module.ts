import { Module } from '@nestjs/common'
import { UserServiceModule } from '@starter/domain'

import { UserController } from './user.controller'

@Module({
	imports: [
		UserServiceModule,
	],
	controllers: [
		UserController,
	],
})
export class UserModule {}

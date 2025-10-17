import { UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

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

import { UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { InviteController } from '@/core/invite/invite.controller'

@Module({
	imports: [
		UserServiceModule,
	],
	controllers: [
		InviteController,
	],
})
export class InviteModule {}

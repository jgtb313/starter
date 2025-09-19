import { Module } from '@nestjs/common'
import { UserServiceModule } from '@starter/domain'

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

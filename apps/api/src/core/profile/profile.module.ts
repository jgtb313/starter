import { UserServiceModule } from '@starter/domain'

import { forwardRef, Module } from '@nestjs/common'

import { ProfileController } from '@/core/profile/profile.controller'

@Module({
	imports: [
		forwardRef(() => UserServiceModule),
	],
	controllers: [
		ProfileController,
	],
})
export class ProfileModule {}

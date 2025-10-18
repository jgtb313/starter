import { Module } from '@nestjs/common'

import { ProfileService } from '@/core/profile/profile.service'
import { UserRepositoryModule } from '@/adapters/database/user/user.repository.module'

@Module({
	imports: [
		UserRepositoryModule,
	],
	providers: [
		ProfileService,
	],
	exports: [
		ProfileService,
	],
})
export class ProfileServiceModule {}

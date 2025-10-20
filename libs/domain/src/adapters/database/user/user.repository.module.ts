import { Module } from '@nestjs/common'

import { UserPrisma } from '@/adapters/database/user/user.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'USER_REPOSITORY',
			useClass: UserPrisma,
		},
	],
	exports: [
		'USER_REPOSITORY',
	],
})
export class UserRepositoryModule {}

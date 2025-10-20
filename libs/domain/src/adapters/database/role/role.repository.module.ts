import { Module } from '@nestjs/common'

import { RolePrisma } from '@/adapters/database/role/role.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'ROLE_REPOSITORY',
			useClass: RolePrisma,
		},
	],
	exports: [
		'ROLE_REPOSITORY',
	],
})
export class RoleRepositoryModule {}

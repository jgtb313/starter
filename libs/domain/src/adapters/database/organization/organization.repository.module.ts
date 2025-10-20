import { Module } from '@nestjs/common'

import { OrganizationPrisma } from '@/adapters/database/organization/organization.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'ORGANIZATION_REPOSITORY',
			useClass: OrganizationPrisma,
		},
	],
	exports: [
		'ORGANIZATION_REPOSITORY',
	],
})
export class OrganizationRepositoryModule {}

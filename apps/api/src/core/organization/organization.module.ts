import { OrganizationServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { OrganizationController } from '@/core/organization/organization.controller'

@Module({
	imports: [
		UserServiceModule,
		OrganizationServiceModule,
	],
	controllers: [
		OrganizationController,
	],
})
export class OrganizationModule {}

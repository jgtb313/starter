import { Module } from '@nestjs/common'
import { UserServiceModule, OrganizationServiceModule } from '@starter/domain'

import { OrganizationController } from '@/core/organization/organization.controller'

@Module({
  imports: [UserServiceModule, OrganizationServiceModule],
  controllers: [OrganizationController],
})
export class OrganizationModule {}

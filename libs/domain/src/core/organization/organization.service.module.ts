import { Module } from '@nestjs/common'

import { OrganizationRepositoryModule } from '@/adapters/database/organization'
import { OrganizationService } from './organization.service'

@Module({
  imports: [OrganizationRepositoryModule],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationServiceModule {}

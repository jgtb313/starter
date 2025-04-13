import { Module, forwardRef } from '@nestjs/common'

import { OrganizationRepositoryModule } from '@/adapters/database/organization'
import { WorkspaceServiceModule } from '../workspace'
import { OrganizationService } from './organization.service'

@Module({
  imports: [OrganizationRepositoryModule, forwardRef(() => WorkspaceServiceModule)],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationServiceModule {}

import { Module, forwardRef } from '@nestjs/common'

import { OrganizationRepositoryModule } from '@/adapters/database/organization'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { OrganizationService } from '@/core/organization/organization.service'

@Module({
  imports: [OrganizationRepositoryModule, forwardRef(() => WorkspaceServiceModule)],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationServiceModule {}

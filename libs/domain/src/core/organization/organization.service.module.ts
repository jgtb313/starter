import { Module, forwardRef } from '@nestjs/common'

import { OrganizationRepositoryModule } from '@/adapters/database/organization'
import { WorkspaceServiceModule } from '../workspace'
import { OrganizationService } from './organization.service'

@Module({
  imports: [OrganizationRepositoryModule, forwardRef(() => WorkspaceServiceModule)],
  providers: [
    {
      provide: 'ORGANIZATION_SERVICE',
      useClass: OrganizationService,
    },
  ],
  exports: ['ORGANIZATION_SERVICE'],
})
export class OrganizationServiceModule {}

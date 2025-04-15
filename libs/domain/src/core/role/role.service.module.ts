import { Module, forwardRef } from '@nestjs/common'

import { RoleRepositoryModule } from '@/adapters/database/role'
import { OrganizationServiceModule } from '@/core/organization/organization.service.module'
import { RoleService } from '@/core/role/role.service'

@Module({
  imports: [RoleRepositoryModule, forwardRef(() => OrganizationServiceModule)],
  providers: [
    {
      provide: 'ROLE_SERVICE',
      useClass: RoleService,
    },
  ],
  exports: ['ROLE_SERVICE'],
})
export class RoleServiceModule {}

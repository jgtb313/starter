import { Module, forwardRef } from '@nestjs/common'

import { RoleRepositoryModule } from '@/adapters/database/role'
import { OrganizationServiceModule } from '../organization'
import { RoleService } from './role.service'

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

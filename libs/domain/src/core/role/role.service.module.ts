import { Module } from '@nestjs/common'

import { RoleRepositoryModule } from '@/adapters/database/role'
import { OrganizationServiceModule } from '../organization'
import { RoleService } from './role.service'

@Module({
  imports: [RoleRepositoryModule, OrganizationServiceModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleServiceModule {}

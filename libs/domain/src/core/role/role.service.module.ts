import { Module } from '@nestjs/common'

import { RoleRepositoryModule } from '@/adapters/database/role'
import { RoleService } from './role.service'

@Module({
  imports: [RoleRepositoryModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleServiceModule {}

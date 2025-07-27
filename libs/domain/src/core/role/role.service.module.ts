import { Module, forwardRef } from '@nestjs/common'

import { RoleRepositoryModule } from '@/adapters/database/role'
import { OrganizationServiceModule } from '@/core/organization/organization.service.module'
import { PermissionServiceModule } from '@/core/permission/permission.service.module'
import { RoleService } from '@/core/role/role.service'

@Module({
  imports: [RoleRepositoryModule, forwardRef(() => OrganizationServiceModule), forwardRef(() => PermissionServiceModule)],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleServiceModule {}

import { Module, forwardRef } from '@nestjs/common'

import { UserRepositoryModule } from '@/adapters/database/user'
import { EncryptModule } from '@/adapters/encrypt'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
// import { RoleServiceModule } from '@/core/role/role.service.module'
import { UserService } from '@/core/user/user.service'

@Module({
  imports: [UserRepositoryModule, EncryptModule, forwardRef(() => WorkspaceServiceModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}

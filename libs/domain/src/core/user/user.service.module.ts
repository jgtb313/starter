import { Module, forwardRef } from '@nestjs/common'

import { PaginationModule } from '@/support/pagination'
import { UserRepositoryModule } from '@/adapters/database/user'
import { EncryptModule } from '@/adapters/encrypt'
import { WorkspaceServiceModule } from '../workspace'
import { RoleServiceModule } from '../role'
import { UserService } from './user.service'

@Module({
  imports: [UserRepositoryModule, PaginationModule, EncryptModule, forwardRef(() => WorkspaceServiceModule), forwardRef(() => RoleServiceModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}

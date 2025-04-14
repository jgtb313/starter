import { Module, forwardRef } from '@nestjs/common'

import { PaginationModule } from '@/support/pagination'
import { UserRepositoryModule } from '@/adapters/database/user'
import { EncryptModule } from '@/adapters/encrypt'
import { WorkspaceServiceModule } from '../workspace'
import { UserService } from './user.service'
import { UserServiceProvider } from './user.service.provider'

@Module({
  imports: [UserRepositoryModule, PaginationModule, EncryptModule, forwardRef(() => WorkspaceServiceModule)],
  providers: [UserServiceProvider],
  exports: [UserService],
})
export class UserServiceModule {}

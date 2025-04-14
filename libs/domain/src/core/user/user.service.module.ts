import { Module, forwardRef } from '@nestjs/common'

import { PaginationModule } from '@/support/pagination'
import { UserRepositoryModule } from '@/adapters/database/user'
import { EncryptModule } from '@/adapters/encrypt'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { UserService } from '@/core/user/user.service'

@Module({
  imports: [UserRepositoryModule, PaginationModule, EncryptModule, forwardRef(() => WorkspaceServiceModule)],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
  ],
  exports: ['USER_SERVICE'],
})
export class UserServiceModule {}

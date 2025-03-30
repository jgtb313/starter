import { Module } from '@nestjs/common'

import { PaginationModule } from '@/support/pagination'
import { UserRepositoryModule } from '@/adapters/database/user'
import { EncryptModule } from '@/adapters/encrypt'
import { RoleServiceModule } from '../role'
import { UserService } from './user.service'

@Module({
  imports: [UserRepositoryModule, RoleServiceModule, EncryptModule, PaginationModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}

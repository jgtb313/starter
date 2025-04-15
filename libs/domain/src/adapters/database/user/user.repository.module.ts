import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaginationModule } from '@/support/pagination'
import { UserTypeorm } from '@/adapters/database/user/user.typeorm.adapter'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PaginationModule],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserTypeorm,
    },
  ],
  exports: ['USER_REPOSITORY'],
})
export class UserRepositoryModule {}

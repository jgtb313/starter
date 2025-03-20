import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaginationModule } from '@/support/pagination'
import { RoleTypeorm } from './role.typeorm.adapter'
import { RoleEntity } from './role.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), PaginationModule],
  providers: [
    {
      provide: 'ROLE_REPOSITORY',
      useClass: RoleTypeorm,
    },
  ],
  exports: ['ROLE_REPOSITORY'],
})
export class RoleRepositoryModule {}

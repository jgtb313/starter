import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PermissionTypeorm } from '@/adapters/database/permission/permission.repository.adapter'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    {
      provide: 'PERMISSION_REPOSITORY',
      useClass: PermissionTypeorm,
    },
  ],
  exports: ['PERMISSION_REPOSITORY'],
})
export class PermissionRepositoryModule {}

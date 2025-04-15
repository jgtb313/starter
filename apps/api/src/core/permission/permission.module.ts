import { Module } from '@nestjs/common'

import { PermissionController } from '@/core/permission/permission.controller'

@Module({
  imports: [],
  controllers: [PermissionController],
})
export class PermissionModule {}

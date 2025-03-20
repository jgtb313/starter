import { Module } from '@nestjs/common'
import { UserServiceModule, RoleServiceModule } from '@starter/domain'

import { RoleController } from './role.controller'

@Module({
  imports: [UserServiceModule, RoleServiceModule],
  controllers: [RoleController],
})
export class RoleModule {}

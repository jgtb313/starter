import { Module } from '@nestjs/common'

import { WorkspaceRepositoryModule } from '@/adapters/database/workspace'
import { UserServiceModule } from '@/core/user'
import { WorkspaceService } from './workspace.service'

@Module({
  imports: [UserServiceModule, WorkspaceRepositoryModule],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceServiceModule {}

import { Module, forwardRef } from '@nestjs/common'

import { WorkspaceRepositoryModule } from '@/adapters/database/workspace'
import { UserServiceModule } from '../user'
import { WorkspaceService } from './workspace.service'
import { WorkspaceServiceProvider } from './workspace.service.provider'

@Module({
  imports: [WorkspaceRepositoryModule, forwardRef(() => UserServiceModule)],
  providers: [WorkspaceServiceProvider],
  exports: [WorkspaceService],
})
export class WorkspaceServiceModule {}

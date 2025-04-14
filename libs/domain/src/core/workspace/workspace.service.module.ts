import { Module, forwardRef } from '@nestjs/common'

import { WorkspaceRepositoryModule } from '@/adapters/database/workspace'
import { UserServiceModule } from '@/core/user/user.service.module'
import { WorkspaceService } from '@/core/workspace/workspace.service'

@Module({
  imports: [WorkspaceRepositoryModule, forwardRef(() => UserServiceModule)],
  providers: [
    {
      provide: 'WORKSPACE_SERVICE',
      useClass: WorkspaceService,
    },
  ],
  exports: ['WORKSPACE_SERVICE'],
})
export class WorkspaceServiceModule {}

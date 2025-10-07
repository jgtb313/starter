import { forwardRef, Module } from '@nestjs/common'

import { UserServiceModule } from '@/core/user/user.service.module'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { WorkspaceRepositoryModule } from '@/adapters/database/workspace'

@Module({
	imports: [
		WorkspaceRepositoryModule,
		forwardRef(() => UserServiceModule),
	],
	providers: [
		WorkspaceService,
	],
	exports: [
		WorkspaceService,
	],
})
export class WorkspaceServiceModule {}

import { forwardRef, Module } from '@nestjs/common'

import { WorkspaceRepositoryModule } from '@/adapters/database/workspace'
import { UserServiceModule } from '@/core/user/user.service.module'
import { WorkspaceService } from '@/core/workspace/workspace.service'

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

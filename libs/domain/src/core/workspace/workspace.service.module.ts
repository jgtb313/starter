import { forwardRef, Module } from '@nestjs/common'

import { PlanServiceModule } from '@/core/plan/plan.service.module'
import { UserServiceModule } from '@/core/user/user.service.module'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { WorkspaceRepositoryModule } from '@/adapters/database/workspace/workspace.repository.module'
import { PublisherModule } from '@/adapters/publisher'

@Module({
	imports: [
		WorkspaceRepositoryModule,
		forwardRef(() => UserServiceModule),
		forwardRef(() => PlanServiceModule),
		PublisherModule,
	],
	providers: [
		WorkspaceService,
	],
	exports: [
		WorkspaceService,
	],
})
export class WorkspaceServiceModule {}

import { forwardRef, Module } from '@nestjs/common'

import { OrganizationService } from '@/core/organization/organization.service'
import { PlanServiceModule } from '@/core/plan/plan.service.module'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { OrganizationRepositoryModule } from '@/adapters/database/organization/organization.repository.module'

@Module({
	imports: [
		OrganizationRepositoryModule,
		forwardRef(() => WorkspaceServiceModule),
		forwardRef(() => PlanServiceModule),
	],
	providers: [
		OrganizationService,
	],
	exports: [
		OrganizationService,
	],
})
export class OrganizationServiceModule {}

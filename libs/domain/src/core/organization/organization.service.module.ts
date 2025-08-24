import { forwardRef, Module } from '@nestjs/common'

import { OrganizationRepositoryModule } from '@/adapters/database/organization'
import { OrganizationService } from '@/core/organization/organization.service'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'

@Module({
	imports: [
		OrganizationRepositoryModule,
		forwardRef(() => WorkspaceServiceModule),
	],
	providers: [
		OrganizationService,
	],
	exports: [
		OrganizationService,
	],
})
export class OrganizationServiceModule {}

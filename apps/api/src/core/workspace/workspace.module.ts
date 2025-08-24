import { Module } from '@nestjs/common'
import { UserServiceModule, WorkspaceServiceModule } from '@starter/domain'

import { WorkspaceController } from './workspace.controller'

@Module({
	imports: [
		UserServiceModule,
		WorkspaceServiceModule,
	],
	controllers: [
		WorkspaceController,
	],
})
export class WorkspaceModule {}

import { UserServiceModule, WorkspaceServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

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

import { WorkspaceServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { WorkspaceController } from './workspace.controller'

@Module({
	imports: [
		WorkspaceServiceModule,
	],
	controllers: [
		WorkspaceController,
	],
})
export class WorkspaceModule {}

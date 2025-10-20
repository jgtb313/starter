import { Module } from '@nestjs/common'

import { WorkspacePrisma } from '@/adapters/database/workspace/workspace.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'WORKSPACE_REPOSITORY',
			useClass: WorkspacePrisma,
		},
	],
	exports: [
		'WORKSPACE_REPOSITORY',
	],
})
export class WorkspaceRepositoryModule {}

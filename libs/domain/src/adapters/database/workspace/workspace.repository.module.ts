import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WorkspaceTypeorm } from '@/adapters/database/workspace/workspace.typeorm.adapter'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			WorkspaceEntity,
		]),
	],
	providers: [
		{
			provide: 'WORKSPACE_REPOSITORY',
			useClass: WorkspaceTypeorm,
		},
	],
	exports: [
		'WORKSPACE_REPOSITORY',
	],
})
export class WorkspaceRepositoryModule {}

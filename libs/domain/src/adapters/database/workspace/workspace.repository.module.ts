import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WorkspaceTypeorm } from '@/adapters/database/workspace/workspace.typeorm.adapter'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

export const WorkspaceRepositorySymbol = Symbol('WorkspaceRepository')

@Module({
	imports: [
		TypeOrmModule.forFeature([
			WorkspaceEntity,
		]),
	],
	providers: [
		{
			provide: WorkspaceRepositorySymbol,
			useClass: WorkspaceTypeorm,
		},
	],
	exports: [
		WorkspaceRepositorySymbol,
	],
})
export class WorkspaceRepositoryModule {}

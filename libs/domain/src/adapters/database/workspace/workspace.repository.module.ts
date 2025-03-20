import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaginationModule } from '@/support/pagination'
import { WorkspaceTypeorm } from './workspace.typeorm.adapter'
import { WorkspaceEntity } from './workspace.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity]), PaginationModule],
  providers: [
    {
      provide: 'WORKSPACE_REPOSITORY',
      useClass: WorkspaceTypeorm,
    },
  ],
  exports: ['WORKSPACE_REPOSITORY'],
})
export class WorkspaceRepositoryModule {}

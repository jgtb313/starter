import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { WorkspaceSchema } from '@/schemas/workspace.schema'
import { PaginationService } from '@/support/pagination'
import { IWorkspaceRepository } from '@/ports/database/workspace'
import { WorkspaceEntity } from './workspace.typeorm.entity'

@Injectable()
export class WorkspaceTypeorm implements IWorkspaceRepository {
  private readonly repository: Repository<WorkspaceEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(WorkspaceEntity)
  }

  findAll: IWorkspaceRepository['findAll'] = async ({ offset, limit, ...query }) => {
    const { name, status } = query

    const where: FindOptionsWhere<WorkspaceEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const { values, meta } = await this.paginationService.paginate(this.repository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map((workspace) => WorkspaceSchema.parse(workspace)),
      meta,
    }
  }

  findById: IWorkspaceRepository['findById'] = async (workspaceId) => {
    const model = await this.repository.findOne({ where: { workspaceId } })

    if (!model) {
      throw new NotFoundException(`Workspace ${workspaceId} not found`)
    }

    return WorkspaceSchema.parse(model)
  }

  findOne: IWorkspaceRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<WorkspaceEntity>

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return WorkspaceSchema.parse(model)
  }

  create: IWorkspaceRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return WorkspaceSchema.parse(model)
  }

  updateById: IWorkspaceRepository['updateById'] = async (workspaceId, input) => {
    const workspace = await this.findById(workspaceId)

    await this.repository.update(workspace.workspaceId, input)

    return this.findById(workspace.workspaceId)
  }

  deleteById: IWorkspaceRepository['deleteById'] = async (workspaceId) => {
    const workspace = await this.findById(workspaceId)

    await this.repository.softDelete({ workspaceId: workspace.workspaceId })
  }
}

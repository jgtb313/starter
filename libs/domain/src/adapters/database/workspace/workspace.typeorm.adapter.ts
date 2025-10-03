import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import { type FindOptionsWhere, ILike, type Repository } from 'typeorm'

import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'
import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import type { DomainFactory } from '@/support/base-domain'
import { deepMapDatesToISOString } from '@/support/utilities'

@Injectable()
export class WorkspaceTypeorm implements IWorkspaceRepository {
	constructor(
		@InjectRepository(WorkspaceEntity)
		private readonly repository: Repository<WorkspaceEntity>,
		private readonly domainFactory: DomainFactory,
	) {}

	findAllPaginated: IWorkspaceRepository['findAllPaginated'] = async ({
		cursor,
		limit,
		...query
	}) => {
		const { name, status } = query

		const where: FindOptionsWhere<WorkspaceEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (status) {
			where.status = status
		}

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const take = paginate.limit

		const [values, total] = await this.repository.findAndCount({
			where,
			take,
		})

		return {
			values: values.map((workspace) => this.toWorkspaceDomain(workspace)),
			meta: {
				...paginate,
				total,
				nextCursor: null,
			},
		}
	}

	findAll: IWorkspaceRepository['findAll'] = async (input) => {
		const { name, status } = input

		const where: FindOptionsWhere<WorkspaceEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			where,
		})

		return values.map((workspace) => this.toWorkspaceDomain(workspace))
	}

	findById: IWorkspaceRepository['findById'] = async (workspaceId) => {
		const workspace = await this.repository.findOne({
			where: {
				workspaceId,
			},
		})

		if (!workspace) {
			throw new NotFoundException(`Workspace ${workspaceId} not found`)
		}

		return this.toWorkspaceDomain(workspace)
	}

	create: IWorkspaceRepository['create'] = async (input) => {
		const data = this.repository.create(input)

		const workspace = await this.repository.save(data)

		return this.toWorkspaceDomain(workspace)
	}

	updateById: IWorkspaceRepository['updateById'] = async (
		workspaceId,
		input,
	) => {
		const workspace = await this.findById(workspaceId)

		await this.repository.update(workspace.state.workspaceId, input)

		return this.findById(workspace.state.workspaceId)
	}

	private toWorkspaceDomain(model: WorkspaceEntity) {
		return this.domainFactory.create(
			WorkspaceDomain,
			deepMapDatesToISOString(model),
		)
	}
}

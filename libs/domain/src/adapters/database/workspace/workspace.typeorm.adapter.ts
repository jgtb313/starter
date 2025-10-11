import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import {
	type FindOptionsOrder,
	type FindOptionsWhere,
	ILike,
	type Repository,
} from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'
import { WorkspaceAddressEntity } from '@/adapters/database/workspace/workspace-address.typeorm.entity'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class WorkspaceTypeorm implements IWorkspaceRepository {
	constructor(
		@InjectRepository(WorkspaceEntity)
		private readonly repository: Repository<WorkspaceEntity>,
		@InjectRepository(WorkspaceAddressEntity)
		private readonly workspaceAddressRepository: Repository<WorkspaceAddressEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IWorkspaceRepository['findPaginated'] = async ({
		cursor,
		limit,
		sort,
		...query
	}) => {
		const { workspaceId, name, status } = query

		const where: FindOptionsWhere<WorkspaceEntity> = {}
		const order: FindOptionsOrder<WorkspaceEntity> = {
			...sort,
		}

		if (workspaceId) {
			where.workspaceId = workspaceId
		}

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
			order,
			relations: {
				address: true,
			},
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

	find: IWorkspaceRepository['find'] = async (input) => {
		const { workspaceId, name, status } = input

		const where: FindOptionsWhere<WorkspaceEntity> = {}

		if (workspaceId) {
			where.workspaceId = workspaceId
		}

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
			throw new NotFoundException(
				this.i18nService.current.workspaceNotFound({
					workspaceId,
				}),
			)
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

	deleteById: IWorkspaceRepository['deleteById'] = async (workspaceId) => {
		const workspace = await this.findById(workspaceId)

		await this.repository.softDelete(workspace.state.workspaceId)
	}

	upsertAddress: IWorkspaceRepository['upsertAddress'] = async (
		workspaceId,
		input,
	) => {
		const workspace = await this.findById(workspaceId)

		await this.workspaceAddressRepository.upsert(
			{
				...input,
				workspaceId: workspace.state.workspaceId,
			},
			{
				conflictPaths: [
					'workspaceId',
				],
				skipUpdateIfNoValuesChanged: true,
			},
		)
	}

	deleteAddress: IWorkspaceRepository['deleteAddress'] = async (
		workspaceId,
	) => {
		const workspace = await this.findById(workspaceId)

		await this.workspaceAddressRepository.softDelete({
			workspaceId: workspace.state.workspaceId,
		})
	}

	private toWorkspaceDomain(model: WorkspaceEntity) {
		return new WorkspaceDomain(deepMapDatesToISOString(model))
	}
}

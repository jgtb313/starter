import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import {
	type DeepPartial,
	type FindOptionsWhere,
	ILike,
	type Repository,
} from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'
import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type { BaseWorkspace } from '@/core/workspace/workspace.schema'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import { DomainFactory } from '@/support/base-domain'
import { deepMapDatesToISOString } from '@/support/utilities'

@Injectable()
export class WorkspaceTypeorm implements IWorkspaceRepository {
	constructor(
		@InjectRepository(WorkspaceEntity)
		private readonly repository: Repository<WorkspaceEntity>,
		@Inject(DomainFactory)
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
		const payload = this.toWorkspaceEntity(input)
		const data = this.repository.create(payload)

		const workspace = await this.repository.save(data)

		return this.toWorkspaceDomain(workspace)
	}

	updateById: IWorkspaceRepository['updateById'] = async (
		workspaceId,
		input,
	) => {
		const workspace = await this.findById(workspaceId)

		const payload = this.toPartialWorkspaceEntity(input)
		await this.repository.update(workspace.state.workspaceId, payload)

		return this.findById(workspace.state.workspaceId)
	}

	private toWorkspaceEntity({
		phone,
		document,
		address,
		...workspace
	}: BaseWorkspace): DeepPartial<WorkspaceEntity> {
		return {
			...workspace,
			phoneISO: phone?.iso,
			phoneDDI: phone?.ddi,
			phoneNumber: phone?.number,
			documentType: document?.type,
			documentNumber: document?.number,
			addressState: address?.state,
			addressCity: address?.city,
			addressZipCode: address?.zipCode,
			addressNeighborhood: address?.neighborhood,
			addressStreet: address?.street,
			addressNumber: address?.number,
			addressComplement: address?.complement,
			addressLandmark: address?.landmark,
			addressLocationLat: address?.location?.lat,
			addressLocationLng: address?.location?.lng,
		}
	}

	private toPartialWorkspaceEntity({
		phone,
		document,
		address,
		...workspace
	}: Partial<BaseWorkspace>): QueryDeepPartialEntity<WorkspaceEntity> {
		return {
			...workspace,
			phoneISO: phone?.iso,
			phoneDDI: phone?.ddi,
			phoneNumber: phone?.number,
			documentType: document?.type,
			documentNumber: document?.number,
			addressState: address?.state,
			addressCity: address?.city,
			addressZipCode: address?.zipCode,
			addressNeighborhood: address?.neighborhood,
			addressStreet: address?.street,
			addressNumber: address?.number,
			addressComplement: address?.complement,
			addressLandmark: address?.landmark,
			addressLocationLat: address?.location?.lat,
			addressLocationLng: address?.location?.lng,
		}
	}

	private toWorkspaceDomain(model: WorkspaceEntity) {
		return this.domainFactory.create(
			WorkspaceDomain,
			deepMapDatesToISOString(model),
		)
	}
}

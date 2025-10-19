import type { Merge } from '@starter/common'
import type { BaseAddress, BusinessAddress, Pagination } from '@starter/schema'

import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common'
import { Transactional } from 'typeorm-transactional'

import { UserService } from '@/core/user/user.service'
import type {
	BaseWorkspace,
	Workspace,
} from '@/core/workspace/workspace.schema'
import { LoggerService } from '@/adapters/logger'
import { PublisherService } from '@/adapters/publisher/publisher.service'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class WorkspaceService {
	constructor(
		@Inject('WORKSPACE_REPOSITORY')
		private readonly workspaceRepository: IWorkspaceRepository,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		@Inject(PublisherService)
		private readonly publisherService: PublisherService,
		@Inject(LoggerService)
		private readonly loggerService: LoggerService,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	async getPaginatedWorkspaces(
		input: Merge<
			[
				Pagination,
			]
		>,
	) {
		return this.workspaceRepository.findPaginated(input)
	}

	async getWorkspace(workspaceId: string) {
		return this.workspaceRepository.findById(workspaceId)
	}

	// @Transactional()
	async createWorkspace(userId: string, input: BaseWorkspace) {
		this.loggerService.info('Attempting to create workspace', {
			userId,
			input,
		})

		const user = await this.userService.getUser(userId)

		const hasWorkspace = user.state.workspaceId !== null

		if (hasWorkspace) {
			throw new ConflictException(
				this.i18nService.current.userAlreadyHasWorkspace(),
			)
		}

		const workspace = await this.workspaceRepository.create(input)

		const updatedUser = await this.userService.updateUser(user.state.userId, {
			workspaceId: workspace.state.workspaceId,
		})

		console.log({
			updateUserWorkspaceId: updatedUser.state.workspaceId,
		})

		this.publisherService.publish('WORKSPACE_CREATED', {
			workspaceId: workspace.state.workspaceId,
		})

		this.loggerService.info('Workspace created', workspace.state)

		return workspace
	}

	async updateWorkspace(workspaceId: string, input: Partial<Workspace>) {
		this.loggerService.info('Attempting to update workspace', {
			workspaceId,
			input,
		})

		const workspace = await this.workspaceRepository.findById(workspaceId)

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			input,
		)

		this.publisherService.publish('WORKSPACE_UPDATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

		this.loggerService.info('Workspace updated', updatedWorkspace.state)

		return updatedWorkspace
	}

	async attachWorkspaceAddress(workspaceId: string, address: BaseAddress) {
		this.loggerService.info('Attempting to attach workspace address', {
			workspaceId,
			address,
		})

		const workspace = await this.getWorkspace(workspaceId)

		// TODO: get the location from the address

		const businessAddress: BusinessAddress = {
			...address,
			location: {
				lat: '0',
				lng: '0',
			},
		}

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			{
				address: businessAddress,
			},
		)

		this.loggerService.info('Workspace address defined', updatedWorkspace.state)

		return updatedWorkspace
	}

	async deleteWorkspaceAddress(workspaceId: string) {
		this.loggerService.info('Attempting to delete workspace address', {
			workspaceId,
		})

		const workspace = await this.getWorkspace(workspaceId)

		await this.workspaceRepository.deleteAddress(workspace.state.workspaceId)

		this.loggerService.info('Workspace address deleted', workspace.state)

		return workspace
	}

	async activateWorkspace(workspaceId: string) {
		this.loggerService.info('Attempting to activate workspace', {
			workspaceId,
		})

		const workspace = await this.getWorkspace(workspaceId)

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			{
				status: 'ACTIVE',
			},
		)

		this.publisherService.publish('WORKSPACE_ACTIVATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

		this.loggerService.info(
			`Workspace ${updatedWorkspace.state.workspaceId} activated`,
			updatedWorkspace.state,
		)

		return updatedWorkspace
	}

	async deactivateWorkspace(workspaceId: string) {
		this.loggerService.info('Attempting to deactivate workspace', {
			workspaceId,
		})

		const workspace = await this.getWorkspace(workspaceId)

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			{
				status: 'INACTIVE',
			},
		)

		await this.publisherService.publish('WORKSPACE_DEACTIVATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

		this.loggerService.info(
			`Workspace ${updatedWorkspace.state.workspaceId} deactivated`,
			updatedWorkspace.state,
		)

		return updatedWorkspace
	}

	async deleteWorkspace(workspaceId: string) {
		this.loggerService.info('Attempting to delete workspace', {
			workspaceId,
		})

		const workspace = await this.getWorkspace(workspaceId)

		await this.workspaceRepository.deleteById(workspace.state.workspaceId)

		this.loggerService.info('Workspace deleted', workspace.state)

		return workspace
	}
}

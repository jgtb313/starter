import { forwardRef, Inject, Injectable } from '@nestjs/common'
import type { Merge } from '@starter/common'
import type { BaseAddress, BusinessAddress, Pagination } from '@starter/schema'
import { Transactional } from 'typeorm-transactional'

import { UserService } from '@/core/user/user.service'
import type {
	BaseWorkspace,
	Workspace,
} from '@/core/workspace/workspace.schema'
import { LoggerService } from '@/adapters/logger'
import { PublisherService } from '@/adapters/publisher/publisher.service'
import type { IWorkspaceRepository } from '@/ports/database/workspace'

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
	) {}

	async getPaginatedWorkspaces(
		input: Merge<
			[
				Pagination,
			]
		>,
	) {
		return this.workspaceRepository.findAllPaginated(input)
	}

	async getWorkspace(workspaceId: string) {
		return this.workspaceRepository.findById(workspaceId)
	}

	@Transactional()
	async createWorkspace(userId: string, input: BaseWorkspace) {
		const user = await this.userService.getUser(userId)

		const workspace = await this.workspaceRepository.create(input)

		user.assignToWorkspace(workspace.state.workspaceId)
		// user.attachPermission('workspace:manage')

		await this.userService.updateUser(user.state.userId, user.state)

		this.publisherService.publish('WORKSPACE_CREATED', {
			workspaceId: workspace.state.workspaceId,
		})

		this.loggerService.info('Workspace created', workspace.state)

		return workspace
	}

	async updateWorkspace(workspaceId: string, input: Partial<Workspace>) {
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

	async defineWorkspaceAddress(workspaceId: string, address: BaseAddress) {
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

	async activateWorkspace(workspaceId: string) {
		const workspace = await this.getWorkspace(workspaceId)

		workspace.markAsActive()

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			workspace.state,
		)

		this.publisherService.publish('WORKSPACE_ACTIVATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

		this.loggerService.info('Workspace activated', updatedWorkspace.state)

		return updatedWorkspace
	}

	async deactivateWorkspace(workspaceId: string) {
		const workspace = await this.getWorkspace(workspaceId)

		workspace.markAsInactive()

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			workspace.state,
		)

		await this.publisherService.publish('WORKSPACE_DEACTIVATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

		this.loggerService.info('Workspace deactivated', updatedWorkspace.state)

		return updatedWorkspace
	}
}

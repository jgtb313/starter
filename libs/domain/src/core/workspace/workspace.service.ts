import type { Merge } from '@starter/common'
import type { BaseAddress, BusinessAddress, Pagination } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { PlanService } from '@/core/plan/plan.service'
import { UserService } from '@/core/user/user.service'
import type { WorkspaceInput } from '@/core/workspace/workspace.schema'
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
		@Inject(forwardRef(() => PlanService))
		private readonly planService: PlanService,
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
		return this.workspaceRepository.findPaginated(input)
	}

	async getWorkspace(workspaceId: string) {
		return this.workspaceRepository.findById(workspaceId)
	}

	async createWorkspace(userId: string, input: Omit<WorkspaceInput, 'planId'>) {
		this.loggerService.info('Attempting to create workspace', {
			userId,
			input,
		})

		const user = await this.userService.getUser(userId)

		user.checkIfAlreadyHasWorkspace()

		const defaultPlan = await this.planService.getDefaultPlan()

		const workspace = await this.workspaceRepository.create({
			...input,
			planId: defaultPlan.state.planId,
		})

		await this.userService.updateUser(user.state.userId, {
			workspaceId: workspace.state.workspaceId,
		})

		this.publisherService.publish('WORKSPACE_CREATED', {
			workspaceId: workspace.state.workspaceId,
		})

		this.loggerService.info('Workspace created', workspace.state)

		return workspace
	}

	async updateWorkspace(workspaceId: string, input: Partial<WorkspaceInput>) {
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

		await this.workspaceRepository.upsertAddress(
			workspace.state.workspaceId,
			businessAddress,
		)

		this.loggerService.info('Workspace address defined', workspace.state)

		return workspace
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

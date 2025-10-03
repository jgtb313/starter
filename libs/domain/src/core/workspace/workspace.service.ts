import { forwardRef, Inject, Injectable } from '@nestjs/common'
import type { Merge } from '@starter/common'
import type { Pagination } from '@starter/schema'

import { PublisherService } from '@/adapters/publisher/publisher.service'
import { UserService } from '@/core/user/user.service'
import type {
	BaseWorkspace,
	Workspace,
} from '@/core/workspace/workspace.schema'
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

	async createWorkspace(
		userId: string,
		input: Omit<BaseWorkspace, 'integrations'>,
	) {
		const user = await this.userService.getUser(userId)

		const workspace = await this.workspaceRepository.create(input)

		user.assignToWorkspace(workspace.state.workspaceId)

		await this.userService.updateUser(user.state.userId, user.state)

		await this.publisherService.publish('WORKSPACE_CREATED', {
			workspaceId: workspace.state.workspaceId,
		})

		return workspace
	}

	async updateWorkspace(workspaceId: string, input: Partial<Workspace>) {
		const workspace = await this.workspaceRepository.findById(workspaceId)

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			input,
		)

		await this.publisherService.publish('WORKSPACE_UPDATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

		return updatedWorkspace
	}

	async activateWorkspace(workspaceId: string) {
		const workspace = await this.getWorkspace(workspaceId)

		workspace.markAsActive()

		const updatedWorkspace = await this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			workspace.state,
		)

		await this.publisherService.publish('WORKSPACE_ACTIVATED', {
			workspaceId: updatedWorkspace.state.workspaceId,
		})

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

		return updatedWorkspace
	}
}

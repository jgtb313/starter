import { forwardRef, Inject, Injectable } from '@nestjs/common'
import type { Merge } from '@starter/common'
import type { Pagination } from '@starter/schema'

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

		return workspace
	}

	async updateWorkspace(workspaceId: string, input: Partial<Workspace>) {
		const workspace = await this.workspaceRepository.findById(workspaceId)

		return this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			input,
		)
	}

	async activeWorkspace(workspaceId: string) {
		const workspace = await this.getWorkspace(workspaceId)

		workspace.markAsActive()

		return this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			workspace.state,
		)
	}

	async inactiveWorkspace(workspaceId: string) {
		const workspace = await this.getWorkspace(workspaceId)

		workspace.markAsInactive()

		return this.workspaceRepository.updateById(
			workspace.state.workspaceId,
			workspace.state,
		)
	}
}

import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput } from '@starter/schema'

import type { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type {
	BaseWorkspace,
	Workspace,
} from '@/core/workspace/workspace.schema'

type FindWorkspaceInput = Partial<Workspace>

export type IWorkspaceRepository = {
	findAllPaginated(
		input: Merge<
			[
				FindWorkspaceInput,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<WorkspaceDomain>>
	findAll(input: Partial<Workspace>): Promise<WorkspaceDomain[]>
	findById(workspaceId: string): Promise<WorkspaceDomain>
	create(input: BaseWorkspace): Promise<WorkspaceDomain>
	updateById(
		workspaceId: string,
		input: Partial<Workspace>,
	): Promise<WorkspaceDomain>
}

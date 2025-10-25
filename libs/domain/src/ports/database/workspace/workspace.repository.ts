import type { Merge, Required } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type {
	UpdatableWorkspaceInput,
	Workspace,
	WorkspaceInput,
} from '@/core/workspace/workspace.schema'

export type FindWorkspaceInput = Partial<
	Pick<Workspace, 'name' | 'status' | 'createdAt'>
>

export type WorkspaceSort = Sort<'name' | 'status' | 'createdAt'>

export type IWorkspaceRepository = {
	findPaginated(
		input: Merge<
			[
				FindWorkspaceInput,
				WorkspaceSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<WorkspaceDomain>>
	find(
		input: Merge<
			[
				FindWorkspaceInput,
				WorkspaceSort,
			]
		>,
	): Promise<WorkspaceDomain[]>
	findById(workspaceId: string): Promise<WorkspaceDomain>
	create(input: WorkspaceInput): Promise<WorkspaceDomain>
	updateById(
		workspaceId: string,
		input: UpdatableWorkspaceInput,
	): Promise<WorkspaceDomain>
	deleteById(workspaceId: string): Promise<void>

	upsertAddress(
		workspaceId: string,
		input: Required<Workspace['address']>,
	): Promise<WorkspaceDomain>
	deleteAddress(workspaceId: string): Promise<void>
}

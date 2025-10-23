import type { Merge, Required } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type {
	Workspace,
	WorkspaceInput,
} from '@/core/workspace/workspace.schema'

type FindWorkspaceInput = Partial<
	Pick<Workspace, 'workspaceId' | 'name' | 'status'>
>

type WorkspaceSort = Sort<'name' | 'status' | 'createdAt'>

export type IWorkspaceRepository = {
	findPaginated(
		input: Merge<
			[
				FindWorkspaceInput,
				Pagination,
				WorkspaceSort,
			]
		>,
	): Promise<PaginationOutput<WorkspaceDomain>>
	find(input: FindWorkspaceInput): Promise<WorkspaceDomain[]>
	findById(workspaceId: string): Promise<WorkspaceDomain>
	create(input: WorkspaceInput): Promise<WorkspaceDomain>
	updateById(
		workspaceId: string,
		input: Partial<WorkspaceInput>,
	): Promise<WorkspaceDomain>
	deleteById(workspaceId: string): Promise<void>

	upsertAddress(
		workspaceId: string,
		input: Required<Workspace['address']>,
	): Promise<void>
	deleteAddress(workspaceId: string): Promise<void>
}

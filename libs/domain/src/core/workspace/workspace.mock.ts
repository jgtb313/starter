import { uuid } from '@starter/common'

import {
	type Workspace,
	type WorkspaceInput,
	WorkspaceSchema,
} from '@/core/workspace/workspace.schema'

type WorkspaceOverrides = Partial<WorkspaceInput>

export const makeWorkspace = (overrides: WorkspaceOverrides): Workspace => {
	const base: WorkspaceInput = {
		workspaceId: uuid(),
		name: 'Manea CED',
		status: 'TRIAL',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return WorkspaceSchema.parse({
		...base,
		...overrides,
	})
}

export const workspaceMocks: Workspace[] = [
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
		name: 'Marketing Team',
	}),
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d580',
		name: 'Engineering Squad',
		status: 'INACTIVE',
	}),
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
		name: 'Product Ops',
		recurrenceExternalId: 'cus_prod_ops_001',
	}),
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d582',
		name: 'Customer Success',
		status: 'ACTIVE',
	}),
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d583',
		name: 'Finance Dept.',
		status: 'INACTIVE',
	}),
]

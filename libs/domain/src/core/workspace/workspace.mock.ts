import { uuid } from '@starter/common'

import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type { WorkspaceInput } from '@/core/workspace/workspace.schema'

type WorkspaceOverrides = Partial<WorkspaceInput>

export const makeWorkspace = (
	overrides: WorkspaceOverrides,
): WorkspaceDomain => {
	const base: WorkspaceInput = {
		workspaceId: uuid(),
		name: 'Manea CED',
		status: 'ACTIVE',
		integrations: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new WorkspaceDomain({
		...base,
		...overrides,
	})
}

export const workspaceMocks: WorkspaceDomain[] = [
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
		integrations: {
			recurrenceCustomerId: 'cus_prod_ops_001',
		},
	}),
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d582',
		name: 'Customer Success',
		status: 'ACTIVE',
	}),
	makeWorkspace({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d583',
		name: 'Finance Dept.',
		integrations: {
			recurrenceCustomerId: 'cus_finance_123',
		},
		status: 'INACTIVE',
	}),
]

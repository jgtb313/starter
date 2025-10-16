import { uuid } from '@starter/common'

import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import type { Workspace } from '@/core/workspace/workspace.schema'

type WorkspaceOverrides = Partial<Workspace>

export const makeWorkspace = (
	overrides: WorkspaceOverrides,
): WorkspaceDomain => {
	const base: Workspace = {
		workspaceId: uuid(),
		recurrenceExternalId: null,
		name: 'Manea CED',
		email: null,
		phone: null,
		document: null,
		address: null,
		logo: null,
		domain: null,
		locale: null,
		trialEndsAt: null,
		status: 'TRIAL',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new WorkspaceDomain({
		...base,
		...overrides,
	})
}

export const workspaceMocks: WorkspaceDomain[] = [
	// makeWorkspace({
	// 	workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
	// 	name: 'Marketing Team',
	// }),
	// makeWorkspace({
	// 	workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d580',
	// 	name: 'Engineering Squad',
	// 	status: 'INACTIVE',
	// }),
	// makeWorkspace({
	// 	workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
	// 	name: 'Product Ops',
	// 	recurrenceExternalId: 'cus_prod_ops_001',
	// }),
	// makeWorkspace({
	// 	workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d582',
	// 	name: 'Customer Success',
	// 	status: 'ACTIVE',
	// }),
	// makeWorkspace({
	// 	workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d583',
	// 	name: 'Finance Dept.',
	// 	status: 'INACTIVE',
	// }),
]

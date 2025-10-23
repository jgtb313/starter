import { uuid } from '@starter/common'

import type {
	Workspace,
	WorkspaceInput,
} from '@/core/workspace/workspace.schema'

type WorkspaceOverrides = Partial<WorkspaceInput>

export const makeWorkspace = (
	overrides: WorkspaceOverrides,
): WorkspaceInput => {
	const base: WorkspaceInput = {
		workspaceId: uuid(),
		planId: uuid(),
		plan: {
			planId: uuid(),
			externalId: uuid(),
			name: 'Basic',
			description: 'Basic plan',
			features: [],
			intervals: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
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

	return {
		...base,
		...overrides,
	}
}

export const workspaceMocks: Workspace[] = []

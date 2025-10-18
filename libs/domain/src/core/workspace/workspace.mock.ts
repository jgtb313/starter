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

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

export const workspaceMocks: WorkspaceDomain[] = []

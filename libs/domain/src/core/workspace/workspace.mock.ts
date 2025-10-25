import { uuid } from '@starter/common'

import type { Workspace } from '@/core/workspace/workspace.schema'

type WorkspaceOverrides = Partial<Workspace>

export const makeWorkspace = (overrides: WorkspaceOverrides): Workspace => {
	const base: Workspace = {
		workspaceId: uuid(),
		planId: uuid(),
		plan: {
			planId: uuid(),
			externalId: uuid(),
			name: 'Basic',
			description: 'Basic plan',
			features: [],
			intervals: [],
			highlight: false,
			default: false,
			status: 'ACTIVE',
			deletedAt: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		subscriptionId: null,
		subscription: null,
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
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	return {
		...base,
		...overrides,
	}
}

export const workspaceMocks: Workspace[] = []

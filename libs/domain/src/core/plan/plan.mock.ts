import { uuid } from '@starter/common'

import { PlanDomain } from '@/core/plan/plan.domain'
import type { PlanInput } from '@/core/plan/plan.schema'

type PlanOverrides = Partial<PlanInput>

export const makePlan = (overrides: PlanOverrides = {}) => {
	const now = new Date()

	const base: PlanInput = {
		planId: uuid(),
		externalId: uuid(),
		name: 'name',
		description: 'description',
		features: [],
		intervals: [],
		highlight: false,
		status: 'ACTIVE',
		deletedAt: null,
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	}

	return new PlanDomain({
		...base,
		...overrides,
	})
}

export const planMocks: PlanDomain[] = []

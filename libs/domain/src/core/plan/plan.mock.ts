import { uuid } from '@starter/common'

import type { Plan } from '@/core/plan/plan.schema'

type PlanOverrides = Partial<Plan>

export const makePlan = (overrides: PlanOverrides = {}): Plan => {
	const now = new Date()

	const base: Plan = {
		planId: uuid(),
		externalId: uuid(),
		name: 'name',
		description: 'description',
		features: [],
		intervals: [],
		highlight: false,
		default: false,
		status: 'ACTIVE',
		deletedAt: null,
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	}

	return {
		...base,
		...overrides,
	}
}

export const planMocks: Plan[] = []

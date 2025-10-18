import { uuid } from '@starter/common'

import type { Plan, PlanInput } from '@/core/plan/plan.schema'

type PlanOverrides = Partial<PlanInput>

export const makePlan = (overrides: PlanOverrides = {}): PlanInput => {
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

	return {
		...base,
		...overrides,
	}
}

export const planMocks: Plan[] = []

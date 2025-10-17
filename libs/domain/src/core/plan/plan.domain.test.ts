import { describe, expect, it } from 'vitest'

import { makePlan } from '@/core/plan/plan.mock'

describe('PlanDomain', () => {
	it('should render domain correctly', () => {
		const plan = makePlan({
			name: 'Basic',
			description: 'Basic plan',
			features: [],
			highlight: false,
			status: 'ACTIVE',
		})

		expect(plan.state).toBeDefined()
	})
})

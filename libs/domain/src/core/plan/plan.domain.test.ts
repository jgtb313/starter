import { describe, expect, it } from 'vitest'

import { makePlan } from '@/core/plan/plan.mock'

describe('PlanDomain', () => {
	it('should render domain correctly', () => {
		const plan = makePlan({})

		expect(plan.state).toBeDefined()
	})
})

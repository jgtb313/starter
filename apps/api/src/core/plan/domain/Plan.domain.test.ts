import { describe, expect, it } from 'vitest'
import { PlanIntervalEnum, PlanStatusEnum } from '@starter/schema'

import { Plan } from './Plan.domain'

describe('Plan', () => {
  it('should create a plan with the correct initial state', () => {
    const plan = new Plan({
      integrationId: 'integration-12345',
      name: 'Pro Plan',
      amount: 2500,
      interval: PlanIntervalEnum.MONTH,
      intervalCount: 1,
      features: [
        { description: 'Access to pro features', code: 'PRO_FEATURES' },
        { description: 'Priority support', code: 'PRIORITY_SUPPORT' },
      ],
      status: PlanStatusEnum.INACTIVE,
      deletedAt: null,
    })

    expect(plan.state.status).toBe(PlanStatusEnum.INACTIVE)
  })

  it('should mark the plan as active', () => {
    const plan = new Plan({
      integrationId: 'integration-12345',
      name: 'Pro Plan',
      amount: 2500,
      interval: PlanIntervalEnum.MONTH,
      intervalCount: 1,
      features: [
        { description: 'Access to pro features', code: 'PRO_FEATURES' },
        { description: 'Priority support', code: 'PRIORITY_SUPPORT' },
      ],
      status: PlanStatusEnum.INACTIVE,
      deletedAt: null,
    })

    plan.markAsActive()

    expect(plan.state.status).toBe(PlanStatusEnum.ACTIVE)
  })

  it('should mark the plan as deleted and set the deletion date', () => {
    const plan = new Plan({
      integrationId: 'integration-12345',
      name: 'Pro Plan',
      amount: 2500,
      interval: PlanIntervalEnum.MONTH,
      intervalCount: 1,
      features: [
        { description: 'Access to pro features', code: 'PRO_FEATURES' },
        { description: 'Priority support', code: 'PRIORITY_SUPPORT' },
      ],
      status: PlanStatusEnum.ACTIVE,
      deletedAt: null,
    })

    plan.markAsDeleted()

    expect(plan.state.status).toBe(PlanStatusEnum.DELETED)
    expect(plan.state.deletedAt).not.toBeNull()
  })
})

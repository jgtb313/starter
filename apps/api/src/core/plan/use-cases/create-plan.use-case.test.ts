import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePlanInput, PlanStatusEnum, PlanIntervalEnum } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { createPlan } from './create-plan.use-case'

describe('createPlan', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof createPlan>>[number]) => createPlan(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully create a plan and return the created plan', async () => {
    const input: CreatePlanInput = {
      name: 'Trial Plan',
      amount: 1500,
      interval: PlanIntervalEnum.DAY,
      intervalCount: 7,
      features: [{ description: 'Access to trial features', code: 'TRIAL_FEATURES' }],
    }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.plan.create).toBeCalledTimes(1)
    expect(result.name).toBe(input.name)
    expect(result.amount).toBe(input.amount)
    expect(result.interval).toBe(input.interval)
    expect(result.intervalCount).toBe(input.intervalCount)
    expect(result.features).toEqual(input.features)
    expect(result.status).toBe(PlanStatusEnum.INACTIVE)
  })
})

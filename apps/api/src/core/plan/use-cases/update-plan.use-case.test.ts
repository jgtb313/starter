import { beforeEach, describe, expect, it } from 'vitest'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'
import { updatePlan } from './update-plan.use-case'

describe('updatePlan', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updatePlan>>[number]) => updatePlan(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully update a plan and return the updated plan', async () => {
    const input = {
      id: 'rNrKYTX9g7z3RgJRmxWuGHnzq',
      name: 'Updated Enterprise Plan',
      amount: 6000,
      intervalCount: 4,
    }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.plan.updateById).toBeCalledWith(input.id, expect.anything())
    expect(result.name).toBe(input.name)
    expect(result.amount).toBe(input.amount)
    expect(result.intervalCount).toBe(input.intervalCount)
  })

  it('should throw an error if the plan does not exist', async () => {
    const input = { id: 'nonexistent-plan-id', name: 'Updated Plan' }

    await expect(sut().execute(input)).rejects.toThrowError(`Plan ${input.id} not found`)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.plan.updateById).not.toBeCalled()
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { PlanStatusEnum } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { activePlan } from './active-plan.use-case'

describe('activePlan', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof activePlan>>[number]) => activePlan(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully activate a plan and return updated plan', async () => {
    const input = { id: 'rNrKYTX9g7z3RgJRmxWuGHnzq' }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(result.status).toBe(PlanStatusEnum.ACTIVE)
  })

  it('should throw an error if the plan does not exist', async () => {
    const input = { id: 'nonexistent-plan-id' }

    await expect(sut().execute(input)).rejects.toThrowError(`Plan ${input.id} not found`)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.plan.updateById).not.toBeCalled()
  })

  it('should not activate a plan that is already deleted', async () => {
    const input = { id: 'rNrKYTX9g7z3RgJRmxWuGHeqw' }

    await expect(sut().execute(input)).rejects.toThrowError(`Plan ${input.id} not found`)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.plan.updateById).not.toBeCalled()
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { PlanStatusEnum } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { inactivePlan } from './inactive-plan.use-case'

describe('inactivePlan', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof inactivePlan>>[number]) => inactivePlan(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully deactivate a plan and return updated plan state', async () => {
    const input = { id: 'rNrKYTX9g7z3RgJRmxWuGHbeu' }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(result.status).toBe(PlanStatusEnum.INACTIVE)
  })

  it('should throw an error if the plan does not exist', async () => {
    const input = { id: 'nonexistent-plan-id' }

    await expect(sut().execute(input)).rejects.toThrowError(`Plan ${input.id} not found`)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.plan.updateById).not.toBeCalled()
  })

  it('should not deactivate a plan that is already deleted', async () => {
    const input = { id: 'rNrKYTX9g7z3RgJRmxWuGHeqw' }

    await expect(sut().execute(input)).rejects.toThrowError(`Plan ${input.id} not found`)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.plan.updateById).not.toBeCalled()
  })
})

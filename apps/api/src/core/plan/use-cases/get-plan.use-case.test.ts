import { beforeEach, describe, expect, it } from 'vitest'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { getPlan } from './get-plan.use-case'

describe('getPlan', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof getPlan>>[number]) => getPlan(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully retrieve a plan', async () => {
    const input = { id: 'rNrKYTX9g7z3RgJRmxWuGHnzq' }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
    expect(result.id).toBe(input.id)
  })

  it('should throw an error if the plan does not exist', async () => {
    const input = { id: 'nonexistent-plan-id' }

    await expect(sut().execute(input)).rejects.toThrowError(`Plan ${input.id} not found`)

    expect(dependencies.Repositories.plan.findById).toBeCalledWith(input.id)
  })
})

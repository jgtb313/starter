import { beforeEach, describe, expect, it } from 'vitest'
import { ListPlansInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { listPlans } from './list-plans.use-case'

describe('listPlans', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof listPlans>>[number]) => listPlans(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully list all plans', async () => {
    const input: ListPlansInput = {}

    const result = await sut().execute(input)

    expect(dependencies.Repositories.plan.find).toBeCalledWith(input)
    expect(result.values).toHaveLength(3)
    expect(result.total).toBe(3)
  })
})

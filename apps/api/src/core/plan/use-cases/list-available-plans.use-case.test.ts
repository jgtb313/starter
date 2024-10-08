import { beforeEach, describe, expect, it } from 'vitest'
import { ListAvailablePlansInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { listAvailablePlans } from './list-available-plans.use-case'

describe('listAvailablePlans', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof listAvailablePlans>>[number]) => listAvailablePlans(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully list all available plans', async () => {
    const input: ListAvailablePlansInput = {}

    const result = await sut().execute(input)

    expect(result).toHaveLength(2)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserInput } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { getUser } from './get-user.use-case'

describe('getUser', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof getUser>>[number]) => getUser(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully verify the user password', async () => {
    const input: GetUserInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
    }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.user.findById).toBeCalledWith(input.id)
    expect(result.id).toBe(input.id)
  })

  it('should throw an error if user is not found', async () => {
    const input: GetUserInput = {
      id: 'non-existent-user',
    }

    await expect(sut().execute(input)).rejects.toThrow(NotFoundError)
    expect(dependencies.Repositories.user.findById).toBeCalledWith(input.id)
  })
})

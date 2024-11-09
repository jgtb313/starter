import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserByIdInput } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/support/types'

import { getUserById } from './get-user-by-id.use-case'

describe('getUserById', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof getUserById>>[number]) => getUserById(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should retrieve a user by ID successfully', async () => {
    const input: GetUserByIdInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
    }

    const result = await sut().execute(input)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(result.id).toBe(input.id)
  })

  it('should throw NotFoundError when the user is not found', async () => {
    const input: GetUserByIdInput = {
      id: 'non-existent-user',
    }

    await expect(sut().execute(input)).rejects.toThrow(NotFoundError)
    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserByEmailInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/support/types'

import { getUserByEmail } from './get-user-by-email.use-case'

describe('getUserByEmail', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof getUserByEmail>>[number]) => getUserByEmail(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should retrieve a user by ID successfully', async () => {
    const input: GetUserByEmailInput = {
      email: 'john.doe@acme.com',
    }

    const result = await sut().execute(input)

    expect(dependencies.Database.user.findOne).toBeCalledWith(input)
    expect(result?.id).toBe('1ylq82nZJybDbTZzEB6iBzbd5xF')
  })

  it('should throw NotFoundError when the user is not found', async () => {
    const input: GetUserByEmailInput = {
      email: 'non-existent-user@acme.com',
    }

    const result = await sut().execute(input)

    expect(dependencies.Database.user.findOne).toBeCalledWith(input)
    expect(result).toBeUndefined()
  })
})

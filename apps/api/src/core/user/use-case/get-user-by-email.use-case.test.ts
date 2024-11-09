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

  it('should retrieve a user by email successfully', async () => {
    const input: GetUserByEmailInput = {
      email: 'john.doe@acme.com',
    }

    const result = await sut().execute(input)

    expect(dependencies.Database.user.findOne).toBeCalledWith({ email: input.email })
    expect(result.user?.email).toBe(input.email)
  })

  it('should returns null when the user is not found', async () => {
    const input: GetUserByEmailInput = {
      email: 'non-existent-user',
    }

    const result = await sut().execute(input)

    expect(dependencies.Database.user.findOne).toBeCalledWith({ email: input.email })
    expect(result.user).toBe(null)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { UserPasswordVerificationInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'
import { BadRequestError, NotFoundError } from '@/support/errors'

import { userPasswordVerification } from './user-password-verification.use-case'

describe('userPasswordVerification', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof userPasswordVerification>>[number]) =>
      userPasswordVerification(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully verify the user password', async () => {
    const input: UserPasswordVerificationInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      password: 'correctPassword',
    }

    dependencies.Encrypt.compare.mockReturnValue(true)

    await expect(sut().execute(input)).resolves.not.toThrow()
    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
  })

  it('should throw an error if the password is incorrect', async () => {
    const input: UserPasswordVerificationInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      password: 'wrongPassword',
    }

    dependencies.Encrypt.compare.mockReturnValue(false)

    await expect(sut().execute(input)).rejects.toThrow(BadRequestError)
    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
  })

  it('should throw an error if user is not found', async () => {
    const input: UserPasswordVerificationInput = {
      id: 'non-existent-user',
      password: 'password',
    }

    await expect(sut().execute(input)).rejects.toThrow(NotFoundError)
    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
  })
})

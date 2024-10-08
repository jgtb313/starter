import { beforeEach, describe, expect, it } from 'vitest'
import { SignInInput } from '@starter/schema'

import { AuthError } from '@/support/errors'
import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { signIn } from './sign-in.use-case'

describe('signIn', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof signIn>>[number]) => signIn(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully sign in a user and generate a token', async () => {
    const input: SignInInput = {
      email: 'john.doe@acme.com',
      password: '123123123',
    }

    dependencies.Encrypt.compare.mockReturnValue(true)
    dependencies.JWT.generate.mockReturnValue('token')

    const output = await sut().execute(input)

    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.Encrypt.compare).toBeCalledWith(input.password, 'hashedPassword')
    expect(dependencies.JWT.generate).toBeCalled()
    expect(output).toEqual({ token: 'token' })
  })

  it('should throw an AuthError if the user does not exist', async () => {
    const input: SignInInput = {
      email: 'nonexistent.user@lambda.com',
      password: '123123123',
    }

    await expect(sut().execute(input)).rejects.toThrow(AuthError)
    await expect(sut().execute(input)).rejects.toThrow('Invalid access data')

    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.Encrypt.compare).not.toBeCalled()
    expect(dependencies.JWT.generate).not.toBeCalled()
  })

  it('should throw an AuthError if the password is invalid', async () => {
    const input: SignInInput = {
      email: 'john.doe@acme.com',
      password: 'wrongPassword',
    }

    dependencies.Encrypt.compare.mockReturnValue(false)

    await expect(sut().execute(input)).rejects.toThrow(AuthError)
    await expect(sut().execute(input)).rejects.toThrow('Invalid access data')

    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.JWT.generate).not.toBeCalled()
  })
})

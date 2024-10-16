import { beforeEach, describe, expect, it } from 'vitest'
import { SignUpInput } from '@starter/schema'

import { BadRequestError } from '@/support/errors'
import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { signUp } from './sign-up.use-case'

describe('signUp', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof signUp>>[number]) => signUp(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully sign up a user and generate a token', async () => {
    const input: SignUpInput = {
      name: 'Liam Carter',
      email: 'liam.carter@lambda.com',
      password: '123123123',
    }

    const output = await sut().execute(input)

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Repositories.user.create).toBeCalled()
    expect(output).toBeDefined()
  })

  it('should throw a BadRequestError if email already exists', async () => {
    const input: SignUpInput = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: '123123123',
    }

    await expect(sut().execute(input)).rejects.toThrow(BadRequestError)
    await expect(sut().execute(input)).rejects.toThrow('E-mail john.doe@acme.com has already been taken')

    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.JWT.generate).not.toBeCalled()
    expect(dependencies.Repositories.user.create).not.toBeCalled()
  })
})

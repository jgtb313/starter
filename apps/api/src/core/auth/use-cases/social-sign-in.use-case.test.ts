import { beforeEach, describe, expect, it } from 'vitest'
import { SocialSignInInput, SocialSignInEnum } from '@starter/schema'

import { AuthError } from '@/support/errors'
import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { socialSignIn } from './social-sign-in.use-case'

describe('socialSignIn', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof socialSignIn>>[number]) => socialSignIn(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should create a new user if user does not exist', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.GOOGLE,
      token: 'tokenUnregisteredUser',
    }

    const output = await sut().execute(input)

    const createdUser = await dependencies.Repositories.user.findOne({ social: { google: { id: input.token } } })

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Repositories.user.create).toBeCalled()
    expect(createdUser?.state.email).toBe('james.smith@fakeemail.com')
    expect(output).toBeDefined()
  })

  it('should generate a token for the existing user', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.GOOGLE,
      token: 'tokenRegisteredUser',
    }

    const output = await sut().execute(input)

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Repositories.user.create).not.toBeCalled()
    expect(output).toBeDefined()
  })

  it('should use the generated email if email is not provided by SocialAuth', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.FACEBOOK,
      token: 'tokenUnregisteredUserWithoutEmail',
    }

    const output = await sut().execute(input)

    const createdUser = await dependencies.Repositories.user.findOne({ social: { facebook: { id: input.token } } })

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Repositories.user.create).toBeCalled()
    expect(createdUser?.state.email).toBe(`${input.token}@${input.context.toLowerCase()}.com`.toLowerCase())
    expect(output).toBeDefined()
  })

  it('should throw an AuthError if the token is invalid', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.FACEBOOK,
      token: 'invalidToken',
    }

    await expect(sut().execute(input)).rejects.toThrow(AuthError)
    await expect(sut().execute(input)).rejects.toThrow('Invalid access data')
  })
})

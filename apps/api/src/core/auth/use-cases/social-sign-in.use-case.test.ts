import { vi, beforeEach, describe, expect, it } from 'vitest'
import { SocialSignInInput, SocialSignInEnum } from '@starter/schema'
import { createTestDependencies, AuthError, IDependencies, ITestDependencies } from '@starter/domain'

import { socialSignIn } from './social-sign-in.use-case'

describe('socialSignIn', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof socialSignIn>>[number]) => socialSignIn(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
  })

  it('should create a new user if user does not exist', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.GOOGLE,
      providerToken: 'tokenUnregisteredUser',
    }

    const output = await sut().execute(input)

    const createdUser = await dependencies.Database.user.findOne({ social: { google: { id: input.providerToken } } })

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Database.user.create).toBeCalled()
    expect(createdUser?.state.email).toBe('james.smith@fakeemail.com')
    expect(output).toBeDefined()
  })

  it('should generate a token for the existing user', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.GOOGLE,
      providerToken: 'tokenRegisteredUser',
    }

    const output = await sut().execute(input)

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Database.user.create).not.toBeCalled()
    expect(output).toBeDefined()
  })

  it('should use the generated email if email is not provided by SocialAuth', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.FACEBOOK,
      providerToken: 'tokenUnregisteredUserWithoutEmail',
    }

    const output = await sut().execute(input)

    const createdUser = await dependencies.Database.user.findOne({ social: { facebook: { id: input.providerToken } } })

    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Database.user.create).toBeCalled()
    expect(createdUser?.state.email).toBe(`${input.providerToken}@${input.context.toLowerCase()}.com`.toLowerCase())
    expect(output).toBeDefined()
  })

  it('should throw an AuthError if the token is invalid', async () => {
    const input: SocialSignInInput = {
      context: SocialSignInEnum.FACEBOOK,
      providerToken: 'invalidToken',
    }

    await expect(sut().execute(input)).rejects.toThrow(AuthError)
    await expect(sut().execute(input)).rejects.toThrow('Invalid access data')
  })
})

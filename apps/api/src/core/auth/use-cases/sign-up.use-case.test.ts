import { describe, expect, it, vi } from 'vitest'
import { SignUpInput } from '@starter/schema'

import { TestDependencies } from '@/config/tests'
import { signUp } from './sign-up.use-case'

describe('signUp', () => {
  it('should successfully sign up a user and generate a token', async () => {
    const input: SignUpInput = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123123'
    }

    const output = await signUp(TestDependencies)(input)

    expect(TestDependencies.Database.createSession).toBeCalled()
    // expect(TestDependencies.Database.createSession().commit).toBeCalled()
    expect(TestDependencies.JWT.generate).toBeCalled()
    expect(TestDependencies.Repositories.workspace.create).toBeCalled()
    expect(TestDependencies.Repositories.user.create).toBeCalled()
    expect(output).toBeDefined()
  })

  // it('should throw an error if workspace creation fails', async () => {
  //   const input: SignUpInput = {
  //     name: 'John Doe',
  //     email: 'john@doe.com',
  //     password: '123123123'
  //   }

  //   TestDependencies.Repositories.workspace.create = vi.fn().mockRejectedValue(new Error('Workspace creation failed'))

  //   await expect(signUp(TestDependencies)(input)).rejects.toThrow('Workspace creation failed')

  //   expect(TestDependencies.Database.createSession).toBeCalled()
  //   expect(TestDependencies.Database.createSession().rollback).toBeCalled()
  //   expect(TestDependencies.JWT.generate).not.toBeCalled()
  //   expect(TestDependencies.Repositories.workspace.create).toBeCalled()
  //   expect(TestDependencies.Repositories.user.create).not.toBeCalled()
  // })
})

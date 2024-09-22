import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SignUpInput } from '@starter/schema'

import { BadRequestError } from '@/support/errors'
import { TestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'
import { signUp } from './sign-up.use-case'

describe('signUp', () => {
  let dependencies: IDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully sign up a user and generate a token', async () => {
    const input: SignUpInput = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123123'
    }

    const output = await signUp(dependencies)(input)

    expect(dependencies.Database.createSession).toBeCalled()
    // expect(dependencies.Database.createSession().commit).toBeCalled()
    expect(dependencies.JWT.generate).toBeCalled()
    expect(dependencies.Repositories.workspace.create).toBeCalled()
    expect(dependencies.Repositories.user.create).toBeCalled()
    expect(output).toBeDefined()
  })

  it('should throw an error if workspace creation fails', async () => {
    const input: SignUpInput = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123123'
    }

    dependencies.Repositories.workspace.create = vi.fn().mockRejectedValue(new Error('Workspace creation failed'))

    await expect(signUp(dependencies)(input)).rejects.toThrow('Workspace creation failed')

    expect(dependencies.Database.createSession).toBeCalled()
    // expect(dependencies.Database.createSession().rollback).toBeCalled()
    expect(dependencies.JWT.generate).not.toBeCalled()
    expect(dependencies.Repositories.workspace.create).toBeCalled()
    expect(dependencies.Repositories.user.create).not.toBeCalled()
  })

  it('should throw a BadRequestError if email already exists', async () => {
    const input: SignUpInput = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123123'
    }

    dependencies.Repositories.user.findOne = vi.fn().mockResolvedValue({ id: 'existing-user-id' })

    await expect(signUp(dependencies)(input)).rejects.toThrow(BadRequestError)
    await expect(signUp(dependencies)(input)).rejects.toThrow('E-mail john@doe.com has already been taken')

    expect(dependencies.Database.createSession).toBeCalled()
    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.JWT.generate).not.toBeCalled()
    expect(dependencies.Repositories.workspace.create).not.toBeCalled()
    expect(dependencies.Repositories.user.create).not.toBeCalled()
  })
})

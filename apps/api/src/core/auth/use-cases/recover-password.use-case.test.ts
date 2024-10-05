import { beforeEach, describe, expect, it } from 'vitest'
import { RecoverPasswordInput } from '@starter/schema'

import { ConflictError } from '@/support/errors'
import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { recoverPassword } from './recover-password.use-case'

describe('recoverPassword', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof recoverPassword>>[number]) => recoverPassword(dependencies as IDependencies)(input)
  })
  let dependencies: ITestDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully recover the password', async () => {
    const input: RecoverPasswordInput = {
      recoverPasswordToken: '7e78f837-d6e7-47df-9d9f-b50b9638e10a',
      password: 'newPassword'
    }

    const user = await dependencies.Repositories.user.findOne({ recoverPasswordToken: input.recoverPasswordToken })

    await sut().execute(input)

    const updatedUser = await dependencies.Repositories.user.findById(user?.state.id as string)

    expect(updatedUser?.state.password).toBe(dependencies.Encrypt.hash(input.password))
    expect(updatedUser?.state.recoverPasswordToken).toBeNull()
    expect(updatedUser?.state.recoverPasswordTokenExpiresIn).toBeNull()
  })

  it('should throw a ConflictError if the recover password token is invalid', async () => {
    const input: RecoverPasswordInput = {
      recoverPasswordToken: 'invalidToken',
      password: 'anyPassword'
    }

    await expect(sut().execute(input)).rejects.toThrow(ConflictError)
    await expect(sut().execute(input)).rejects.toThrow(`Invalid recoverPasswordToken ${input.recoverPasswordToken}`)

    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ recoverPasswordToken: input.recoverPasswordToken })
    expect(dependencies.Repositories.user.updateById).not.toBeCalled()
  })

  it('should throw a ConflictError if the recover password token has expired', async () => {
    const input: RecoverPasswordInput = {
      recoverPasswordToken: '5c47737e-ac15-45d9-8093-36374f131467',
      password: 'newPassword'
    }

    await expect(sut().execute(input)).rejects.toThrow(ConflictError)
    await expect(sut().execute(input)).rejects.toThrow(`recoverPasswordToken ${input.recoverPasswordToken} expired`)

    expect(dependencies.Repositories.user.findOne).toBeCalledWith({ recoverPasswordToken: input.recoverPasswordToken })
    expect(dependencies.Repositories.user.updateById).not.toBeCalled()
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserPasswordInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { updateUserPassword } from './update-user-password.use-case'

describe('updateUserPassword', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUserPassword>>[number]) => updateUserPassword(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should update the user password successfully', async () => {
    const input: UpdateUserPasswordInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      currentPassword: 'hashedPassword',
      password: 'newPassword',
    }

    await sut().execute(input)

    const result = await dependencies.Database.user.findById(input.id)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(result.state.password).toBe(dependencies.Encrypt.hash(input.password))
  })
})

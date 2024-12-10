import { vi, beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserPasswordInput } from '@starter/schema'
import { createTestDependencies, IDependencies, ITestDependencies } from '@starter/domain'

import { updateUserPassword } from './update-user-password.use-case'

describe('updateUserPassword', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUserPassword>>[number]) => updateUserPassword(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
  })

  it('should update the user password successfully', async () => {
    const input: UpdateUserPasswordInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      password: 'newPassword',
    }

    await sut().execute(input)

    const result = await dependencies.Database.user.findById(input.id)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(result.state.password).toBe(dependencies.Encrypt.hash(input.password))
  })
})

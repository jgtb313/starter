import { vi, beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserInput } from '@starter/schema'
import { createTestDependencies, IDependencies, ITestDependencies } from '@starter/domain'

import { updateUser } from './update-user.use-case'

describe('updateUser', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUser>>[number]) => updateUser(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
  })

  it('should update the user details successfully', async () => {
    const input: UpdateUserInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      name: 'Updated Name',
    }

    const result = await sut().execute(input)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(dependencies.Database.user.updateById).toBeCalled()
    expect(result.name).toBe(input.name)
  })
})

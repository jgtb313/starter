import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserMeInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { updateUser } from './update-user.use-case'

describe('updateUser', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUser>>[number]) => updateUser(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully verify the user password', async () => {
    const input: UpdateUserMeInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      name: 'Updated Name',
    }

    const result = await sut().execute(input)

    expect(dependencies.Repositories.user.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.user.updateById).toBeCalled()
    expect(result.name).toBe(input.name)
  })
})

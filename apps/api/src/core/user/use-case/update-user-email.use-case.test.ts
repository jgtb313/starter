import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserEmailInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { updateUserEmail } from './update-user-email.use-case'

describe('updateUserEmail', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUserEmail>>[number]) => updateUserEmail(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should update the user email successfully', async () => {
    const input: UpdateUserEmailInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      email: 'john@doe.com',
    }

    await sut().execute(input)

    const result = await dependencies.Database.user.findById(input.id)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(dependencies.Database.user.updateById).toBeCalled()
    expect(result.state.email).toBe(input.email)
  })
})

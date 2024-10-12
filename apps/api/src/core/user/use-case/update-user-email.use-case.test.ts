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

  it('should successfully verify the user password', async () => {
    const input: UpdateUserEmailInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      email: 'john@doe.com',
    }

    await sut().execute(input)

    const result = await dependencies.Repositories.user.findById(input.id)

    expect(dependencies.Repositories.user.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.user.updateById).toBeCalled()
    expect(result.state.email).toBe(input.email)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { ForgotPasswordInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/support/types'

import { forgotPassword } from './forgot-password.use-case'

describe('forgotPassword', async () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof forgotPassword>>[number]) => forgotPassword(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully send a recovery email and update user token', async () => {
    const input: ForgotPasswordInput = {
      email: 'john.doe@acme.com',
    }

    await sut().execute(input)

    expect(dependencies.Database.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.Mail.send).toBeCalled()
    expect(dependencies.Database.user.updateById).toBeCalled()
  })

  it('should not send an email if user does not exist', async () => {
    const input: ForgotPasswordInput = {
      email: 'nonexistent.user@lambda.com',
    }

    await sut().execute(input)

    expect(dependencies.Database.user.findOne).toBeCalledWith({ email: input.email })
    expect(dependencies.Mail.send).not.toBeCalled()
    expect(dependencies.Database.user.updateById).not.toBeCalled()
  })
})

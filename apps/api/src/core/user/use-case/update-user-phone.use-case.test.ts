import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserPhoneInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/support/types'

import { updateUserPhone } from './update-user-phone.use-case'

describe('updateUserPhone', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUserPhone>>[number]) => updateUserPhone(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should update the user phone number successfully', async () => {
    const input: UpdateUserPhoneInput = {
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      phone: {
        iso: 'BR',
        ddi: '+55',
        number: '98991143200',
      },
    }

    await sut().execute(input)

    const result = await dependencies.Database.user.findById(input.id)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(dependencies.Database.user.updateById).toBeCalled()
    expect(result.state.phone).toStrictEqual(input.phone)
  })
})

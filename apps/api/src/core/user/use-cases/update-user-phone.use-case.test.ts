import { vi, beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserPhoneInput } from '@starter/schema'
import { createTestDependencies, IDependencies, ITestDependencies } from '@starter/domain'

import { updateUserPhone } from './update-user-phone.use-case'

describe('updateUserPhone', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof updateUserPhone>>[number]) => updateUserPhone(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
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

    const output = await sut().execute(input)

    expect(dependencies.Database.user.findById).toBeCalledWith(input.id)
    expect(dependencies.Database.user.updateById).toBeCalled()
    expect(output.phone).toStrictEqual(input.phone)
  })
})

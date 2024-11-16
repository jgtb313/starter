import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/support/types'

import { authenticate } from './authenticate.use-case'

describe('authenticate', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof authenticate>>[number]) => authenticate(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully generate an access token for a valid authorization token', async () => {
    const input: AuthenticateInput = {
      authorizationToken: 'validAuthToken',
    }

    dependencies.JWT.decode.mockReturnValue({ userId: '1ylq82nZJybDbTZzEB6iBzbd5xF' })

    const result = await sut().execute(input)

    expect(dependencies.JWT.decode).toBeCalledWith(input.authorizationToken, expect.any(String))
    expect(dependencies.Database.user.findById).toBeCalledWith('1ylq82nZJybDbTZzEB6iBzbd5xF')
    expect(dependencies.JWT.generate).toBeCalledWith(expect.any(Object), expect.any(String))
    expect(result.accessToken).toBe('accessToken')
  })
})

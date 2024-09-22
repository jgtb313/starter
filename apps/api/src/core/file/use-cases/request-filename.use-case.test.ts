import { beforeEach, describe, expect, it } from 'vitest'
import { RequestFilenameInput, FileContextEnum } from '@starter/schema'

import { TestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'

import { requestFilename } from './request-filename.use-case'

describe('requestFilename', () => {
  let dependencies: IDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should return a signed URL for an organization logo', async () => {
    const input: RequestFilenameInput = {
      context: FileContextEnum.ORGANIZATION_LOGO,
      filename: 'logo.png'
    }

    const output = await requestFilename(dependencies)(input)

    expect(dependencies.Storage.getSignedUrl).toBeCalledWith('organizations/logo/logo.png')
    expect(output).toEqual({
      filename: 'https://static.example.com.br/organizations/logo/logo.png',
      filenameSigned: 'https://example-assets.s3.us-east-1.amazonaws.com/organizations/logo/logo.png'
    })
  })

  it('should return a signed URL for a user avatar', async () => {
    const input: RequestFilenameInput = {
      context: FileContextEnum.USER_AVATAR,
      filename: 'avatar.png'
    }

    const output = await requestFilename(dependencies)(input)

    expect(dependencies.Storage.getSignedUrl).toBeCalledWith('users/avatar/avatar.png')
    expect(output).toEqual({
      filename: 'https://static.example.com.br/users/avatar/avatar.png',
      filenameSigned: 'https://example-assets.s3.us-east-1.amazonaws.com/users/avatar/avatar.png'
    })
  })
})

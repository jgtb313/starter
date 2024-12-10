import { vi, beforeEach, describe, expect, it } from 'vitest'
import { RequestFilenameInput, FileContextEnum } from '@starter/schema'
import { createTestDependencies, IDependencies, ITestDependencies } from '@starter/domain'

import { requestFilename } from './request-filename.use-case'

describe('requestFilename', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof requestFilename>>[number]) => requestFilename(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
  })

  it('should return a signed URL for a user avatar', async () => {
    const input: RequestFilenameInput = {
      context: FileContextEnum.USER_AVATAR,
      filename: 'avatar.png',
    }

    const output = await sut().execute(input)

    expect(dependencies.Storage.getSignedUrl).toBeCalledWith('users/avatar/avatar.png')
    expect(output).toEqual({
      filename: 'https://https://fake-static-assets.com/users/avatar/avatar.png',
      filenameSigned: 'https://fake-assets-bucket.s3.us-east-1.amazonaws.com/users/avatar/avatar.png',
    })
  })
})

import { RequestFilenameSchema, RequestFilenameInput, RequestFilenameOutput, FileContextEnum } from '@starter/schema'
import { createUseCase, IUseCaseExecute } from '@starter/domain'

const execute: IUseCaseExecute<RequestFilenameInput, RequestFilenameOutput> =
  ({ Storage }) =>
  async ({ context, filename }) => {
    const contexts: Record<FileContextEnum, string> = {
      [FileContextEnum.USER_AVATAR]: 'users/avatar',
    }

    const bucket = contexts[context]

    const file = `${bucket}/${filename}`

    return Storage.getSignedUrl(file)
  }

export const requestFilename = createUseCase(execute, RequestFilenameSchema)

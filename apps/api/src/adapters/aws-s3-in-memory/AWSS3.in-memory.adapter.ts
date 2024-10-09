import { vi } from 'vitest'

import { env } from '@/config'
import { SetupTestDependencies } from '@/config/tests'
import { IStorage } from '@/ports/storage'

export const StorageInMemory: SetupTestDependencies<IStorage> = {
  getSignedUrl: vi.fn(async (key) => {
    const AWS_S3_FILE_BUCKET = env('AWS_S3_FILE_BUCKET')
    const STATIC_IMAGE_URL = env('STATIC_IMAGE_URL')

    return {
      filename: `https://${STATIC_IMAGE_URL}/${key}`,
      filenameSigned: `https://${AWS_S3_FILE_BUCKET}.s3.us-east-1.amazonaws.com/${key}`,
    }
  }),
}

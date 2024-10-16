import { vi } from 'vitest'

import { env } from '@/config'
import { SetupTestDependencies } from '@/config/tests'
import { IStorage } from '@/ports/storage'

export const StorageInMemory: SetupTestDependencies<IStorage> = {
  getSignedUrl: vi.fn(async (key) => {
    const STATIC_ASSETS_URL = env('STATIC_ASSETS_URL')
    const AWS_S3_ASSETS_BUCKET = env('AWS_S3_ASSETS_BUCKET')

    return {
      filename: `https://${STATIC_ASSETS_URL}/${key}`,
      filenameSigned: `https://${AWS_S3_ASSETS_BUCKET}.s3.us-east-1.amazonaws.com/${key}`,
    }
  }),
}

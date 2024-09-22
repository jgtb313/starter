import { vi } from 'vitest'

import { IStorage } from '@/ports/storage'

export const StorageInMemory: IStorage = {
  getSignedUrl: vi.fn(async (key) => {
    return {
      filename: `https://static.example.com.br/${key}`,
      filenameSigned: `https://example-assets.s3.us-east-1.amazonaws.com/${key}`
    }
  })
}

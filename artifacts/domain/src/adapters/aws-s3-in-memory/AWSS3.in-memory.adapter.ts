import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.types'
import { IStorage } from '../../ports/storage'

export const StorageInMemory = ({ vi, env }: CreateTestDependenciesOptions): SetupTestDependencies<IStorage> => ({
  getSignedUrl: vi.fn(async (key) => {
    return {
      filename: `https://${env.STATIC_ASSETS_URL}/${key}`,
      filenameSigned: `https://${env.AWS_S3_ASSETS_BUCKET}.s3.us-east-1.amazonaws.com/${key}`,
    }
  }),
})

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { CreateDependenciesOptions } from '../../domain.types'
import { IStorage } from '../../ports/storage'

export const Storage = ({ env }: CreateDependenciesOptions): IStorage => ({
  async getSignedUrl(key) {
    const S3 = new S3Client({
      region: env.AWS_S3_REGION,
    })

    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_ASSETS_BUCKET,
      Key: key,
      ACL: 'public-read',
    })

    const filenameSigned = await getSignedUrl(S3, command, { expiresIn: 120 })

    return {
      filename: `https://${env.STATIC_ASSETS_URL}/${key}`,
      filenameSigned,
    }
  },
})

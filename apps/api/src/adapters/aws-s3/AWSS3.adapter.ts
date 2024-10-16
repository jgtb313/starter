import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { env } from '@/config'
import { IStorage } from '@/ports/storage'

const STATIC_ASSETS_URL = env('STATIC_ASSETS_URL')
const AWS_S3_REGION = env('AWS_S3_REGION')
const AWS_S3_ASSETS_BUCKET = env('AWS_S3_ASSETS_BUCKET')

const S3 = new S3Client({
  region: AWS_S3_REGION,
})

export const Storage: IStorage = {
  async getSignedUrl(key) {
    const command = new PutObjectCommand({
      Bucket: AWS_S3_ASSETS_BUCKET,
      Key: key,
      ACL: 'public-read',
    })

    const filenameSigned = await getSignedUrl(S3, command, { expiresIn: 120 })

    return {
      filename: `https://${STATIC_ASSETS_URL}/${key}`,
      filenameSigned,
    }
  },
}

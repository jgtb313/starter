import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { env } from '@/config'
import { IStorage } from '@/ports/storage'

const AWS_S3_REGION = env('AWS_S3_REGION')
const AWS_S3_FILE_BUCKET = env('AWS_S3_FILE_BUCKET')

const S3 = new S3Client({
  region: AWS_S3_REGION
})

export const Storage: IStorage = {
  async getSignedUrl(key) {
    const command = new PutObjectCommand({
      Bucket: AWS_S3_FILE_BUCKET,
      Key: key,
      ACL: 'public-read'
    })

    const filenameSigned = await getSignedUrl(S3, command, { expiresIn: 120 })

    return {
      filename: `https://${AWS_S3_FILE_BUCKET}.s3.amazonaws.com/${key}`,
      filenameSigned
    }
  }
}

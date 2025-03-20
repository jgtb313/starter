import { describe, it, expect } from 'vitest'
import { getPresignedUrl } from '@starter/client'
import { unsafe } from '@starter/common'

describe('File', () => {
  describe('Get Presigned URL', () => {
    it('should return a signed file with filename and signed URL', async () => {
      const response = await getPresignedUrl({
        filename: 'avatar.png',
        context: 'USER_AVATAR',
      })

      expect(response.filename).toBeDefined()
      expect(response.filenameSigned).toBeDefined()
    })

    it('should return input validation errors', async () => {
      const input = unsafe({})

      await expect(getPresignedUrl(input)).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [
          {
            filename: 'Campo obrigatório',
          },
          {
            context: 'Campo obrigatório',
          },
        ],
      })
    })
  })
})

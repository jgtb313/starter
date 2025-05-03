export type GetPresignedUrlOptions = {
  expiresInSeconds?: number
}

export type IPresignedUrlAdapter = {
  getPresignedUrl(fileName: string, options?: GetPresignedUrlOptions): Promise<string>
}

export type IPresignedUrl = {
  getPresignedUrl(
    fileName: string,
    options?: GetPresignedUrlOptions,
  ): Promise<{
    fileName: string
    fileNameSigned: string
  }>
}

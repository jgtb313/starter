export type GetPresignedUrlOptions = {
  expiresInSeconds?: number
}

export type IPresignedUrlAdapter = {
  getPresignedUrl(filename: string, options?: GetPresignedUrlOptions): Promise<string>
}

export type IPresignedUrl = {
  getPresignedUrl(
    filename: string,
    options?: GetPresignedUrlOptions,
  ): Promise<{
    filename: string
    filenameSigned: string
  }>
}

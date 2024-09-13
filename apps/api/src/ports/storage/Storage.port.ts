export type IStorage = {
  getSignedUrl(key: string): Promise<{ filename: string; filenameSigned: string }>
}

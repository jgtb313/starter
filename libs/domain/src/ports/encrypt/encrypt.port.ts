export type IEncryptAdapter = {
  hash(plainText: string): Promise<string>
  compare(plainText: string, hash: string): Promise<boolean>
}

export type IEncrypt = {
  hash(plainText: string): Promise<string>
  compare(plainText: string, hash: string): Promise<boolean>
}

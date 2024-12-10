export type IEncrypt = {
  hash(value: string): string
  compare(value: string, hash: string): boolean
}

export type JWTGenerateOptions = {
  expiresIn?: string
}

export type IJWT = {
  generate(value: unknown, secret: string, options?: JWTGenerateOptions): string
  decode<T>(value: string, secret: string): T
}

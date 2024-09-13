export type JWTGenerateOptions = {
  expiresIn?: string
}

export type IJWT = {
  generate(value: unknown, options?: JWTGenerateOptions): string
  decode<T>(value: string): T
}

export type WithoutId<T> = Omit<T, 'id'>

export type ApiError = {
  statusCode: number
  error: string
  message: string
  issues: Record<string, string>[]
}

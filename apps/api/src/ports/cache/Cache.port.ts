export type ICache = {
  connect(): Promise<void>
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T, options?: { expiresIn?: number }): Promise<void>
  disconnect(): Promise<void>
}

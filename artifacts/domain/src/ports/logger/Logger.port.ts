export type ILogger = {
  connect: () => void
  info<T>(input: T): Promise<void>
  warn<T>(input: T): Promise<void>
  error<T>(input: T): Promise<void>
}

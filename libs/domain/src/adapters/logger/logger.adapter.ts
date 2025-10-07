export interface ILoggerAdapter {
	info<T>(message: string, event: T): Promise<void>
	warn<T>(message: string, event: T): Promise<void>
	error<T>(message: string, event: T): Promise<void>
}

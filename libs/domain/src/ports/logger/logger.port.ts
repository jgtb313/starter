export type ILoggerAdapter = {
	info<T>(message: string, event: T): Promise<void>
	warn<T>(message: string, event: T): Promise<void>
	error<T>(message: string, event: T): Promise<void>
}

export type ILogger = {
	info<T>(message: string, event: T): Promise<void>
	warn<T>(message: string, event: T): Promise<void>
	error<T>(message: string, event: T): Promise<void>
}

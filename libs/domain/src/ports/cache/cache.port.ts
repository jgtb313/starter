export type ICacheSetOptions = {
	expiresIn?: number
}

export type ICache = {
	get<T>(key: string): Promise<T | undefined>
	set<T>(key: string, value: T, options?: ICacheSetOptions): Promise<void>
	delete(key: string): Promise<void>
}

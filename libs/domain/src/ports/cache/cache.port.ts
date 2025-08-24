export type ICacheSetOptions = {
	expiresIn?: number
}

export type ICacheAdapter = {
	get<T>(key: string): Promise<T | undefined>
	set<T>(key: string, value: T, options?: ICacheSetOptions): Promise<void>
	del(key: string): Promise<void>
}

export type ICache = {
	get<T>(key: string): Promise<T | undefined>
	set<T>(key: string, value: T, options?: ICacheSetOptions): Promise<void>
	del(key: string): Promise<void>
}

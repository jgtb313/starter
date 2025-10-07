export type ICacheAdapterSetOptions = {
	expiresIn?: number
}

export interface ICacheAdapter {
	get<T>(key: string): Promise<T | undefined>
	set<T>(
		key: string,
		value: T,
		options?: ICacheAdapterSetOptions,
	): Promise<void>
	del(key: string): Promise<void>
}

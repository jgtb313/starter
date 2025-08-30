export type IPublisherAdapter = {
	publish<T extends object>(target: string, eventInput: T): Promise<void>
}

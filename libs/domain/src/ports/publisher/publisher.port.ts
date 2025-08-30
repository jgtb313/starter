export type PublisherEventTransport = 'SNS' | 'SQS' | 'KAFKA'

export type PublisherEventsInput = {
	USER_CREATED: {
		input: {
			userId: string
		}
	}
	WORKSPACE_CREATED: {
		input: {
			workspaceId: string
		}
	}
}

export type PublisherEventType = keyof PublisherEventsInput

export type PublisherEventInput<T extends PublisherEventType> =
	PublisherEventsInput[T]['input']

export const PublisherEvents: Record<
	PublisherEventType,
	PublisherEventTransport
> = {
	USER_CREATED: 'SNS',
	WORKSPACE_CREATED: 'SQS',
}

export type IPublisherService = {
	publish<T extends PublisherEventType>(
		eventType: T,
		eventInput: PublisherEventInput<T>,
	): Promise<void>
}

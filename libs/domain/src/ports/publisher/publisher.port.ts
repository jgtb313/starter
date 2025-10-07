export type PublisherEventTransport = 'SNS' | 'SQS' | 'KAFKA'

export type PublisherEventsInput = {
	USER_CREATED: {
		userId: string
	}
	WORKSPACE_CREATED: {
		workspaceId: string
	}
	WORKSPACE_UPDATED: {
		workspaceId: string
	}
	WORKSPACE_ACTIVATED: {
		workspaceId: string
	}
	WORKSPACE_DEACTIVATED: {
		workspaceId: string
	}
}

export type PublisherEventType = keyof PublisherEventsInput

export type PublisherEventInput<T extends PublisherEventType> =
	PublisherEventsInput[T]

export const PublisherEvents: Record<
	PublisherEventType,
	PublisherEventTransport
> = {
	USER_CREATED: 'SNS',
	WORKSPACE_CREATED: 'SQS',
	WORKSPACE_UPDATED: 'SQS',
	WORKSPACE_ACTIVATED: 'SQS',
	WORKSPACE_DEACTIVATED: 'SQS',
}

export interface IPublisherService {
	publish<T extends PublisherEventType>(
		eventType: T,
		eventInput: PublisherEventInput<T>,
	): Promise<void>
}

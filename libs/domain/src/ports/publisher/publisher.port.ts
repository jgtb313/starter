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
	WORKSPACE_UPDATED: {
		input: {
			workspaceId: string
		}
	}
	WORKSPACE_ACTIVATED: {
		input: {
			workspaceId: string
		}
	}
	WORKSPACE_DEACTIVATED: {
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
	WORKSPACE_UPDATED: 'SQS',
	WORKSPACE_ACTIVATED: 'SQS',
	WORKSPACE_DEACTIVATED: 'SQS',
}

export type IPublisherService = {
	publish<T extends PublisherEventType>(
		eventType: T,
		eventInput: PublisherEventInput<T>,
	): Promise<void>
}

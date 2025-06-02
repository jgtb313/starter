export type EventTransport = 'SNS' | 'SQS' | 'KAFKA'

export type EventsMap = {
  USER_CREATED: {
    input: { userId: string }
    transport: 'SNS'
  }
  WORKSPACE_CREATED: {
    input: { workspaceId: string }
    transport: 'SQS'
  }
}

export type EventType = keyof EventsMap

export type EventInput = {
  [K in keyof EventsMap]: EventsMap[K]['input']
}

export const Events: {
  [K in keyof EventsMap]: EventsMap[K]['transport']
} = {
  USER_CREATED: 'SNS',
  WORKSPACE_CREATED: 'SQS',
} as const

export type IPublisherAdapter = {
  publish<T extends object>(target: string, eventInput: T): Promise<void>
}

export type IPublisherService = {
  publish<T extends EventType>(eventType: T, eventInput: EventInput[T]): Promise<void>
}

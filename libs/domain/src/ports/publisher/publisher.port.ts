export type EventType = 'SNS_EXAMPLE' | 'SQS_EXAMPLE'

export type SNSExampleEventInput = {
  sns: string
}

export type SQSExampleEventInput = {
  sqs: string
}

export type EventInput = {
  SNS_EXAMPLE: SNSExampleEventInput
  SQS_EXAMPLE: SQSExampleEventInput
}

export type IPublisherAdapter = {
  publish<T extends {}>(target: string, eventInput: T): Promise<void>
}

export type IPublisherService = {
  publish<T extends EventType>(eventType: T, eventInput: EventInput[T]): Promise<void>
}

import type { S3Event, SNSEvent, SQSEvent } from 'aws-lambda'

export type LambdaEvent = SNSEvent | SQSEvent | S3Event

export const parseLambdaEvent = <T>(event: LambdaEvent): T => {
	const record = event.Records[0]

	if ('Sns' in record) {
		return JSON.parse(record.Sns.Message) as T
	}

	if ('body' in record) {
		return JSON.parse(record.body) as T
	}

	if ('s3' in record) {
		return record as unknown as T
	}

	throw new Error('Unsupported event type')
}

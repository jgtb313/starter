import type { SQS } from '@aws-sdk/client-sqs'
import { Injectable } from '@nestjs/common'

import type { IPublisherAdapter } from '@/adapters/publisher/publisher.adapter'

@Injectable()
export class AWSSQSAdapter implements IPublisherAdapter {
	constructor(private readonly client: SQS) {}

	publish: IPublisherAdapter['publish'] = async (target, input) => {
		await this.client.sendMessage({
			QueueUrl: target,
			MessageBody: JSON.stringify(input),
		})
	}
}

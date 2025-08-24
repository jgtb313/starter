import type { SQS } from '@aws-sdk/client-sqs'
import { Injectable } from '@nestjs/common'

import type { IPublisherAdapter } from '@/ports/publisher'

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

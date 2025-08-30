import type { SNS } from '@aws-sdk/client-sns'
import { Injectable } from '@nestjs/common'

import type { IPublisherAdapter } from '@/adapters/publisher/publisher.adapter'

@Injectable()
export class AWSSNSAdapter implements IPublisherAdapter {
	constructor(private readonly client: SNS) {}

	publish: IPublisherAdapter['publish'] = async (target, input) => {
		await this.client.publish({
			TopicArn: target,
			Message: JSON.stringify(input),
		})
	}
}

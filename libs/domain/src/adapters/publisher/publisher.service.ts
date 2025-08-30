import { Injectable } from '@nestjs/common'
import { ConflictException } from '@starter/nestjs-error-handling'

import type { AWSSNSAdapter } from '@/adapters/publisher/aws-sns.adapter'
import type { AWSSQSAdapter } from '@/adapters/publisher/aws-sqs.adapter'
import { type IPublisherService, PublisherEvents } from '@/ports/publisher'

@Injectable()
export class PublisherService implements IPublisherService {
	constructor(
		private readonly awsSNS: AWSSNSAdapter,
		private readonly awsSQS: AWSSQSAdapter,
	) {}

	publish: IPublisherService['publish'] = async (eventType, eventInput) => {
		const transport = PublisherEvents[eventType]

		if (!transport) {
			throw new ConflictException(`Unsupported eventType: ${eventType}`)
		}

		switch (transport) {
			case 'SNS':
				return this.awsSNS.publish(eventType, eventInput)
			case 'SQS':
				return this.awsSQS.publish(eventType, eventInput)
			case 'KAFKA':
				throw new ConflictException('Not implemented yet')
			default:
				throw new ConflictException(`Unsupported transport: ${transport}`)
		}
	}
}

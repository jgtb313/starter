import { ConflictException } from '@starter/nestjs-error-handling'

import { Inject, Injectable } from '@nestjs/common'

import { LoggerService } from '@/adapters/logger/logger.service'
import { AWSSNSAdapter } from '@/adapters/publisher/aws-sns.adapter'
import { AWSSQSAdapter } from '@/adapters/publisher/aws-sqs.adapter'
import { type IPublisherService, PublisherEvents } from '@/ports/publisher'

@Injectable()
export class PublisherService implements IPublisherService {
	constructor(
		@Inject(AWSSNSAdapter)
		private readonly awsSNS: AWSSNSAdapter,
		@Inject(AWSSQSAdapter)
		private readonly awsSQS: AWSSQSAdapter,
		@Inject(LoggerService)
		private readonly logger: LoggerService,
	) {}

	publish: IPublisherService['publish'] = async (eventType, eventInput) => {
		const transport = PublisherEvents[eventType]

		if (!transport) {
			throw new ConflictException(`Unsupported eventType: ${eventType}`)
		}

		this.logger.info(`Publishing event: ${eventType}`, eventInput)

		// switch (transport) {
		// 	case 'SNS':
		// 		return this.awsSNS.publish(eventType, eventInput)
		// 	case 'SQS':
		// 		return this.awsSQS.publish(eventType, eventInput)
		// 	case 'KAFKA':
		// 		throw new ConflictException('Not implemented yet')
		// 	default:
		// 		throw new ConflictException(`Unsupported transport: ${transport}`)
		// }
	}
}

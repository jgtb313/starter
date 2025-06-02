import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NotFoundException, ConflictException } from '@starter/nestjs-error-handling'

import { IPublisherService, Events, EventType } from '@/ports/publisher'
import { AWSSNSAdapter } from '@/adapters/publisher/aws-sns.adapter'
import { AWSSQSAdapter } from '@/adapters/publisher/aws-sqs.adapter'

@Injectable()
export class PublisherService implements IPublisherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsSNS: AWSSNSAdapter,
    private readonly awsSQS: AWSSQSAdapter,
  ) {}

  publish: IPublisherService['publish'] = async (eventType, eventInput) => {
    const { transport, target } = this.getEvent(eventType)

    switch (transport) {
      case 'SNS':
        return this.awsSNS.publish(target, eventInput)
      case 'SQS':
        return this.awsSQS.publish(target, eventInput)
      default:
        throw new ConflictException(`Unsupported transport: ${transport}`)
    }
  }

  private getEvent<T extends EventType>(eventType: T) {
    const transport = Events[eventType]

    if (!transport) {
      throw new NotFoundException(`Event type ${eventType} not found.`)
    }

    const target = this.configService.get<string>(`${eventType}_TARGET`)

    if (!target) {
      throw new NotFoundException(`Target for ${eventType} not found in config.`)
    }

    return { transport, target }
  }
}

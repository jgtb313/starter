import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

import { IPublisherService } from '@/ports/publisher'
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
    if (eventType === 'SNS_EXAMPLE') {
      await this.awsSNS.publish(this.configService.get('SNS_EXAMPLE_TOPIC_ARN')!, eventInput)
    } else if (eventType === 'SQS_EXAMPLE') {
      await this.awsSQS.publish(this.configService.get('SQS_EXAMPLE_TOPIC_ARN')!, eventInput)
    }

    return
  }
}

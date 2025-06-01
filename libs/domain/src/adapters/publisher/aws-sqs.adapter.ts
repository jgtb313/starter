import { Injectable } from '@nestjs/common'
import { SQS } from '@aws-sdk/client-sqs'

import { IPublisherAdapter } from '@/ports/publisher'

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

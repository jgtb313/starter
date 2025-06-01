import { Injectable } from '@nestjs/common'
import { SNS } from '@aws-sdk/client-sns'

import { IPublisherAdapter } from '@/ports/publisher'

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

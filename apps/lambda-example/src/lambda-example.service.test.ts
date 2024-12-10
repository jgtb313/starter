import { vi, beforeEach, describe, expect, it } from 'vitest'
import { SignInInput } from '@starter/schema'
import { createTestDependencies, IDependencies, ITestDependencies, LambdaEvent } from '@starter/domain'

import { lambdaExample } from './lambda-example.service'

describe('lambdaExample', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof lambdaExample>>[number]) => lambdaExample(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
  })

  it('should return a signed URL for a user avatar', async () => {
    const input: SignInInput = {
      email: 'example@email.com',
      password: 'password'
    }

    const event: LambdaEvent = {
      "Records": [
        {
          "messageId": "1a234bc5-d67e-8901-2345-f678901g2h34",
          "receiptHandle": "AQEBwJnKyrh2+example==",
          "body": JSON.stringify(input),
          "attributes": {
            "ApproximateReceiveCount": "1",
            "SentTimestamp": "1643651123456",
            "SenderId": "123456789012",
            "ApproximateFirstReceiveTimestamp": "1643651123478"
          },
          "messageAttributes": {
            "AttributeKey": {
              "stringValue": "AttributeValue",
              "binaryValue": "BinaryValue",
              "stringListValues": [],
              "binaryListValues": [],
              "dataType": "String"
            }
          },
          "md5OfBody": "098f6bcd4621d373cade4e832627b4f6",
          "eventSource": "aws:sqs",
          "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:example-queue",
          "awsRegion": "us-east-1"
        }
      ]
    }
    

    const output = await sut().execute(event)

    expect(output.accessToken).toBe('accessToken')
  })
})

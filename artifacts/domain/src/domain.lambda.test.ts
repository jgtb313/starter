import { vi, describe, expect, it, beforeEach } from 'vitest'
import { SQSEvent } from 'aws-lambda'
import { z } from '@starter/schema'
import { uuid } from '@starter/shared'

import { createTestDependencies, IDependencies, ITestDependencies } from './domain.dependencies'
import { createLambdaHandler, ILambdaHandlerExecute } from './domain.lambda'

describe('utilities', () => {
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await createTestDependencies(vi)
  })

  describe('createLambdaHandler', () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    type Input = z.infer<typeof schema>
    type Output = Input & {
      id: string
    }

    const execute: ILambdaHandlerExecute<Input, Output> = () => async (input) => {
      return {
        ...input,
        id: uuid(),
      }
    }

    it('should execute the use case without schema validation', async () => {
      const input: SQSEvent = {
        Records: [
          {
            messageId: '1a234bc5-d67e-8901-2345-f678901g2h34',
            receiptHandle: 'AQEBwJnKyrh2+example==',
            body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
            attributes: {
              ApproximateReceiveCount: '1',
              SentTimestamp: '1643651123456',
              SenderId: '123456789012',
              ApproximateFirstReceiveTimestamp: '1643651123478',
            },
            messageAttributes: {
              AttributeKey: {
                stringValue: 'AttributeValue',
                binaryValue: 'BinaryValue',
                stringListValues: [],
                binaryListValues: [],
                dataType: 'String',
              },
            },
            md5OfBody: '098f6bcd4621d373cade4e832627b4f6',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:123456789012:example-queue',
            awsRegion: 'us-east-1',
          },
        ],
      }

      const result = await createLambdaHandler(execute)(dependencies as IDependencies)(input)

      expect(result.id).toBeDefined()
    })

    it('should execute the use case with schema validation', async () => {
      const input: SQSEvent = {
        Records: [
          {
            messageId: '1a234bc5-d67e-8901-2345-f678901g2h34',
            receiptHandle: 'AQEBwJnKyrh2+example==',
            body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
            attributes: {
              ApproximateReceiveCount: '1',
              SentTimestamp: '1643651123456',
              SenderId: '123456789012',
              ApproximateFirstReceiveTimestamp: '1643651123478',
            },
            messageAttributes: {
              AttributeKey: {
                stringValue: 'AttributeValue',
                binaryValue: 'BinaryValue',
                stringListValues: [],
                binaryListValues: [],
                dataType: 'String',
              },
            },
            md5OfBody: '098f6bcd4621d373cade4e832627b4f6',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:123456789012:example-queue',
            awsRegion: 'us-east-1',
          },
        ],
      }

      const result = await createLambdaHandler(execute, schema)(dependencies as IDependencies)(input)

      expect(result.id).toBeDefined()
    })

    it('should throw an error if validation fails', () => {
      const input: SQSEvent = {
        Records: [
          {
            messageId: '1a234bc5-d67e-8901-2345-f678901g2h34',
            receiptHandle: 'AQEBwJnKyrh2+example==',
            body: JSON.stringify({ name: 'John Doe', email: 'invalid-email' }),
            attributes: {
              ApproximateReceiveCount: '1',
              SentTimestamp: '1643651123456',
              SenderId: '123456789012',
              ApproximateFirstReceiveTimestamp: '1643651123478',
            },
            messageAttributes: {
              AttributeKey: {
                stringValue: 'AttributeValue',
                binaryValue: 'BinaryValue',
                stringListValues: [],
                binaryListValues: [],
                dataType: 'String',
              },
            },
            md5OfBody: '098f6bcd4621d373cade4e832627b4f6',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:123456789012:example-queue',
            awsRegion: 'us-east-1',
          },
        ],
      }

      expect(() => createLambdaHandler(execute, schema)(dependencies as IDependencies)).toThrow(z.ZodError)
    })
  })
})

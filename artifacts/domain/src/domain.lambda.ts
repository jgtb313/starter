import { SNSEvent, SQSEvent } from 'aws-lambda'
import { ZodSchema } from '@starter/schema'

import { IDependencies } from './domain.dependencies'
import { bootstrap } from './domain.bootstrap'

const parseSNSSQSEvent = <T>(event: SNSEvent | SQSEvent): T => {
  const record = event.Records[0]

  if ('Sns' in record) {
    return JSON.parse(record.Sns.Message) as T
  }

  return JSON.parse(record.body) as T
}

export type LambdaEvent = SNSEvent | SQSEvent

export type ILambdaHandlerExecute<T, P> = (dependencies: IDependencies) => (input: T) => Promise<P>

export const createLambdaHandler =
  <T, P>(execute: ILambdaHandlerExecute<T, P>, Schema?: ZodSchema) =>
  (dependencies: IDependencies) =>
  async (event: LambdaEvent) => {
    await bootstrap(dependencies)

    const props = parseSNSSQSEvent<T>(event)

    if (!Schema) {
      return execute(dependencies)(props)
    }

    const input = Schema.parse(props) as T

    return execute(dependencies)(input)
  }

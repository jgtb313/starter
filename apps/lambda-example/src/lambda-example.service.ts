import { SignInSchema, SignInInput, SignInOutput } from '@starter/schema'
import { createLambdaHandler, ILambdaHandlerExecute } from '@starter/domain'

const execute: ILambdaHandlerExecute<SignInInput, SignInOutput> =
  ({}) =>
  async ({ email, password }) => {
    console.log({ email, password })

    return {
      accessToken: 'accessToken',
    }
  }

export const lambdaExample = createLambdaHandler(execute, SignInSchema)

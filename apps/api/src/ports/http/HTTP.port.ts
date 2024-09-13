import { ZodSchema, z } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IContext } from '@/core/shared/types/context'
import { HTTPMethods, HttpContentTypes, HttpResponses } from './HTTP.support'

export * from './modules'

export type IRouterPathResponse = {
  description: string
  schema?: ZodSchema
}

export type IRouterPathResponseExamples = {
  description: string
  examples: IRouterPathResponse[]
}

export type IRouterPathResponses =
  | {
      description: string
      schema?: ZodSchema
    }
  | IRouterPathResponseExamples

export type IRouterPath<
  T extends ZodSchema = ZodSchema,
  E extends ZodSchema = ZodSchema,
  K extends ZodSchema = ZodSchema,
  P extends ZodSchema = ZodSchema,
  Q extends ZodSchema = ZodSchema
> = {
  summary: string
  description: string

  path: string

  method: HTTPMethods

  parameters: {
    query?: z.infer<T>
    params?: z.infer<E>
    body?: z.infer<K>
    headers?: z.infer<P>

    bodyOptions?: {
      contentType?: HttpContentTypes
    }
  }

  responses: Partial<Record<HttpResponses, IRouterPathResponses>>

  execute: (input: IRouteInput<z.infer<T>, z.infer<E>, z.infer<K>, z.infer<P>>, context: IContext) => z.infer<Q>
}

export type IRouter = {
  name: string
  description: string

  schemas: Record<string, { schema: ZodSchema; description?: string }>

  paths: Record<string, IRouterPath>
}

export type IRouteInput<T, E, K, P> = {
  query?: T
  params?: E
  body?: K
  headers?: P
}

export type IServer = {
  start(dependencies: IDependencies): Promise<void>
}

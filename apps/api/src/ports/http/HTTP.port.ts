import { ZodSchema, z } from '@starter/schema'

import { IDependencies, IContext } from '@/support/types'
import { HTTPMethods, HttpContentTypes, HttpResponses } from './HTTP.support'

export * from './modules'

export type IRouterPathResponse = {
  description: string
  schema?: ZodSchema
}

type IRouterPathResponses<T extends HttpResponses> = T extends 200 | 201
  ? {
      schema: ZodSchema
    }
  : {
      description: string
    }

type IRouterResponses<T extends HttpResponses> = T extends 200 | 201
  ? IRouterPathResponses<T> | IRouterPathResponses<T>[]
  : IRouterPathResponses<T> | IRouterPathResponses<T>[]

export type IRouterPath<
  T extends ZodSchema = ZodSchema,
  E extends ZodSchema = ZodSchema,
  K extends ZodSchema = ZodSchema,
  P extends ZodSchema = ZodSchema,
  Q extends ZodSchema = ZodSchema,
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

  responses: {
    [T in HttpResponses]?: IRouterResponses<T>
  }

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
